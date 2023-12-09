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
import SafetyTips from "./safety/SafetyTips";
import FireSafety from "./safety/FireSafety";
import PersonalSafety from "./safety/PersonalSafety";
import OnlineSafety from "./safety/OnlineSafety";
import ChildSafety from "./safety/ChildSafety";
import AwarenessInformation from "./awareness/AwarenessInformation";
import FinancialLiteracy from "./awareness/FinancialLiteracy";
import CSE from "./awareness/CSE";
import SHGBV from "./awareness/SHGBV";
import PoliticalEducation from "./awareness/PoliticalAwareness";

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
      case "safety":
        return <SafetyTips />;
      case "fire-safety":
        return <FireSafety />;
      case "personal-safety":
        return <PersonalSafety />;
      case "online-safety":
        return <OnlineSafety />;
      case "child-safety":
        return <ChildSafety />;
      case "awareness":
        return <AwarenessInformation />;
      case "financial-literacy":
        return <FinancialLiteracy />;
      case "comprehensive-sexuality-education":
        return <CSE />;
      case "sexual-harrassment-and-gbv":
        return <SHGBV />;
      case "political-awareness":
        return <PoliticalEducation />;
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
