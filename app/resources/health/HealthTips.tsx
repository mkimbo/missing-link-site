import { BrainCog, Cross, User2, Users2 } from "lucide-react";
import ResourceCard from "../ResourceCard";

export default function HealthTips() {
  const healthTips = [
    {
      title: "Personal Wellness",
      href: "/resources?type=personal-health",
      description:
        "Wellness from the inside out.Be healthy and enjoy life more.",
      icon: <User2 className=" h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "Mental Health",
      href: "/resources?type=mental-health",
      description: "Mental health matters, You matter. End the stigma.",
      icon: <BrainCog className=" h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "Sexual Health",
      href: "/resources?type=sexual-health",
      description:
        "Empower your sexual health with open conversations and safer relations",
      icon: <Users2 className=" h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "First Aid",
      href: "/resources?type=first-aid",
      description:
        "Stay calm and act fast. Respond with confidence, aid with care and save lives",
      icon: <Cross className=" h-10 w-10 mb-2 opacity-75" />,
    },
  ];

  return (
    <section className="w-full py-6 md:py-8 lg:py-8 xl:py-16 lg:w-8/12 px-4 mx-auto">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-8 text-center">
            <div className="space-y-2">
              <h1 className="text-xl pb-2 font-bold tracking-tighter sm:text-3xl xl:text-4xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-800">
                Health Tips
              </h1>
            </div>
            <div className="w-full max-w-full space-y-4 mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {healthTips.map((alertOption, i) => (
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
