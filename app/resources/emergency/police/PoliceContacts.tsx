import React from "react";
import { Separator } from "@/components/ui/separator";
import PoliceContactsList from "./PoliceContactsList";

type Props = {};
//online sources:
//https://www.standardmedia.co.ke/entertainment/life-hacks/article/2001353589/list-of-police-stations-and-their-telephone-numbers
export default function PoliceContacts({}: Props) {
  return (
    <div className="w-full ">
      <PoliceContactsList />
    </div>
  );
}
