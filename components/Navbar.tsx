import Link from "next/link";
import Container from "./ui/container";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Home, Menu } from "lucide-react";

import ToggleThemeIcon from "./ToggleThemeIcon";
import NotificationsStatus from "./NotificationsStatus";
import ProfileButton from "./ProfileButton";

import { ServerAuthProvider } from "@/auth/server-auth-provider";
import BreadCrumbs from "./BreadCrumb";

// add a props interface to type check the props of this component
interface NavbarProps {
  enabledLocation: boolean;
  enanbledNotifications: boolean;
}

const Navbar = () => {
  const routes = [
    // {
    //   href: "/new",
    //   label: "New",
    // },
    // {
    //   href: "/missing/persons",
    //   label: "Persons",
    // },
    // {
    //   href: "/missing/vehicles",
    //   label: "Vehicles",
    // },
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/new",
      label: "New Alert",
    },
    {
      href: "/resources",
      label: "Info Hub",
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
                  <Menu className="h-6 md:hidden w-6" />
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4">
                    {routes.map((route, i) => (
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
                <span className="text-xl text-primary ml-2 md:ml-0"> ML</span>
              </Link>
            </div>
            <nav className="mx-6 items-center space-x-4 lg:space-x-6 hidden md:block">
              {routes?.map((route, i) => (
                <Button key={i} asChild variant="ghost">
                  <Link
                    key={i}
                    href={route.href}
                    className="text-sm font-medium transition-colors"
                  >
                    {route.label}
                  </Link>
                </Button>
              ))}
            </nav>
            {/* <BreadCrumbs
              routes={routes}
              homeElement={<Home className="h-4 w-4" />}
              separator={<span> {">"} </span>}
              activeClasses="text-amber-500"
              containerClasses="flex py-1 items-center pl-4 sm:pl-6 text-sm sm:text-base"
              listClasses="mx-2 font-bold"
              capitalizeLinks
            /> */}
            <div className="flex items-center">
              <NotificationsStatus />
              {/* <ToggleThemeIcon /> */}
              <ProfileButton />
            </div>
          </div>
        </header>
      </div>
      {/* <div className="sticky top-[89px] md:hidden">
        <Container>
          <BreadCrumbs
            homeElement={<Home className="h-4 w-4" />}
            separator={
              <span>
                <svg
                  className="w-3 h-3 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m7 9 4-4-4-4M1 9l4-4-4-4"
                  />
                </svg>
              </span>
            }
            activeClasses="text-amber-500"
            containerClasses="flex py-1 items-center pl-4 sm:pl-6 text-sm sm:text-base"
            listClasses="mx-1 font-bold"
            capitalizeLinks
          />
        </Container>
      </div> */}
    </ServerAuthProvider>
  );
};

export default Navbar;
