"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFirebaseAuth } from "../../auth/firebase";
import { useLoadingCallback } from "react-loading-hook";
import { getGoogleProvider, loginWithProvider } from "./firebase";
//import styles from "./login.module.css";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signInWithEmailAndPassword } from "firebase/auth";
import EmailPasswordForm, { TEmailForm } from "@/components/EmailPasswordForm";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getVerifiedCookie } from "@/lib/functions";

export function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [hasLogged, setHasLogged] = React.useState(false);
  const { getFirebaseAuth } = useFirebaseAuth();
  const redirect = params?.get("redirect");
  const searchParams = useSearchParams();
  React.useEffect(() => {
    const redirect = searchParams?.get("redirect") || "/";
    const verified = getVerifiedCookie();
    if (verified === "true") {
      if (!redirect) {
        router.push("/");
      } else {
        router.push(redirect);
      }
    }
  }, [router, searchParams]);
  const [handleLoginWithEmailAndPassword, isEmailLoading, error] =
    useLoadingCallback(async ({ email, password }: TEmailForm) => {
      setHasLogged(false);
      const auth = getFirebaseAuth();
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idTokenResult = await credential.user.getIdTokenResult();
      await fetch("/api/login", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idTokenResult.token}`,
        },
      });
      setHasLogged(true);
      router.push(redirect ?? "/");
    });

  const [handleLoginWithGoogle, isGoogleLoading] = useLoadingCallback(
    async () => {
      setHasLogged(false);
      const auth = getFirebaseAuth();
      const user = await loginWithProvider(auth, getGoogleProvider(auth));
      const idTokenResult = await user.getIdTokenResult();
      await fetch("/api/login", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idTokenResult.token}`,
        },
      });
      setHasLogged(true);
      router.push(redirect ?? "/");
    }
  );

  return (
    <div className="flex flex-col items-center pt-10  sm:pt-20 px-4">
      {hasLogged && (
        <div>
          <span>
            Redirecting to <strong>{redirect || "/"}</strong>
          </span>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        </div>
      )}
      {!hasLogged && (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
            <CardDescription className="text-center">
              <span>
                {" "}
                By logging in, you accept our{" "}
                <Link className="text-primary" href="#">
                  terms{" "}
                </Link>
                and{" "}
                <Link className="text-primary" href="#">
                  privacy policy
                </Link>
                .{"\n                            "}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmailPasswordForm
              loading={isEmailLoading}
              onSubmit={handleLoginWithEmailAndPassword}
              error={error}
            >
              <div className="flex flex-col ">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  // loading={isGoogleLoading}
                  className="w-full mt-2"
                  disabled={isGoogleLoading}
                  onClick={handleLoginWithGoogle}
                >
                  {isGoogleLoading && (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Google
                </Button>
              </div>
            </EmailPasswordForm>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
