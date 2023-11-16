"use client";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
type Props = {
  searchParams: { search: string; bloodGroup: string; radius: string };
};

function BloodAppealSearch({ searchParams }: Props) {
  const router = useRouter();
  const { search: searchKey, bloodGroup, radius } = searchParams;
  const [search, setSearch] = useState(searchKey ?? "");

  const [searchValue] = useDebounce(search, 500);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("search", `${searchValue ?? ""}`);
    params.append("bloodGroup", `${bloodGroup ?? ""}`);
    params.append("radius", `${radius ?? "5"}`);
    const url = `/medical/blood-appeals?${params.toString()}`;
    router.push(url);
  }, [searchValue, router, bloodGroup, radius]);
  return (
    <div className="w-full">
      <Input
        type="search"
        placeholder="Location/Hospital"
        className="md:w-[100px] lg:w-[300px]"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default BloodAppealSearch;
