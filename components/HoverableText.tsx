import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

//create interface props for title and content
interface HoverCardDemoProps {
  title: string;
  content: React.ReactNode;
}

export function HoverableText({ title, content }: HoverCardDemoProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span>{title}</span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">{content}</HoverCardContent>
    </HoverCard>
  );
}
