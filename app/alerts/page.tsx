import { ServerAuthProvider } from "../../auth/server-auth-provider";
import { Metadata } from "next";

import AlertsList from "./AlertsList";

export const metadata: Metadata = {
  title: "Alerts",
  description: "Alerts you receive from the community",
};

export default function Register() {
  return (
    <div className="container mx-auto px-4 py-1">
      <ServerAuthProvider>
        <AlertsList />
      </ServerAuthProvider>
    </div>
  );
}
