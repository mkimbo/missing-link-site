import BackButton from "@/components/BackButton";
import { Separator } from "@/components/ui/separator";
import React from "react";
import ResourceHeader from "./ResourceHeader";

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
        <div className="w-full lg:w-fit flex justify-start text-muted-foreground">
          {description}
        </div>
      </div>
      <Separator className="my-4" />
      <div>{children}</div>
    </div>
  );
}
