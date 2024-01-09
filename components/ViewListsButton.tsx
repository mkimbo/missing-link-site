"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

type Props = {
  // name: string;
  // items: { href: string; label: string }[];
};

const ViewListsButton = ({}: // name,
// items,
Props) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button asChild variant="ghost">
          <div className="flex flex-row">
            Lists
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>Missing persons</DropdownMenuLabel>
            <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/missing/persons")}
        >
          Missing persons
        </DropdownMenuItem>

        {/* <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/missing/mo" )}
        >
          Missing Motors
        </DropdownMenuItem> */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Missing Motors</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push("/missing/vehicles")}
              >
                Motor Vehicles
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push("/missing/bikes")}
              >
                Motor Bikes
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem> */}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/medical/blood-appeals")}
        >
          Blood Appeals
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ViewListsButton;
