import { BadgeInfo, HeartPulse, Shield, Siren } from "lucide-react";
import ResourceCard from "./ResourceCard";

export default function AllResources() {
  const alertOptions = [
    {
      title: "Emergency Contacts",
      href: "/resources?type=emergency",
      description:
        "Access a list of essential emergency contacts for quick assistance.",
      icon: <Siren className=" h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "Health Tips",
      href: "/resources?type=health",
      description: "Discover valuable health tips to enhance your well-being.",
      icon: <HeartPulse className=" h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "Safety Tips",
      href: "/resources?type=safety",
      description: "Explore safety tips to safeguard yourself and others. ",
      icon: <Shield className=" h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "Awareness Information",
      href: "/resources?type=awareness",
      description:
        "Stay informed about community issues and awareness on relevant topics",
      icon: <BadgeInfo className=" h-10 w-10 mb-2 opacity-75" />,
    },
  ];

  return (
    <section className="w-full py-4 md:py-8 lg:py-8 xl:py-16 lg:w-8/12 px-4 mx-auto">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-8 text-center">
            <div className="space-y-2">
              <h1 className="text-xl pb-2 font-bold tracking-tighter sm:text-3xl xl:text-4xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-800">
                Public Information at Your Fingertips.
              </h1>
              {/* <p className="max-w-[600px] mx-auto ">
                Publicly available information at your fingertips.
              </p> */}
            </div>
            <div className="w-full max-w-full space-y-4 mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {alertOptions.map((alertOption, i) => (
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
