"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFirebaseAuth } from "../../auth/firebase";
import { useLoadingCallback } from "react-loading-hook";
import { useAuth } from "../../auth/context";
//import styles from "./register.module.css"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import EmailPasswordForm, { TEmailForm } from "@/components/EmailPasswordForm";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RegisterPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [hasLogged, setHasLogged] = React.useState(false);
  const { user } = useAuth();
  const { getFirebaseAuth } = useFirebaseAuth();
  const redirect = params?.get("redirect");
  const [registerWithEmailAndPassword, isRegisterLoading, error] =
    useLoadingCallback(async ({ email, password }: TEmailForm) => {
      setHasLogged(false);
      const auth = getFirebaseAuth();
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(credential.user);
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

  function getLoginUrl() {
    if (redirect) {
      return `/login?redirect=${redirect}`;
    }

    return "/login";
  }

  return (
    <div className="flex flex-col  justify-center items-center pt-10  sm:pt-20 px-4">
      {hasLogged && (
        <div>
          <span>
            Redirecting to <strong>{params?.get("redirect") || "/"}</strong>
          </span>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        </div>
      )}
      {!hasLogged && (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Register</CardTitle>
            <CardDescription className="text-center">
              <span>
                {" "}
                By signing up, you accept our{" "}
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
              onSubmit={registerWithEmailAndPassword}
              loading={isRegisterLoading}
              error={error}
            >
              <Link href={getLoginUrl()}>
                <Button disabled={isRegisterLoading}>Back to login</Button>
              </Link>
            </EmailPasswordForm>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
