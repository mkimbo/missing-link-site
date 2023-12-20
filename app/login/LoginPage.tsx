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
import { ro } from "date-fns/locale";
//import bg from "../../public/img/login2.webp";
import bg from "../../public/img/login_bg1.png";
import Image from "next/image";
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
    <div className="w-full flex flex-col sm:flex-row  lg:mt-2 lg:py-8">
      <div className="p-4 text-center flex flex-col flex-1 justify-center lg:h-[500px] bg-primary lg:bg-accent">
        <h1 className="text-4xl lg:text-7xl font-semibold tracking-tight lg:text-primary">
          Missing Link
        </h1>
        <h1 className="text-sm lg:text-xl mt-2 font-semibold tracking-tight">
          Technology for community welfare.
        </h1>
      </div>

      <div className="p-4 text-center flex flex-col flex-1 justify-center">
        <div className="flex flex-col space-y-2 text-center">
          <p className="text-sm text-muted-foreground">
            Keep your community in the loop with timely alerts during
            emergencies.
          </p>
        </div>
        <Button
          // loading={isGoogleLoading}
          className="mx-auto mt-2"
          disabled={isGoogleLoading}
          onClick={handleLoginWithGoogle}
        >
          {isGoogleLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Continue with Google
        </Button>
      </div>
    </div>

    // <>
    //   <div className="md:hidden">
    //     <Image
    //       src={bg}
    //       width={1280}
    //       height={843}
    //       alt="Authentication"
    //       // className="hidden dark:block"
    //     />
    //   </div>
    //   <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    //     {/* <Link
    //     href="/examples/authentication"
    //     className={cn(
    //       buttonVariants({ variant: "ghost" }),
    //       "absolute right-4 top-4 md:right-8 md:top-8"
    //     )}
    //   >
    //     Login
    //   </Link> */}
    //     <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
    //       <div className="absolute inset-0 bg-zinc-900" />
    //       <div className="relative z-20 flex items-center text-lg font-medium">
    //         <Image
    //           src={bg}
    //           width={1280}
    //           height={843}
    //           alt="Authentication"
    //           // className="hidden dark:block"
    //         />
    //       </div>
    //       <div className="relative z-20 mt-auto">
    //         <blockquote className="space-y-2">
    //           <p className="text-lg">
    //             &ldquo;This library has saved me countless hours of work and
    //             helped me deliver stunning designs to my clients faster than
    //             ever before.&rdquo;
    //           </p>
    //           <footer className="text-sm">Sofia Davis</footer>
    //         </blockquote>
    //       </div>
    //     </div>
    //     <div className="lg:p-8">
    //       <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    //         <div className="flex flex-col space-y-2 text-center">
    //           <h1 className="text-2xl font-semibold tracking-tight">
    //             Create an account
    //           </h1>
    //           <p className="text-sm text-muted-foreground">
    //             Enter your email below to create your account
    //           </p>
    //         </div>
    //         <Button
    //           // loading={isGoogleLoading}
    //           className="w-full mt-2"
    //           disabled={isGoogleLoading}
    //           onClick={handleLoginWithGoogle}
    //         >
    //           {isGoogleLoading && (
    //             <Loader className="mr-2 h-4 w-4 animate-spin" />
    //           )}
    //           Google
    //         </Button>
    //         {/* <UserAuthForm /> */}
    //         <p className="px-8 text-center text-sm text-muted-foreground">
    //           By clicking continue, you agree to our{" "}
    //           <Link
    //             href="/terms"
    //             className="underline underline-offset-4 hover:text-primary"
    //           >
    //             Terms of Service
    //           </Link>{" "}
    //           and{" "}
    //           <Link
    //             href="/privacy"
    //             className="underline underline-offset-4 hover:text-primary"
    //           >
    //             Privacy Policy
    //           </Link>
    //           .
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </>
    // <div className="flex flex-col items-center pt-10  sm:pt-20 px-4">
    //   {/* {hasLogged && (
    //     <div>
    //       <span>
    //         Redirecting to <strong>{redirect || "/"}</strong>
    //       </span>
    //       <Loader className="mr-2 h-4 w-4 animate-spin" />
    //     </div>
    //   )} */}
    //   {!hasLogged && (
    //     <Card>
    //       <CardHeader>
    //         <CardTitle className="text-center">Login</CardTitle>
    //         <CardDescription className="text-center">
    //           <span>
    //             {" "}
    //             By logging in, you accept our{" "}
    //             <Link className="text-primary" href="#">
    //               terms{" "}
    //             </Link>
    //             and{" "}
    //             <Link className="text-primary" href="#">
    //               privacy policy
    //             </Link>
    //             .{"\n                            "}
    //           </span>
    //         </CardDescription>
    //       </CardHeader>
    //       <CardContent>
    //         <EmailPasswordForm
    //           loading={isEmailLoading}
    //           onSubmit={handleLoginWithEmailAndPassword}
    //           error={error}
    //         >
    //           <div className="flex flex-col ">
    //             <div className="relative">
    //               <div className="absolute inset-0 flex items-center">
    //                 <span className="w-full border-t" />
    //               </div>
    //               <div className="relative flex justify-center text-xs uppercase">
    //                 <span className="bg-background px-2 text-muted-foreground">
    //                   Or continue with
    //                 </span>
    //               </div>
    //             </div>

    //             <Button
    //               // loading={isGoogleLoading}
    //               className="w-full mt-2"
    //               disabled={isGoogleLoading}
    //               onClick={handleLoginWithGoogle}
    //             >
    //               {isGoogleLoading && (
    //                 <Loader className="mr-2 h-4 w-4 animate-spin" />
    //               )}
    //               Google
    //             </Button>
    //           </div>
    //         </EmailPasswordForm>
    //       </CardContent>
    //     </Card>
    //   )}
    // </div>
  );
}
