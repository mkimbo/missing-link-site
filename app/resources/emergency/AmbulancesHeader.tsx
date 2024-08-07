"use client";

import BackButton from "@/components/BackButton";
import { InfoTooltip } from "@/components/InfoTooltip";

export default function AmbulancesHeader() {
  return (
    <div className="flex flex-row w-full px-4 align-middle h-9">
      <BackButton />
      <div className=" w-full">
        <div className="flex flex-row w-full text-muted-foreground align-middle ">
          <div className="py-1 w-full">Ambulance Contacts</div>
          <InfoTooltip>
            <p className="text-sm text-white">
              A list of ambulance agencies and their contacts.
            </p>
          </InfoTooltip>
        </div>
      </div>
    </div>
  );
}
