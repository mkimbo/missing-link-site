import { Flame, Baby, Globe, User2 } from "lucide-react";

import ResourceCard from "../ResourceCard";

export default function SafetyTips() {
  const safetyTips = [
    {
      title: "Personal Safety",
      href: "/resources?type=personal-safety",
      description:
        "Ensure your personal safety. Be aware and take precautions.",
      icon: <User2 className="h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "Child Safety",
      href: "/resources?type=child-safety",
      description: "Keep your children safe. Create a secure environment.",
      icon: <Baby className="h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "Online Safety",
      href: "/resources?type=online-safety",
      description: "Protect yourself online. Stay safe from cyber threats.",
      icon: <Globe className="h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "Fire Safety",
      href: "/resources?type=fire-safety",
      description:
        "Stay safe from fire hazards. Prevent, prepare, and protect.",
      icon: <Flame className="h-10 w-10 mb-2 opacity-75" />,
    },
  ];

  return (
    <section className="w-full py-6 md:py-8 lg:py-8 xl:py-16 lg:w-8/12 px-4 mx-auto">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-8 text-center">
            <div className="space-y-2">
              <h1 className="text-xl pb-2 font-bold tracking-tighter sm:text-3xl xl:text-4xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-800">
                Stay Safe: Be Proactive, Not Reactive.
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
