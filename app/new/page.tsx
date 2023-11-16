import { ServerAuthProvider } from "@/auth/server-auth-provider";
import Container from "@/components/ui/container";
import React from "react";
import { MissingPersonAlert } from "./person/MissingPersonAlert";
import AlertOptions from "./AlertOptions";
import { MissingMotorAlert } from "./motor/MissingMotorAlert";
import { MedicalAlert } from "./medical/MedicalAlert";

type Props = {};

export default function NewAlert({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  const alertType = searchParams.type;
  //   if (!alertType) {
  //     throw new Error("Missing alert type");
  //   }

  function getAlertType(alertType: string) {
    switch (alertType) {
      case "person":
        return <MissingPersonAlert />;
      case "vehicle":
        return <MissingMotorAlert type="vehicle" />;
      case "bike":
        return <MissingMotorAlert type="bike" />;
      case "medical":
        return <MedicalAlert />;
      default:
        return <AlertOptions />;
    }
  }

  return (
    <Container>
      <ServerAuthProvider>
        <div className="">{getAlertType(alertType)}</div>
      </ServerAuthProvider>
    </Container>
  );
}
