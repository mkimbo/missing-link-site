import { ServerAuthProvider } from "../../auth/server-auth-provider";
import { Metadata } from "next";
import Container from "@/components/ui/container";
import AlertsList from "./AlertsList";

export const metadata: Metadata = {
  title: "Alerts",
  description: "Alerts you receive from the community",
};

export default function Register() {
  return (
    <Container>
      <ServerAuthProvider>
        <AlertsList />
      </ServerAuthProvider>
    </Container>
  );
}
