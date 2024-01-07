import InlineButtonLink from "@/components/InlineButtonLink";
import SectionTitle from "@/components/SectionTitle";
import React from "react";

type Props = {};

function About({}: Props) {
  return (
    <main className="container mx-auto p-4 ">
      <section className="w-full py-12 bg-primary ">
        <div className="space-y-4 text-center">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl">
            Missing Link
          </h1>
          {/* <div className="text-sm lg:text-xl">Missing Link</div> */}
        </div>
      </section>
      <SectionTitle title="The Idea" />
      <section className="w-full py-2 flex justify-between items-center">
        <div className="space-y-8 lg:w-3/4 mx-auto">
          <p className="text-muted-foreground text-center">
            Welcome to Missing Link, a transformative community-driven
            initiative dedicated to enhancing public safety through cutting-edge
            technology. Missing Link was born out of the need for a platform
            that leverages technology to provide timely alerts and critical
            information to the community. The service is designed to empower
            individuals and communities to take an active role in public safety.
          </p>
        </div>
      </section>
      <SectionTitle title="Why MissingLink?" />
      <section className="w-full py-2 flex justify-between items-center">
        <div className="space-y-8 lg:w-3/4 mx-auto">
          <p className="text-muted-foreground text-center">
            In emergencies, swift communication is paramount, and traditional
            methods of broadcasting urgent information often face limitations in
            reaching the highest number of relevant people as quickly as
            possible. Missing Link seeks to address these challenges by
            supplementing and extending current methods, utilizing modern
            technologies to ensure the safety not only of children but also of
            adults and valuable assets such as vehicles and motorbikes.
          </p>
        </div>
      </section>
      <SectionTitle title="Alerts" />
      <section className="w-full py-2 flex justify-between items-center">
        <div className="space-y-8 lg:w-3/4 mx-auto">
          <p className="text-muted-foreground text-center">
            With Missing Link, users have the power to broadcast different types
            of alerts to their immediate community during emergencies. Whether
            it&#39;s a missing person, stolen property, or a blood donation
            appeal, the use of PUSH notification technology ensures that
            relevant information reaches the right people at the right time. By
            allowing Missing Link notifications users can contribute to
            community safety effectively.
          </p>
        </div>
      </section>
      <SectionTitle title="Geolocation" />
      <section className="w-full py-2 flex justify-between items-center">
        <div className="space-y-8 lg:w-3/4 mx-auto">
          <p className="text-muted-foreground text-center">
            Geolocation technology is at the heart of Missing Link. It enables
            the delivery of targeted alerts based on the location of the
            receiver. You&#39;ll receive alerts specifically relevant to your
            neighborhood, allowing you to take prompt action and contribute to
            the safety of your community. Update your location to ensure that
            you only receive information within your community.
          </p>
        </div>
      </section>
      <SectionTitle title="Preferences" />
      <section className="w-full py-2 flex justify-between items-center">
        <div className="space-y-8 lg:w-3/4 mx-auto">
          <p className="text-muted-foreground text-center">
            Your safety, your way. Set your preferred distance for receiving
            alerts to ensure that you only receive information within your
            community. Customize the types of alerts you want to receive—by
            default, all users will receive missing person alerts. We are also
            looking to intergrate a{" "}
            <InlineButtonLink title="reward system" href="/profile/rewards" />{" "}
            aimed at incentivizing and encouraging active participation from
            community members.
          </p>
        </div>
      </section>
      <SectionTitle title="More than Alerts" />
      <section className="w-full py-2 flex justify-between items-center">
        <div className="space-y-8 lg:w-3/4 mx-auto">
          <p className="text-muted-foreground text-center">
            Missing Link goes beyond alerts. We are committed to providing a
            wealth of information to the public. From emergency contacts to
            safety guidelines and community-driven initiatives, our platform
            serves as a hub for valuable resources. By fostering community
            engagement, we empower individuals to actively participate in public
            safety and make a positive impact.{" "}
            <InlineButtonLink title="Join Us" href="/login" /> at Missing Link
            and be part of a community that prioritizes safety, collaboration,
            and the well-being of all its members. Together, we can create a
            safer and more connected world.
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;
