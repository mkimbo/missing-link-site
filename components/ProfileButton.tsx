"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User2 } from "lucide-react";
import { useLoadingCallback } from "react-loading-hook";
import { useFirebaseAuth } from "@/auth/firebase";
import { deleteVerifiedCookie } from "@/lib/functions";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "../auth/context";
import { Button } from "./ui/button";
import { deleteAuthCookies } from "@/app/actions/actions";

const ProfileButton = () => {
  const { user } = useAuth();
  const tenant = user;
  const { getFirebaseAuth } = useFirebaseAuth();

  // const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
    const auth = getFirebaseAuth();

    const { signOut } = await import("firebase/auth");
    await signOut(auth);
    await fetch("/api/logout", {
      method: "GET",
    });
    //dispatch(setTenant(null));
    //dispatch(setUser(null));
    deleteVerifiedCookie();
    deleteAuthCookies();
    window.location.reload();
  });

  return (
    <>
      {" "}
      {tenant?.email != null ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User2 />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push("/profile")}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Subscription
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant="default"
          size="sm"
          className="mr-2"
          aria-label="Login"
          onClick={() => {
            if (path == "/login") return;
            const params = new URLSearchParams();
            params.append("redirect", `${path}`);
            const url = `/login?${params.toString()}`;
            router.push(url);
          }}
        >
          <span>Login</span>
        </Button>
      )}
    </>
  );
};

export default ProfileButton;
