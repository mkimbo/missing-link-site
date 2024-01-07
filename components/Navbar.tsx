import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NotificationsStatus from "./NotificationsStatus";
import ProfileButton from "./ProfileButton";

import { ServerAuthProvider } from "@/auth/server-auth-provider";
import ViewListsButton from "./ViewListsButton";

const Navbar = () => {
  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/about",
      label: "About",
    },

    {
      href: "/new",
      label: "New Alert",
    },
    {
      href: "/view",
      label: "Lists",
    },
    {
      href: "/resources",
      label: "Info Hub",
    },
  ];

  const mobileRoutes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/new",
      label: "New Alert",
    },
    {
      href: "/missing/persons",
      label: "Missing Persons",
    },
    {
      href: "/missing/vehicles",
      label: "Missing Vehicles",
    },
    {
      href: "/missing/bikes",
      label: "Missing Bikes",
    },
    {
      href: "/medical/blood-appeals",
      label: "Blood Appeals",
    },
    {
      href: "/resources",
      label: "Info Hub",
    },
    {
      href: "/about",
      label: "About",
    },
  ];

  return (
    <ServerAuthProvider>
      <div className="border-b">
        <header className="container px-4 sm:flex sm:justify-between py-3  sticky top-0 z-10 bg-background">
          <div className="relative flex h-16 items-center justify-between w-full">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger>
                  <Menu className="h-6 md:hidden w-6 text-primary" />
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4">
                    {mobileRoutes?.map((route, i) => (
                      <SheetClose key={i} asChild>
                        <Link
                          href={route.href}
                          className="block px-2 py-1 text-lg"
                        >
                          {route.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
              <Link href="/">
                <span className="hidden lg:block text-xl text-primary ml-2 md:ml-0">
                  {" "}
                  ML
                </span>
              </Link>
            </div>
            <nav className="mx-6 items-center space-x-4 lg:space-x-6 hidden md:block">
              {routes?.map((route, i) => (
                <>
                  {route.href == "/view" ? (
                    <ViewListsButton key={i} />
                  ) : (
                    <Button key={i} asChild variant="ghost">
                      <Link
                        key={i}
                        href={route.href}
                        className="text-sm font-medium transition-colors"
                      >
                        {route.label}
                      </Link>
                    </Button>
                  )}
                </>
              ))}
            </nav>

            <div className="flex items-center">
              <NotificationsStatus />
              <ProfileButton />
            </div>
          </div>
        </header>
      </div>
    </ServerAuthProvider>
  );
};

export default Navbar;
