import { Card } from "@/components/ui/card";
import { Bike, Car, HeartPulse, Users2 } from "lucide-react";
import ResourceCard from "./ResourceCard";

export default function EmergencyContacts() {
  const alertOptions = [
    {
      title: "Police Contacts",
      href: "/resources?type=police-contacts",
      description:
        "A list of police stations in the country with their contact details.",
      icon: <Users2 className=" h-10 w-10 mb-2 opacity-75" />,
    },
    // {
    //   title: "Ambulance Contacts",
    //   href: "/resources?type=ambulance-contacts",
    //   description: "Send out timely alerts to blood donors near you.",
    //   icon: <HeartPulse className=" h-10 w-10 mb-2 opacity-75" />,
    // },
  ];

  return (
    <section className="w-full py-6 md:py-8 lg:py-8 xl:py-16 lg:w-8/12 px-4 mx-auto">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-8 text-center">
            <div className="space-y-2">
              <h1 className="text-xl pb-2 font-bold tracking-tighter sm:text-3xl xl:text-4xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-800">
                Emergency Contacts.
              </h1>
            </div>
            <div className="w-full max-w-full space-y-4 mx-auto">
              <div className="grid grid-cols-1 gap-4">
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
