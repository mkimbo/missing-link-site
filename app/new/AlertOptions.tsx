import { Bike, Car, HeartPulse, Users2 } from "lucide-react";
import AlertCard from "./AlertCard";

export default function AlertOptions() {
  const alertOptions = [
    {
      title: "Missing Person",
      href: "/new?type=person",
      description: "Broadcast geo-targeted alerts for missing loved ones.",
      icon: <Users2 className=" h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "Urgent Blood Appeal",
      href: "/new?type=medical",
      description: "Send out timely alerts to blood donors near you.",
      icon: <HeartPulse className=" h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "Missing Vehicle",
      href: "/new?type=vehicle",
      description:
        "Alert the community to help in the search and recovery efforts.",
      icon: <Car className=" h-10 w-10 mb-2 opacity-75" />,
    },
    {
      title: "Missing Bike",
      href: "/new?type=bike",
      description:
        "Alert the community to help in the search and recovery efforts.",
      icon: <Bike className=" h-10 w-10 mb-2 opacity-75" />,
    },
  ];

  return (
    <section className="w-full mx-auto">
      <div className="grid gap-6 items-center">
        <div className="flex flex-col justify-center space-y-8 text-center">
          <section className="w-full py-12 bg-primary ">
            <div className="space-y-6 text-left md:text-center pl-4">
              <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl">
                Emergency Alerts
              </h1>
              <div className="text-xl">Powered by your community.</div>
            </div>
          </section>

          <div className="w-full max-w-full space-y-4 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {alertOptions.map((alertOption, i) => (
                <AlertCard
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
