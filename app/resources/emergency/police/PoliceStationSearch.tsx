"use client";
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
    <div className="w-full">
      <Input
        type="search"
        value={search}
        placeholder="Search"
        className="md:w-[100px] lg:w-[300px]"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default PoliceStationSearch;
