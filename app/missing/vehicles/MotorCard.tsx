import Image from "next/image";
import React from "react";
import sampleMissing from "../../../public/img/missing-person.webp";
import { placeholderUrl } from "@/lib/constants";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { HoverableText } from "@/components/HoverableText";
import { TMotor } from "@/types/misssing_motor.model";
type MotorCardProps = {
  motor: TMotor;
};

function MotorCard({ motor }: MotorCardProps) {
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
      href={`/missing/${motor.motorType == "bike" ? "bikes" : "vehicles"}/${
        motor.id
      }`}
      className={"space-y-3  w-[150px] mx-2 my-2"}
    >
      <div className="overflow-hidden rounded-md shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(234,88,12,0.15)]">
        <Image
          src={motor.images!.length! > 0 ? motor.images[0]! : sampleMissing}
          alt={motor.make}
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
        <h3
          className={`font-medium leading-none ${
            motor.found == true ? "text-green-500" : "text-primary"
          }`}
        >
          {truncateText(` ${motor.make} ${motor.model} ${motor.year}`, 17)}{" "}
          {motor?.found == true && `(Found)`}
        </h3>

        <span className="text-sm text-muted-foreground">
          {!motor?.found && motor.licencePlate}
        </span>
        <div className="flex flex-row justify-start items-center">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm text-muted-foreground">
            <HoverableText
              title={`${truncateText(
                motor.lastSeenLocation ?? motor.longAddress,
                15,
                true
              )}...`}
              content={motor.lastSeenLocation ?? motor.longAddress}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default MotorCard;
