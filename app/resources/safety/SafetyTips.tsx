import { Flame, Baby, Globe, User2 } from "lucide-react";

import ResourceCard from "../ResourceCard";
import BackButton from "@/components/BackButton";
import ResourceTypeHeader from "../ResourceTypeHeader";

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
    <section className="w-full mx-auto">
      <div className="grid gap-6 items-center">
        <div className="flex flex-col justify-center space-y-8 text-center">
          <ResourceTypeHeader
            title={
              <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl">
                Safety<br className="md:hidden"></br> First
              </h1>
            }
            description="Stay Safe: Be Proactive, Not Reactive."
          />
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
