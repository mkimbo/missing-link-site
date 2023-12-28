"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFirebaseAuth } from "../../auth/firebase";
import { useLoadingCallback } from "react-loading-hook";
import { getGoogleProvider, loginWithProvider } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { TEmailForm } from "@/components/EmailPasswordForm";
import { CornerRightDown, Loader, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getVerifiedCookie } from "@/lib/functions";
import bgLarge from "../../public/img/login-bg-large.png";
import bgSmall from "../../public/img/login-bg-small.png";
import Image from "next/image";
import { FAQ } from "@/components/FAQ";
import SectionTitle from "@/components/SectionTitle";
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
      router.refresh();
    }
  );

  return (
    <div className="w-full">
      <div className="w-full lg:mt-2">
        <div className="hidden lg:flex h-[calc(100vh-180px)] justify-center ">
          <Image
            src={bgLarge}
            alt="Login background image"
            quality={100}
            objectFit="cover"
          />
        </div>

        <div className="lg:hidden h-[calc(100vh-210px)] ">
          <Image
            src={bgSmall}
            alt="Login background image"
            quality={100}
            objectFit="cover"
            className="h-full"
          />
        </div>

        <div className="px-4 text-center flex flex-col justify-center">
          <div className="flex flex-col space-y-2 text-center">
            <p className="text-sm text-muted-foreground">
              Keep your community informed and connected with real-time alerts
              during emergencies.
            </p>
            <div className="flex flex-row justify-center mt-6 space-x-2">
              <Button
                className="px-2 text-primary"
                variant={"outline"}
                onClick={() => router.push("#faqs")}
              >
                About Missing Link
                <CornerRightDown className="ml-1 h-4 w-4 animate-pulse" />
              </Button>
              <Button
                disabled={isGoogleLoading || hasLogged}
                onClick={handleLoginWithGoogle}
                className="px-2"
              >
                {isGoogleLoading && (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                )}
                Continue with Google
                {!isGoogleLoading && !hasLogged && (
                  <MoveRight className="ml-1 h-4 w-4 animate-pulse" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div id="faqs" className="w-full p-4 mx-auto">
        <SectionTitle title="Frequently Asked Questions" />
        <FAQ />
      </div>
    </div>
  );
}
