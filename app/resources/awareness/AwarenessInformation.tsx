import {
  Flame,
  Baby,
  Globe,
  Vote,
  CircleDollarSign,
  Users2,
} from "lucide-react";

import ResourceCard from "../ResourceCard";
import BackButton from "@/components/BackButton";

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
    <section className="w-full mx-auto">
      <div className="grid gap-6 items-center">
        <div className="flex flex-col justify-center space-y-8 text-center">
          <section className="w-full py-12 bg-primary ">
            <div className="space-y-4 text-left md:text-center pl-4">
              <div className="lg:hidden">
                <BackButton mutedText={false} />
              </div>
              <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl">
                Awareness <br className="md:hidden"></br> Is key
              </h1>
              <div className="text-sm lg:text-xl">
                Stay Informed and prepared.
              </div>
              <div className="hidden lg:block">
                <BackButton mutedText={false} />
              </div>
            </div>
          </section>
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
    </section>
  );
}
