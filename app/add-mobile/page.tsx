import { ServerAuthProvider } from "../../auth/server-auth-provider";
import { Metadata } from "next";
import { RegisterForm } from "./RegisterForm";
import Container from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Register",
  description: "Register and verify your account",
};

export default function Register() {
  return (
    <Container>
      <ServerAuthProvider>
        <RegisterForm />
      </ServerAuthProvider>
    </Container>
  );
}
