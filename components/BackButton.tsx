"use client";
import { Button } from "@/components/ui/button";
import { ChevronsLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button className="pl-1" variant="ghost" onClick={() => router.back()}>
      Go Back
      <ChevronsLeft />
    </Button>
  );
}
