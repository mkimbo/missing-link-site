import { serverDB } from "@/lib/firebase";
import { motorSearchFields } from "@/lib/constants";
import Fuse from "fuse.js";

import { TMotor } from "@/types/misssing_motor.model";
import MotorCard from "../vehicles/MotorCard";

type Props = {
  searchParams: { search: string };
};

async function getMissingBikeList(params: {
  search?: string;
}): Promise<TMotor[]> {
  const data: any[] = [];
  const docs = await serverDB
    .collection(process.env.FIREBASE_FIRESTORE_MISSING_MOTORS!)
    .get();
  if (docs.empty) {
    return [];
  }
  docs.forEach((doc) => {
    const dataObj = doc.data();
    //get bikes only
    if (dataObj.motorType == "bike") {
      data.push({
        id: doc.id,
        ...dataObj,
      });
    }
  });

  if (!params.search) {
    return data as TMotor[];
  }

  const fuse = new Fuse(data, motorSearchFields);
  const results = fuse.search(params.search).map(({ item }) => item);

  return results as TMotor[];
}

export default async function BikeList({ searchParams }: Props) {
  const searchKey = searchParams.search || "";
  const missingBikes = await getMissingBikeList({ search: searchKey });

  return (
    <div className="flex flex-wrap justify-center lg:justify-normal">
      {missingBikes.map((bike) => (
        <MotorCard key={bike.id} motor={bike} />
      ))}
    </div>
  );
}
