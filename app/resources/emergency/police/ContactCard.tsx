import { Card } from "@/components/ui/card";
import Image from "next/image";
import contactIcon from "../../../../public/img/call_location.png";
import { TPoliceContact } from "@/types/common";

type Props = {
  station: TPoliceContact;
};

export default function ContactCard({ station }: Props) {
  return (
    <Card
      key={station.value}
      className="flex flex-row p-2  w-full lg:w-[320px] cursor-pointer mb-2 transition-all hover:bg-accent hover:text-accent-foreground"
    >
      <Image
        src={contactIcon}
        alt={station.label}
        width={500}
        height={500}
        className={
          "h-[100px] w-[120px] object-contain transition-all hover:scale-105 aspect-square"
        }
      />
      <div className="flex flex-col  justify-center">
        <span className="text-sm">{station.label}</span>
        <span className="text-sm text-muted-foreground">
          {" "}
          {`Tel: ${station.contact}`}
        </span>
        <span className="text-sm text-muted-foreground">
          {station.contact2 && `Tel2: ${station.contact2}`}
        </span>
      </div>
    </Card>
  );
}
