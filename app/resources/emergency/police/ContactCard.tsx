import { Card } from "@/components/ui/card";
import Image from "next/image";
import contactIcon from "../../../../public/img/call_location_primary.png";
import { TPoliceContact } from "@/types/common";
import { Check, Copy } from "lucide-react";
import { useLoadingCallback } from "react-loading-hook";
import { useState } from "react";

type Props = {
  station: TPoliceContact;
};

export default function ContactCard({ station }: Props) {
  const [isCopied, setIsCopied] = useState("");
  const [handleCopyUrl, isCopyingUrl] = useLoadingCallback(
    async (contact: string) => {
      await navigator.clipboard.writeText(contact);
      setIsCopied(contact);
      setTimeout(() => {
        setIsCopied("");
      }, 2000);
    }
  );
  return (
    <Card
      key={station.value}
      className="flex flex-row p-2  w-full lg:w-[320px] cursor-pointer mb-2"
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
        <span className="text-sm px-2">{station.label}</span>
        <span
          onClick={() => handleCopyUrl(station.contact)}
          className="text-sm text-muted-foreground px-2 mb-2 py-1 flex flex-row align-middle gap-2 w-fit rounded-md transition-all hover:bg-accent hover:text-accent-foreground shadow-[2px_2px_0px_0px_rgba(234,88,12,0.1)]"
        >
          {`Tel: ${station.contact}`}
          {isCopied == station.contact ? (
            <Check size={18} />
          ) : (
            <Copy size={18} />
          )}
        </span>

        {station.contact2 && (
          <span
            onClick={() => station.contact2 && handleCopyUrl(station.contact2)}
            className="text-sm text-muted-foreground px-2 py-1 flex flex-row align-middle gap-2 w-fit rounded-md transition-all hover:bg-accent hover:text-accent-foreground shadow-[2px_2px_0px_0px_rgba(234,88,12,0.1)]"
          >
            {`Tel: ${station.contact2}`}{" "}
            {isCopied == station.contact2 ? (
              <Check size={18} />
            ) : (
              <Copy size={18} />
            )}
          </span>
        )}
      </div>
    </Card>
  );
}
