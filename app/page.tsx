import { DropletsIcon, PersonStandingIcon } from "lucide-react";

import MotorIcon from "@/components/MotorIcon";
import LinkButton from "@/components/LinkButton";
export async function generateStaticParams() {
  return [{}];
}

export default function Home() {
  return (
    <main className="container mx-auto p-4 ">
      <section className="w-full py-12 bg-primary text-white">
        <div className="space-y-8 text-center">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl">
            Technology for community welfare.
          </h1>
          <p className="text-2xl">Together, we can make a difference.</p>
          <LinkButton href="/" className="" label="Learn More" />
        </div>
      </section>
      <section className="w-full py-12 flex justify-between items-center">
        <PersonStandingIcon className="w-20 h-20 lg:h-24 lg:w-24 lg:ml-40" />
        <div className="space-y-8 w-3/4 lg:w-1/2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-right">
            Missing Persons Alerts
          </h2>
          <p className="text-muted-foreground text-right">
            Broadcast missing person alerts to nearby users and mobilize the
            community in the search for your loved ones.
          </p>
          <div className="flex justify-end space-x-4">
            <LinkButton href="/new?type=person" label="Create New Alert" />
            <LinkButton href="/missing/persons" label="View List" />
          </div>
        </div>
      </section>
      <section className="w-full py-12 flex justify-between items-center">
        <div className="space-y-8 w-3/4 lg:w-1/2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-left">
            Blood Donation Appeals
          </h2>
          <p className="text-muted-foreground text-left">
            Send out timely alerts to compatible blood donors near you and make
            a life-saving difference.
          </p>
          <div className="flex justify-start space-x-4">
            <LinkButton href="/new?type=medical" label="Create New Appeal" />
            <LinkButton href="/medical/blood-appeals" label="View Appeals" />
          </div>
        </div>
        <DropletsIcon className="w-20 h-20 lg:h-24 lg:w-24 lg:mr-40" />
      </section>
      <section className="w-full py-12 flex justify-between items-center">
        <MotorIcon />
        <div className="space-y-8 w-3/4 lg:w-1/2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-right">
            Missing Motor Alerts
          </h2>
          <p className="text-muted-foreground text-right">
            Broadcast alerts to subscribed users and mobilize the community in
            the search for your stolen vehicles and bikes.
          </p>
          <div className="flex justify-end space-x-4">
            <LinkButton href="/new?type=vehicle" label="New Vehicle Alert" />
            <LinkButton href="/new?type=bike" label="New Bike Alert" />
          </div>
        </div>
      </section>
    </main>
  );
}
