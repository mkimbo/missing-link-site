import { ServerAuthProvider } from "@/auth/server-auth-provider";
import Container from "@/components/ui/container";
import React from "react";
import AllResources from "./AllResources";
import EmergencyContacts from "./EmergencyContacts";
import PoliceContacts from "./police/PoliceContacts";
import HealthTips from "./health/HealthTips";
import PersonalHealth from "./health/PersonalHealth";
import MentalHealth from "./health/MentalHealth";
import SexualHealth from "./health/SexualHealth";
import FirstAid from "./health/FirstAid";

type Props = {};

export default function Resources({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  const resourceType = searchParams.type;

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
      case "mental-health":
        return <MentalHealth />;
      case "sexual-health":
        return <SexualHealth />;
      case "first-aid":
        return <FirstAid />;
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
