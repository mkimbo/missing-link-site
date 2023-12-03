import { ServerAuthProvider } from "@/auth/server-auth-provider";
import Container from "@/components/ui/container";
import React from "react";
import AllResources from "./AllResources";
import EmergencyContacts from "./EmergencyContacts";
import PoliceContacts from "./police/PoliceContacts";
import HealthTips from "./health/HealthTips";
import PersonalHealth from "./health/PersonalHealth";

type Props = {};

export default function Resources({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  const resourceType = searchParams.type;
  //   if (!alertType) {
  //     throw new Error("Missing alert type");
  //   }

  function getResource(resourceType: string) {
    switch (resourceType) {
      case "emergency":
        return <EmergencyContacts />;
      case "police-contacts":
        return <PoliceContacts />;
      case "health":
        return <HealthTips />;
      case "personal-health":
        return <PersonalHealth />;
      default:
        return <AllResources />;
    }
  }

  return (
    <Container>
      <ServerAuthProvider>
        <div className="">{getResource(resourceType)}</div>
      </ServerAuthProvider>
    </Container>
  );
}
