"use client";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ mutedText }: { mutedText?: boolean }) {
  const router = useRouter();
  const mutedTextDefault = mutedText ?? true;

  return (
    <MoveLeft
      onClick={() => router.back()}
      className="text-primary m-auto mr-2"
      size={22}
    />
  );
}
