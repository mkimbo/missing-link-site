import React from "react";
import PoliceStationSearch from "./PoliceStationSearch";
import { Separator } from "@/components/ui/separator";
import PoliceContactsList from "./PoliceContactsList";

type Props = {};

export default function PoliceContacts({}: Props) {
  return (
    <div className="px-4 ">
      <div className="mt-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Police Stations
        </h2>
        <div className="w-full lg:w-fit flex justify-start gap-x-3">
          <PoliceStationSearch />
        </div>
      </div>
      <Separator className="my-4" />
      <PoliceContactsList />
    </div>
  );
}
