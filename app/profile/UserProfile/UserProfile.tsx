"use client";

import * as React from "react";
import { useAuth } from "../../../auth/context";
//import styles from "./UserProfile.module.css";
import { useFirebaseAuth } from "../../../auth/firebase";
import { useLoadingCallback } from "react-loading-hook";
import { clientConfig } from "../../../config/client-config";

import { useRouter } from "next/navigation";
import { incrementCounter } from "../../actions/user-counters";
import { signOut, reload } from "firebase/auth";
import { Loader } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UserProfileProps {
  count: number;
}

export function UserProfile({ count }: UserProfileProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { getFirebaseAuth } = useFirebaseAuth();
  const [hasLoggedOut, setHasLoggedOut] = React.useState(false);
  const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
    const auth = getFirebaseAuth();
    await signOut(auth);
    setHasLoggedOut(true);
    await fetch("/api/logout", {
      method: "GET",
    });
    window.location.reload();
  });
  console.log(user, "user");
  const [handleClaims, isClaimsLoading] = useLoadingCallback(async () => {
    const auth = getFirebaseAuth();
    await fetch("/api/custom-claims", {
      method: "POST",
    });

    await auth.currentUser!.getIdTokenResult(true);
  });

  const [handleIncrementCounterApi, isIncrementCounterApiLoading] =
    useLoadingCallback(async () => {
      const response = await fetch("/api/user-counters", {
        method: "POST",
      });

      await response.json();
      router.refresh();
    });

  function handleRedirect() {
    router.push(
      `${clientConfig.redirectUrl}?redirect_url=${window.location.href}`
    );
  }

  let [isIncrementCounterActionPending, startTransition] =
    React.useTransition();

  if (!user && hasLoggedOut) {
    return (
      <div>
        <div>
          <h3>
            <span>You are being logged out...</span>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          </h3>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <Card>
        <h3>You are logged in as</h3>
        <div>
          <div>{user.photoURL && <img src={user.photoURL} />}</div>
          <span>{user.email}</span>
        </div>

        {!user.emailVerified && (
          <div>
            <Badge>Email not verified.</Badge>
          </div>
        )}

        <div>
          <div>
            <h5>Custom claims</h5>
            <pre>{JSON.stringify(user.customClaims, undefined, 2)}</pre>
          </div>
          <Button
            //loading={isClaimsLoading}
            disabled={isClaimsLoading}
            onClick={handleClaims}
          >
            {isClaimsLoading && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Refresh custom user claims
          </Button>
          <Button
            // loading={isLogoutLoading}
            disabled={isLogoutLoading}
            onClick={handleLogout}
          >
            {isLogoutLoading && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Log out
          </Button>
          <Button onClick={handleRedirect}>Redirect</Button>
        </div>
      </Card>
      <Card>
        <h3>
          {/* defaultCount is updated by server */}
          Counter: {count}
        </h3>
        <div>
          <Button
            // loading={isIncrementCounterApiLoading}
            disabled={
              isIncrementCounterApiLoading || isIncrementCounterActionPending
            }
            onClick={handleIncrementCounterApi}
          >
            {isIncrementCounterApiLoading && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update counter w/ api endpoint
          </Button>
          <Button
            //loading={isIncrementCounterActionPending}
            disabled={
              isIncrementCounterActionPending || isIncrementCounterApiLoading
            }
            onClick={() =>
              startTransition(() => incrementCounter() as unknown as void)
            }
          >
            {isIncrementCounterActionPending && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update counter w/ server action
          </Button>
        </div>
      </Card>
    </div>
  );
}
