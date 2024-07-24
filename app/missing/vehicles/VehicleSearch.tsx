"use client";
import { InfoTooltip } from "@/components/InfoTooltip";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
type Props = {
  searchKey?: string;
};

function VehicleSearch({ searchKey }: Props) {
  const [search, setSearch] = useState(searchKey ?? "");

  const [searchValue] = useDebounce(search, 500);
  const router = useRouter();
  useEffect(() => {
    if (!searchValue || searchValue === "") {
      router.push(`/missing/vehicles`);
    } else {
      router.push(`/missing/vehicles?search=${searchValue}`);
    }
  }, [searchValue, router]);
  return (
    <div className="flex flex-row w-full text-muted-foreground align-middle">
      <input
        type="search"
        autoFocus={true}
        value={search}
        placeholder="Search Missing Vehicles"
        className="w-full focus:outline-none py-1.5 bg-transparent"
        onChange={(e) => setSearch(e.target.value)}
      />
      <InfoTooltip>
        <p className="text-sm text-white">
          If this list is too long, something is wrong.
        </p>
      </InfoTooltip>
    </div>
  );
}

export default VehicleSearch;
