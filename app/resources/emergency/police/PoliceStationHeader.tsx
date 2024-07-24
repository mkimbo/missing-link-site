"use client";

import PoliceStationSearch from "./PoliceStationSearch";
import BackButton from "@/components/BackButton";

export default function PoliceStationHeader() {
  return (
    <div className="flex flex-row w-full px-4">
      <BackButton />
      <div className=" w-full">
        <PoliceStationSearch />
      </div>
    </div>
  );
}
