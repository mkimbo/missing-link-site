import { ServerAuthProvider } from "@/auth/server-auth-provider";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import BikeSearch from "./BikeSearch";
import BikeList from "./BikeList";
import BackButton from "@/components/BackButton";

export default function MissingBikes({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const search = searchParams.search || "";

  return (
    <div className="container mx-auto px-4 py-1">
      <ServerAuthProvider>
        <div className="space-y-1">
          <BackButton />
          <h2 className="text-2xl font-semibold tracking-tight">
            Missing Bikes
          </h2>
          <BikeSearch searchKey={search} />
        </div>
        <Separator className="my-4" />

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
          <BikeList searchParams={searchParams} />
        </Suspense>
      </ServerAuthProvider>
    </div>
  );
}
