"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useFirebaseAuth } from "../../auth/firebase";
import { useLoadingCallback } from "react-loading-hook";
//import styles from "./ResetPasswordPage.module.css";

import { sendPasswordResetEmail } from "firebase/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export function ResetPasswordPage() {
  const params = useSearchParams();
  const [email, setEmail] = React.useState("");
  const [isSent, setIsSent] = React.useState(false);
  const { getFirebaseAuth } = useFirebaseAuth();
  const redirect = params?.get("redirect");
  const [sendResetInstructions, loading, error] = useLoadingCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const auth = getFirebaseAuth();
      setIsSent(false);
      await sendPasswordResetEmail(auth, email);
      setEmail("");
      setIsSent(true);
    }
  );

  function getLoginUrl() {
    if (redirect) {
      return `/login?redirect=${redirect}`;
    }

    return "/login";
  }

  return (
    <div className="flex flex-col items-center pt-10  sm:pt-20 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Reset password</CardTitle>
          <CardDescription className="text-center">
            <span>We will mail you a link to reset your password</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={sendResetInstructions}>
            <Input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="Email address"
            />
            {isSent && <p>Instructions sent. Check your email.</p>}
            {error && <div className="text-destructive">{error?.message}</div>}
            <Button
              // loading={loading}
              disabled={loading}
              className="w-full my-4"
              type="submit"
            >
              {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Send reset instructions
            </Button>
            <br />

            <Link href={getLoginUrl()}>
              <Button disabled={loading}>Back to login</Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
