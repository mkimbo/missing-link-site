"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  href: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  className?: string;
};

function InlineButtonLink({ title, href, variant, className }: Props) {
  const router = useRouter();
  return (
    <Button
      className={"py-0 h-5 text-primary"}
      variant={variant ?? "outline"}
      onClick={() => router.push(href)}
    >
      {title}
    </Button>
  );
}

export default InlineButtonLink;
