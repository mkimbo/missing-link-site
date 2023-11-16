"use client";

import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function LoginSightingButton() {
  const router = useRouter();
  const path = usePathname();
  return (
    <Button
      variant="default"
      className="w-full"
      onClick={() => {
        const params = new URLSearchParams();
        params.append("redirect", `${path}`);
        const url = `/login?${params.toString()}`;
        router.push(url);
      }}
    >
      Login to report sighting
    </Button>
  );
}
