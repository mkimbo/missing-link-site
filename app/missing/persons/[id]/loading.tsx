import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

function Loading({}: Props) {
  return (
    <Container>
      <div className="w-full lg:w-6/12 px-4 mt-4 md:mt-8 mx-auto items-center justify-center">
        <Skeleton className="w-full h-16 mt-9" />
        <div className="w-full grid grid-cols-2 gap-6 md:gap-2 my-6">
          <Skeleton className="rounded-lg w-[200px] h-[200px] lg:w-[300px] lg:h-[300px]" />
          <div className="flex flex-col ml-4">
            <Skeleton className="w-6/12 h-6 mb-1" />
            <Skeleton className="w-3/12 h-6 mb-1" />
            <Skeleton className="w-4/12 h-6 mb-1" />
            <Skeleton className="w-4/12 h-6" />
            <Skeleton className="w-6/12 h-6 mt-2 md:mt-4 mb-1" />
            <Skeleton className="w-4/12 h-6" />
            <Skeleton className="hidden md:visible w-6/12 h-6 mt-2 md:mt-4 mb-1" />
            <Skeleton className="hidden md:visible w-full h-10 mt-2" />
          </div>
        </div>
        <Skeleton className="w-full h-16" />
        <Skeleton className="w-full h-16" />
        <Skeleton className="w-full h-16" />
      </div>
    </Container>
  );
}

export default Loading;
