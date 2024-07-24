import { TPerson } from "@/types/missing_person.model";
import Image from "next/image";
import React from "react";
import sampleMissing from "../../../public/img/missing-person.webp";
import { placeholderUrl } from "@/lib/constants";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { HoverableText } from "@/components/HoverableText";
type PersonCardProps = {
  person: TPerson;
};

function PersonCard({ person }: PersonCardProps) {
  function removeCommas(str: string) {
    while (str.charAt(0) === ",") {
      str = str.substring(1);
    }
    while (str.charAt(str.length - 1) === ",") {
      str = str.substring(0, str.length - 1);
    }
    return str;
  }
  const truncateText = (str: string, n: number, b?: boolean) => {
    if (str.length <= n) {
      return str;
    }
    const useWordBoundary = b != null ? b : true;
    const subString = str.substring(0, n - 1); // the original check
    return removeCommas(
      useWordBoundary
        ? subString.substring(0, subString.lastIndexOf(" "))
        : subString
    );
  };
  return (
    <Link
      href={`/missing/persons/${person.id}`}
      className={"space-y-3  w-[150px] mx-2 my-2 "}
    >
      <div className="overflow-hidden rounded-md shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(234,88,12,0.15)]">
        <Image
          src={person.images!.length! > 0 ? person.images[0]! : sampleMissing}
          alt={person.fullname}
          width={150}
          height={150}
          className={
            "h-[150px] w-[150px] object-cover transition-all hover:scale-105 aspect-square"
          }
          blurDataURL={placeholderUrl}
          placeholder="blur"
        />
      </div>
      <div className="space-y-1 text-sm text-left">
        <div className="flex flex-row items-center">
          <h3
            className={`font-medium leading-none ${
              person?.found == true ? "text-green-500" : "text-primary"
            }`}
          >
            {truncateText(person.fullname, 17)}
            {person?.found == true && `(Found)`}
          </h3>
          <span className="text-sm text-muted-foreground ml-2">
            {!person?.found && person.age}
          </span>
        </div>
        <div className="flex flex-row justify-start items-center">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm text-muted-foreground">
            <HoverableText
              title={`${truncateText(person.lastSeenLocation, 15, true)}...`}
              content={person.lastSeenLocation}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default PersonCard;
