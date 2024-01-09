import React from "react";
import PoliceStationSearch from "./PoliceStationSearch";
import { Separator } from "@/components/ui/separator";
import PoliceContactsList from "./PoliceContactsList";
import BackButton from "@/components/BackButton";

type Props = {};

export default function PoliceContacts({}: Props) {
  return (
    <>
      <div className=" space-y-1">
        <BackButton />
        <h2 className="text-2xl font-semibold tracking-tight">
          Police Stations
        </h2>
        <div className="w-full lg:w-fit flex justify-start gap-x-3">
          <PoliceStationSearch />
        </div>
      </div>
      <Separator className="my-4" />
      <PoliceContactsList />
    </>
  );
}
