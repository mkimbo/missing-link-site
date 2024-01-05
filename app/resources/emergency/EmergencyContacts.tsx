import { Siren } from "lucide-react";
import ResourceCard from "../ResourceCard";

export default function EmergencyContacts() {
  const alertOptions = [
    {
      title: "Police Contacts",
      href: "/resources?type=police-contacts",
      description:
        "A list of police stations in the country with their contact details.",
      icon: <Siren className=" h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "Ambulance Contacts",
      href: "/resources?type=ambulance-contacts",
      description:
        "A list of ambulance services in the country with their contact details.",
      icon: <Siren className=" h-10 w-10 mb-2 opacity-75" />,
    },
  ];

  return (
    <section className="w-full mx-auto">
      <div className="grid gap-6 items-center">
        <div className="flex flex-col justify-center space-y-8 text-center">
          <section className="w-full py-12 bg-primary ">
            <div className="space-y-6 text-left md:text-center pl-4">
              <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl">
                Emergency Contacts
              </h1>
              <div className="text-xl">Help may be just a phone call away.</div>
            </div>
          </section>

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
    </section>
  );
}
