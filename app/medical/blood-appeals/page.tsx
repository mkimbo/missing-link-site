import { ServerAuthProvider } from "@/auth/server-auth-provider";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

import React, { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { ListFilter } from "lucide-react";
import BloodAppealSearch from "./BloodAppealSearch";
import { BloodAppealFilter } from "./BloodAppealFilter";
import BloodAppealsList from "./BloodAppealsList";
import { Card } from "@/components/ui/card";

export default function BloodAppeals({
  searchParams,
}: {
  searchParams: { search: string; bloodGroup: string; radius: string };
}) {
  const search = searchParams.search || "";

  return (
    <Container>
      <ServerAuthProvider>
        <div className="px-4 ">
          <div className="mt-6 space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Blood Appeals
            </h2>
            <div className="w-full lg:w-fit flex justify-start gap-x-3">
              <BloodAppealSearch
                searchParams={{
                  search: search ?? "",
                  bloodGroup: searchParams.bloodGroup ?? "",
                  radius: searchParams.radius ?? "5",
                }}
              />
              <BloodAppealFilter
                searchParams={{
                  search: search ?? "",
                  bloodGroup: searchParams.bloodGroup ?? "",
                  radius: searchParams.radius ?? "5",
                }}
              />
            </div>

            {/* <Search searchKey={search} /> */}
          </div>
          <Separator className="my-4" />
          <div></div>

          <Suspense
            fallback={
              <div className="flex flex-wrap justify-center lg:justify-normal gap-2 lg:gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card
                    key={item}
                    className="flex flex-row p-2 w-full lg:w-[350px] mb-2"
                  >
                    <Skeleton className="h-[100px] w-[100px]" />
                    <div className="flex flex-col justify-center ml-4">
                      <Skeleton className="h-4 w-4/5" />
                      <Skeleton className="h-4 w-3/5" />
                    </div>
                  </Card>
                ))}
              </div>
            }
          >
            <BloodAppealsList {...searchParams} />
          </Suspense>
        </div>
      </ServerAuthProvider>
    </Container>
  );
}
