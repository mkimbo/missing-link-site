import Link from "next/link";
import React from "react";

type Props = {
  icon: React.ReactNode;
  title: string;
  href: string;
  description: string;
};

export default function ResourceCard({
  title,
  icon,
  description,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center space-y-2  p-4 outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg"
    >
      <div className="rounded-full">{icon}</div>
      <h2 className="text-xl font-bold text-primary">{title}</h2>
      <p className="">{description}</p>
    </Link>
  );
}
