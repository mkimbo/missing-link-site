import BackButton from "@/components/BackButton";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function TextInformation({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className=" space-y-1">
        <BackButton />
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <div className="w-full lg:w-fit flex justify-start ">{description}</div>
      </div>
      <Separator className="my-4" />
      <div>{children}</div>
    </div>
  );
}
