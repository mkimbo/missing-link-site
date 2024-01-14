import { ServerAuthProvider } from "../../auth/server-auth-provider";
import { Metadata } from "next";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Register and verify your account",
};

export default function Register() {
  return (
    <div className="container mx-auto px-4 py-1">
      <ServerAuthProvider>
        <RegisterForm />
      </ServerAuthProvider>
    </div>
  );
}
