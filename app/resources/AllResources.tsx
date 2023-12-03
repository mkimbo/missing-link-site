import { Card } from "@/components/ui/card";
import { Bike, Car, HeartPulse, Users2 } from "lucide-react";
import ResourceCard from "./ResourceCard";

export default function AllResources() {
  const alertOptions = [
    {
      title: "Emergency Contacts",
      href: "/resources?type=emergency",
      description:
        "Broadcast geo-targeted alerts for missing persons of all ages.",
      icon: <Users2 className=" h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "Health Tips",
      href: "/resources?type=health",
      description: "Send out timely alerts to blood donors near you.",
      icon: <HeartPulse className=" h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "Safety Tips",
      href: "/resources?type=safety",
      description:
        "Alert the community to help in the search and recovery efforts.",
      icon: <Car className=" h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "Awareness Information",
      href: "/resources?type=awareness",
      description:
        "Alert the community to help in the search and recovery efforts.",
      icon: <Bike className=" h-10 w-10 mb-2 opacity-75" />,
    },
  ];

  return (
    <section className="w-full py-4 md:py-8 lg:py-8 xl:py-16 lg:w-8/12 px-4 mx-auto">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-8 text-center">
            <div className="space-y-2">
              <h1 className="text-xl pb-2 font-bold tracking-tighter sm:text-3xl xl:text-4xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-800">
                Public Resources.
              </h1>
              <p className="max-w-[600px] mx-auto ">
                Publicly available information at your fingertips.
              </p>
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
