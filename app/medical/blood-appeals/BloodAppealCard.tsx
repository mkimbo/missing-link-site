import { Card } from "@/components/ui/card";
import Image from "next/image";
import APos from "../../../public/img/bloodA_pos.png";
import BPos from "../../../public/img/bloodB_pos.png";
import ABPos from "../../../public/img/bloodAB_pos.png";
import OPos from "../../../public/img/bloodO_pos.png";
import ANeg from "../../../public/img/bloodA_neg.png";
import BNeg from "../../../public/img/bloodB_neg.png";
import ABNeg from "../../../public/img/bloodAB_neg.png";
import ONeg from "../../../public/img/bloodO_neg.png";
import { TBloodAppeal } from "@/types/missing_person.model";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type Props = {
  appeal: TBloodAppeal;
  currentUserBloodGroup: string;
};

function getCompatibleBloodGroups(bloodGroup: string): string[] {
  const bloodGroups: { [key: string]: string[] } = {
    "A+": ["A+", "A-", "O+", "O-"],
    "A-": ["A-", "O-"],
    "B+": ["B+", "B-", "O+", "O-"],
    "B-": ["B-", "O-"],
    "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    "AB-": ["A-", "B-", "AB-", "O-"],
    "O+": ["O+", "O-"],
    "O-": ["O-"],
  };

  return bloodGroups[bloodGroup] || [];
}

function getBloodGroupImage(bloodGroup: string) {
  switch (bloodGroup) {
    case "A+":
      return APos;
    case "B+":
      return BPos;
    case "AB+":
      return ABPos;
    case "O+":
      return OPos;
    case "A-":
      return ANeg;
    case "B-":
      return BNeg;
    case "AB-":
      return ABNeg;
    case "O-":
      return ONeg;
    default:
      return APos;
  }
}

export default function BloodAppealCard({
  appeal,
  currentUserBloodGroup,
}: Props) {
  const isCompatible = getCompatibleBloodGroups(appeal.bloodGroup).includes(
    currentUserBloodGroup
  );
  return (
    <Link href={`/blood-appeal/${appeal.id}`}>
      <Card
        key={appeal.id}
        className="flex flex-row p-2  w-full lg:w-[350px] cursor-pointer mb-2 transition-all hover:bg-accent hover:text-accent-foreground"
      >
        <div style={{ position: "relative" }}>
          <Image
            src={getBloodGroupImage(appeal.bloodGroup)}
            alt={appeal.bloodGroup}
            width={500}
            height={500}
            className={
              "h-[120px] w-[120px] object-cover transition-all hover:scale-105 aspect-square"
            }
          />
          <Badge
            variant="outline"
            className={`absolute top-2 left-0 text-[8px] w-fit ${
              isCompatible
                ? "text-[green] p-1 border-[green]"
                : "text-destructive p-1 border-destructive"
            } `}
          >
            {isCompatible ? "Compatible" : "Not Compatible"}
          </Badge>
        </div>
        <div className="flex flex-col  justify-center">
          <span className="text-sm">{`${appeal.fullname} urgently needs ${appeal.bUnits} units of ${appeal.bloodGroup} blood`}</span>

          <span className="text-sm text-muted-foreground">
            {appeal.hospitalName} - {appeal.formattedAddress}
          </span>
        </div>
      </Card>
    </Link>
  );
}
