"use client";
import { policeSearchFields } from "@/lib/constants";
import Fuse from "fuse.js";
import policeInfo from "../../../../public/pStations.json";
import { TPoliceContact } from "@/types/common";
import ContactCard from "./ContactCard";
import { useSearchParams } from "next/navigation";

type Props = {
  search: string;
};

function getPoliceStations({ search }: { search: string }): TPoliceContact[] {
  const data: TPoliceContact[] = [];

  const stations = Array.from(policeInfo).map((item) => {
    return item as TPoliceContact;
  });

  if (!search || search === "") {
    data.push(...stations);
  } else {
    const fuse = new Fuse(stations, policeSearchFields);
    const results = fuse.search(search!).map(({ item }) => item);
    console.log(results);
    data.push(...results);
  }

  return data;
}

export default function PoliceContactsList() {
  const searchParams = useSearchParams();
  const searchKey = searchParams?.get("search");
  const policeContacts = getPoliceStations({
    search: searchKey ?? "",
  });
  return (
    <div className="flex flex-wrap justify-center lg:justify-normal gap-2 lg:gap-6">
      {policeContacts.map((item) => (
        <ContactCard key={item.value} station={item} />
      ))}
      {policeContacts.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-center text-gray-500">
            No results found {searchKey && `for "${searchKey}"`}
          </p>
        </div>
      )}
    </div>
  );
}
