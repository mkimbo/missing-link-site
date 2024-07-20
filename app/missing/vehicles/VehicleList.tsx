import { serverDB } from "@/lib/firebase";
import { motorSearchFields } from "@/lib/constants";
import Fuse from "fuse.js";

import { TMotor } from "@/types/misssing_motor.model";
import MotorCard from "./MotorCard";
type Props = {
  searchParams: { search: string };
};

async function getMissingVehicleList(params: {
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
    //get vehicles only
    if (dataObj.motorType == "vehicle") {
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

export default async function VehicleList({ searchParams }: Props) {
  const searchKey = searchParams.search || "";
  const missingVehicles = await getMissingVehicleList({ search: searchKey });

  return (
    <div className="flex flex-wrap justify-center lg:justify-normal">
      {missingVehicles.map((vehicle) => (
        <MotorCard key={vehicle.id} motor={vehicle} />
      ))}
      {missingVehicles.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-center text-gray-500">
            No results found {searchKey && `for "${searchKey}"`}
          </p>
        </div>
      )}
    </div>
  );
}
