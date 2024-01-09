"use client";
import { Button } from "@/components/ui/button";
import { ChevronsLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ mutedText }: { mutedText?: boolean }) {
  const router = useRouter();
  const mutedTextDefault = mutedText ?? true;

  return (
    <Button
      className={
        mutedTextDefault == true ? "pl-0 text-muted-foreground" : "pl-0"
      }
      variant="ghost"
      onClick={() => router.back()}
    >
      Go Back
      <ChevronsLeft />
    </Button>
  );
}
