import { ServerAuthProvider } from "@/auth/server-auth-provider";
import Container from "@/components/ui/container";
import React from "react";
import AllResources from "./AllResources";
import EmergencyContacts from "./emergency/EmergencyContacts";
import PoliceContacts from "./emergency/police/PoliceContacts";
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
import { AmbulanceContacts } from "./emergency/AmbulanceContacts";
import PoliceStationHeader from "./emergency/police/PoliceStationHeader";
import AmbulancesHeader from "./emergency/AmbulancesHeader";
import ResourceHeader from "./ResourceHeader";

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
      case "ambulance-contacts":
        return <AmbulanceContacts />;
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

  function getResourceHeader(resourceType: string) {
    switch (resourceType) {
      case "emergency":
        return <ResourceHeader title="" />;
      case "police-contacts":
        return <PoliceStationHeader />;
      case "ambulance-contacts":
        return <AmbulancesHeader />;
      case "health":
        return <ResourceHeader title="" />;
      case "personal-health":
        return <ResourceHeader title="Personal Health" />;
      case "mental-health":
        return <ResourceHeader title="Mental Health" />;
      case "sexual-health":
        return <ResourceHeader title="Sexual Health" />;
      case "first-aid":
        return <ResourceHeader title="First Aid" />;
      case "safety":
        return <ResourceHeader title="" />;
      case "fire-safety":
        return <ResourceHeader title="Fire Safety" />;
      case "personal-safety":
        return <ResourceHeader title="Personal Safety" />;
      case "online-safety":
        return <ResourceHeader title="Online Safety" />;
      case "child-safety":
        return <ResourceHeader title="Child Safety" />;
      case "awareness":
        return <ResourceHeader title="" />;
      case "financial-literacy":
        return <ResourceHeader title="Financial Literacy" />;
      case "comprehensive-sexuality-education":
        return <ResourceHeader title="What is CSE?" />;
      case "sexual-harrassment-and-gbv":
        return <ResourceHeader title="Sexual Harassment and GBV" />;
      case "political-awareness":
        return <ResourceHeader title="Political Education" />;
      default:
        return <ResourceHeader title="" />;
    }
  }

  return (
    <ServerAuthProvider>
      <div className="sticky self-end top-0 z-50 backdrop-blur-lg w-full">
        {getResourceHeader(resourceType)}
      </div>
      <div className="container mx-auto px-4 py-1">
        {getResource(resourceType)}
      </div>
    </ServerAuthProvider>
  );
}
