"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, User2 } from "lucide-react";
import { useLoadingCallback } from "react-loading-hook";
import { useFirebaseAuth } from "@/auth/firebase";
import { deleteVerifiedCookie } from "@/lib/functions";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "../auth/context";
import { Button } from "./ui/button";
import { deleteAuthCookies } from "@/app/actions/actions";
import { useTheme } from "next-themes";
import ToggleThemeIcon from "./ToggleThemeIcon";

const ProfileButton = () => {
  const { user } = useAuth();
  const tenant = user;
  const { getFirebaseAuth } = useFirebaseAuth();

  // const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  const isLoginRoute = path?.includes("/login");
  const { theme, setTheme } = useTheme();
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

            <DropdownMenuItem
              className="cursor-pointer flex flex-row"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "Light Theme" : "Dark Theme"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : isLoginRoute ? (
        <ToggleThemeIcon />
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
