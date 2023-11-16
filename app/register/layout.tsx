import { ServerAuthProvider } from "../../auth/server-auth-provider";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ServerAuthProvider>{children}</ServerAuthProvider>;
}
