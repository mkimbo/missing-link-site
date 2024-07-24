"use client";
import { InfoTooltip } from "@/components/InfoTooltip";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
type Props = {
  searchParams: { search: string };
};

function PoliceStationSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchKey = searchParams?.get("search");
  const [search, setSearch] = useState(searchKey ?? "");

  const [searchValue] = useDebounce(search, 500);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("type", `police-contacts`);
    if (searchValue) {
      params.append("search", `${searchValue}`);
    }

    const url = `/resources?${params.toString()}`;
    router.push(url);
  }, [searchValue, router]);
  return (
    <div className="flex flex-row w-full text-muted-foreground align-middle">
      <input
        type="search"
        autoFocus={true}
        value={search}
        placeholder="Search Kenya Police Contacts"
        className="w-full focus:outline-none py-1.5 bg-transparent"
        onChange={(e) => setSearch(e.target.value)}
      />
      <InfoTooltip>
        <p className="text-sm text-white">Curated from online sources.</p>
      </InfoTooltip>
    </div>
  );
}

export default PoliceStationSearch;
