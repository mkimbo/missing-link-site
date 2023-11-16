"use client";
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
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default VehicleSearch;
