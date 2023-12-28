import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg ">
          What is Missing Link?
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground lg:pr-4">
          Missing Link is a community-centered platform designed to enhance
          public safety and awareness. It serves as a hub for sharing and
          receiving alerts about missing persons, blood donation appeals, and
          other critical public information. Missing Link aims to foster a sense
          of responsibility and collaboration within the community to ensure a
          swift and collective response to emergencies.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-lg ">
          How do Missing Link alerts work?
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground lg:pr-4">
          Missing Link alerts operate on a community-driven model. Users can
          broadcast alerts, and other community members can receive and act upon
          these alerts. The platform utilizes technologies like geolocation and
          push notifications to provide timely and location-specific
          information. The more users in your location, the more effective the
          alerts will be. Share the app with your friends and family create a
          network of vigilant community members.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-lg">
          Who can use Missing Link?
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground lg:pr-4">
          Missing Link is open to all responsible adults in the community. By
          fostering inclusivity, Missing Link aims to harness the collective
          power of the community for the greater good.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="text-lg ">
          How can I access Missing Link Alerts?
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground lg:pr-4">
          Accessing Missing Link Alerts is simple. You will need to login with
          an email and verify your account with your phone number to send
          alerts.You can also customize your notification preferences to receive
          alerts that matter most to you. The goal is to make real-time
          information easily accessible to everyone in the community, especially
          in case of emergencies.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="text-lg ">
          Will AI take my job?
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground lg:pr-4">
          Probably. But not today.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
