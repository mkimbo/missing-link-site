"use client";

import BackButton from "@/components/BackButton";

type Props = {
  title: string;
};
export default function ResourceHeader({ title }: Props) {
  return (
    <div className="flex flex-row w-full px-4 align-middle h-9">
      <BackButton />
      <div className=" w-full">
        <div className="flex flex-row w-full  align-middle ">
          <div className="py-1 w-full">{title}</div>
          {/* <InfoTooltip>
            <p className="text-sm text-white">
              A list of ambulance agencies and their contacts.
            </p>
          </InfoTooltip> */}
        </div>
      </div>
    </div>
  );
}
