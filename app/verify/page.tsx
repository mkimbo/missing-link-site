import { ServerAuthProvider } from "../../auth/server-auth-provider";
import { Metadata } from "next";
import Container from "@/components/ui/container";
import { VerifyForm } from "./VerifyForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Register and verify your account",
};

export default function Register() {
  return (
    <Container>
      <ServerAuthProvider>
        <VerifyForm />
      </ServerAuthProvider>
    </Container>
  );
}
