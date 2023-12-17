"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

type Props = {
  href: string;
  label: string;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
};

export default function LinkButton({ href, label, variant, className }: Props) {
  const router = useRouter();
  return (
    <Button
      className={className ?? "text-primary"}
      variant={variant ?? "outline"}
      onClick={() => router.push(href)}
    >
      {label}
    </Button>
  );
}
