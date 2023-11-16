import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { NavData } from "@/types/common";
import { BellPlus, Bike, Car, LayoutList, Library, Users } from "lucide-react";

interface NavCard {
  data: NavData;
}

const NavCard: React.FC<NavCard> = ({ data }) => {
  function getIcon(): JSX.Element | null {
    if (data.route == "/new") {
      return (
        <BellPlus className="h-20 w-20 transition-all duration-300 hover:scale-105 text-primary" />
      );
    } else if (data.route == "/persons") {
      return (
        <Users className="h-20 w-20 transition-all duration-300 hover:scale-105 text-primary" />
      );
    } else if (data.route == "/cars") {
      return (
        <Car className="h-20 w-20 transition-all duration-300 hover:scale-105 text-primary" />
      );
    } else if (data.route == "/bikes") {
      return (
        <Bike className="h-20 w-20 transition-all duration-300 hover:scale-105 text-primary" />
      );
    } else if (data.route == "/resources") {
      return (
        <Library className="h-20 w-20 transition-all duration-300 hover:scale-105 text-primary" />
      );
    }
    return null;
  }

  return (
    <Link
      href="/"
      className="outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg"
    >
      <Card className="rounded-lg border-2">
        <CardContent className="pt-4">
          <div className="aspect-square relative bg-foreground/5 dark:bg-background rounded-lg flex justify-center items-center">
            {getIcon()}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-center">
          <div className="text-center">
            <p className="font-semibold text-lg">{data.title}</p>
            <p className="text-sm text-primary/80">{data.description}</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default NavCard;
