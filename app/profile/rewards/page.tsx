import SectionTitle from "@/components/SectionTitle";
import React from "react";

type Props = {};

function Rewards({}: Props) {
  return (
    <main className="container mx-auto p-4 ">
      <section className="w-full py-12 bg-primary ">
        <div className="space-y-4 text-center">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl">
            Rewards
          </h1>
          {/* <div className="text-sm lg:text-xl">Missing Link</div> */}
        </div>
      </section>
      <SectionTitle title="Why?" />
      <section className="w-full py-2 flex justify-between items-center">
        <div className="space-y-8 lg:w-3/4 mx-auto">
          <p className="text-muted-foreground text-center">
            Notifications, although essential, can sometimes be seen as a
            nuisance. Thats why we are looking to intergrate a reward system,
            designed to incentivize and encourage active participation from
            community members. The system will be built on the principle of
            mutual benefit and will leverage the synergy between a willing
            receiver and a desperate sender. By encouraging more people to join
            the platform and actively participate, we can create a network that
            is both responsive and efficient.
          </p>
        </div>
      </section>
      <SectionTitle title="Senders" />
      <section className="w-full py-2 flex justify-between items-center">
        <div className="space-y-8 lg:w-3/4 mx-auto">
          <p className="text-muted-foreground text-center">
            We understand that sometimes urgent alerts need to reach a wider
            audience. To facilitate this, notification senders have the option
            to go through a pay wall for a small fee to send notifications to a
            larger radius. This approach ensures that crucial information can
            reach those who need it most, while also helping sustain and improve
            the efficiency of the platform.
          </p>
        </div>
      </section>
      <SectionTitle title="Receivers" />
      <section className="w-full py-2 flex justify-between items-center">
        <div className="space-y-8 lg:w-3/4 mx-auto">
          <p className="text-muted-foreground text-center">
            As a receiver of alerts, you will have the opportunity to earn
            rewards by opting to receive notifications from distances longer
            than the default setting. By extending your reach and staying
            informed about events happening beyond your immediate community, you
            not only contribute to public safety but also unlock exclusive
            rewards.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Rewards;
