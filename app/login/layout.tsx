import { ServerAuthProvider } from "../../auth/server-auth-provider";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ServerAuthProvider>{children}</ServerAuthProvider>;
}
