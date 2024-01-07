import { TBloodAppeal } from "@/types/missing_person.model";
import { appealSearchFields } from "@/lib/constants";
import Fuse from "fuse.js";
import { getAppealsWithinRadiusOfUser, getUser } from "@/app/actions/actions";
import BloodAppealCard from "./BloodAppealCard";
import Link from "next/link";

type Props = {
  search: string;
  bloodGroup: string;
  radius: string;
};

async function getBloodAppeals({
  search,
  bloodGroup,
  radius,
  userLocation,
}: {
  search: string;
  bloodGroup: string;
  radius: string;
  userLocation: number[];
}): Promise<TBloodAppeal[]> {
  const data: any[] = [];
  var tempData: any[] = [];
  const docs = await getAppealsWithinRadiusOfUser(
    //parseInt(radius) * 1000,
    100 * 1000,
    userLocation
  );

  if (docs.length === 0) {
    return [];
  }
  docs.forEach((doc) => {
    const dataObj = doc.data();
    data.push({
      id: doc.id,
      ...dataObj,
    });
  });
  if (!search || search === "") {
    tempData = data;
  } else {
    console.log("{search called", search);
    const fuse = new Fuse(data, appealSearchFields);
    const results = fuse.search(search!).map(({ item }) => item);
    tempData = results;
  }

  if (bloodGroup) {
    tempData = tempData.filter((item) => item.bloodGroup === bloodGroup);
  }

  return tempData as TBloodAppeal[];
}

export default async function BloodAppealsList({
  search,
  radius,
  bloodGroup,
}: Props) {
  const user = await getUser();
  if (!user) {
    throw new Error("Please login to view this page");
  }

  if (!user.enabledLocation) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">
          Please enable Geo-location to view blood donation appeals near you.
        </h1>
        <p className="text-sm text-muted-foreground">
          You can update your location settings from your{" "}
          <Link href="/profile" className="text-primary">
            profile page.
          </Link>
        </p>
      </div>
    );
  }
  const bloodAppeals = await getBloodAppeals({
    search: search,
    bloodGroup: bloodGroup && bloodGroup != "" ? bloodGroup : "", //user.bloodGroup ?? "",
    radius: radius ?? user.alertRadius ?? "5",
    userLocation: [user.lat, user.lng],
  });
  return (
    <div className="flex flex-wrap justify-center lg:justify-normal gap-2 lg:gap-6">
      {bloodAppeals.map((appeal) => (
        <BloodAppealCard
          key={appeal.id}
          appeal={appeal}
          currentUserBloodGroup={user.bloodGroup ?? ""}
        />
      ))}
    </div>
  );
}
