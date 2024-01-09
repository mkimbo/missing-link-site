"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

type Props = {
  name: string;
  items: { href: string; label: string }[];
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

const MultiLinkButton = ({ name, items, variant }: Props) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          asChild
          variant={variant ?? "outline"}
          className={"text-primary"}
        >
          <div className="flex flex-row">
            {name}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {items.map((item) => (
          <DropdownMenuItem
            key={item.href}
            className="cursor-pointer"
            onClick={() => router.push(item.href)}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiLinkButton;
