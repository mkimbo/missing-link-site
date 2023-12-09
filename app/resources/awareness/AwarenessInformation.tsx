import {
  Flame,
  Baby,
  Globe,
  Vote,
  CircleDollarSign,
  Users2,
} from "lucide-react";

import ResourceCard from "../ResourceCard";

export default function AwarenessInformation() {
  const safetyTips = [
    {
      title: "Financial Literacy",
      href: "/resources?type=financial-literacy",
      description:
        "Learn about budgeting, saving, investing, and managing personal finances effectively.",
      icon: <CircleDollarSign className="h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "Political Awareness",
      href: "/resources?type=political-awareness",
      description:
        "Stay informed about political events and issues that impact your community.",
      icon: <Vote className="h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "CSE",
      href: "/resources?type=comprehensive-sexuality-education",
      description:
        "Understand human relationships, consent, reproductive health, and safe practices.",
      icon: <Baby className="h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "Sexual harrassment and GBV",
      href: "/resources?type=sexual-harrassment-and-gbv",
      description:
        "Learn about recognizing, preventing, and addressing these issues",
      icon: <Users2 className="h-10 w-10 mb-2 opacity-75" />,
    },
  ];

  return (
    <section className="w-full py-6 md:py-8 lg:py-8 xl:py-16 lg:w-8/12 px-4 mx-auto">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-8 text-center">
            <div className="space-y-2">
              <h1 className="text-xl pb-2 font-bold tracking-tighter sm:text-3xl xl:text-4xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-800">
                Stay Informed and Aware
              </h1>
            </div>
            <div className="w-full max-w-full space-y-4 mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {safetyTips.map((alertOption, i) => (
                  <ResourceCard
                    key={i}
                    title={alertOption.title}
                    href={alertOption.href}
                    description={alertOption.description}
                    icon={alertOption.icon}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
