import { ServerAuthProvider } from "@/auth/server-auth-provider";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

import React, { Suspense } from "react";
import Search from "../persons/Search";
import { Skeleton } from "@/components/ui/skeleton";
import VehicleList from "./VehicleList";
import VehicleSearch from "./VehicleSearch";
import BackButton from "@/components/BackButton";

export default function MissingVehicles({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const search = searchParams.search || "";

  return (
    <ServerAuthProvider>
      <div className="sticky self-end top-0 z-50 backdrop-blur-lg w-full">
        <div className="flex flex-row w-full px-4">
          <BackButton />
          <div className=" w-full">
            <VehicleSearch searchKey={search} />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-1">
        <Suspense
          fallback={
            <div className="flex flex-wrap justify-center lg:justify-normal">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <div
                  key={item}
                  className="space-y-3  w-[150px] h-[196px] mx-2 my-2"
                >
                  <Skeleton className="h-[150px] w-[150px] rounded-md" />
                  <div className="space-y-1 text-sm text-left">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <VehicleList searchParams={searchParams} />
        </Suspense>{" "}
      </div>
    </ServerAuthProvider>
  );
}
