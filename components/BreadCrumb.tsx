// /components/NextBreadcrumb.tsx
"use client";

import React, { ReactNode } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";

type TBreadCrumbProps = {
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
  routes?: {
    href: string;
    label: string;
  }[];
};

const BreadCrumbs = ({
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
  routes,
}: TBreadCrumbProps) => {
  const paths = usePathname();
  const pathNames = paths?.split("/").filter((path) => path);

  const truncateText = (str: string, n: number, b?: boolean) => {
    if (str.length <= n) {
      return str;
    }
    const useWordBoundary = b != null ? b : true;
    const subString = str.substring(0, n - 1); // the original check
    console.log(subString, "subString");
    return ` ${subString}...`;
  };
  return (
    <>
      {pathNames?.length! > 2 ? (
        <div
          className={`w-full lg:w-6/12 lg:px-2 mx-auto bg-background items-center justify-center  ${
            routes ? "hidden md:block" : ""
          }`}
        >
          <ul className={containerClasses}>
            <li className={listClasses}>
              <Link href={"/"}>{homeElement}</Link>
            </li>
            {pathNames?.length! > 0 && separator}
            {pathNames?.map((link, index) => {
              let href =
                link === "missing"
                  ? "#"
                  : `/${pathNames?.slice(0, index + 1).join("/")}`;
              let itemClasses =
                paths === href
                  ? `${listClasses} ${activeClasses}`
                  : listClasses;
              let itemLink = capitalizeLinks
                ? link[0].toUpperCase() + link.slice(1, link.length)
                : link;
              return (
                <React.Fragment key={index}>
                  <li className={itemClasses}>
                    <Link href={href}>{truncateText(itemLink, 10)}</Link>
                  </li>
                  {pathNames?.length !== index + 1 && separator}
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default BreadCrumbs;
