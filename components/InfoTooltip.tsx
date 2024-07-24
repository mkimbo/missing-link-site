import { TooltipProvider } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger,
} from "./ui/hybrid-tooltip";
type Props = {
  children: React.ReactNode;
};
export function InfoTooltip({ children }: Props) {
  return (
    <TooltipProvider>
      <HybridTooltip>
        <HybridTooltipTrigger asChild>
          <Info
            size={20}
            className="text-primary mt-1.5 mx-1 cursor-pointer  z-50"
          />
        </HybridTooltipTrigger>

        <HybridTooltipContent side="left">{children}</HybridTooltipContent>
      </HybridTooltip>
    </TooltipProvider>
  );
}
