import { ServerAuthProvider } from "../../auth/server-auth-provider";

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ServerAuthProvider>{children}</ServerAuthProvider>;
}
