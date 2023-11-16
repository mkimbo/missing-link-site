"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getVerifiedCookie, setVerifiedCookie } from "@/lib/functions";
import { useZact } from "zact/client";

import { Loader } from "lucide-react";
import { verifyMobileNumber } from "../actions/actions";
import { useAuth } from "@/auth/context";
const formSchema = z.object({
  otpCode: z.string().min(6, "Please enter a valid OTP code."),
});

export function VerifyForm() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate, data, isLoading } = useZact(verifyMobileNumber);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otpCode: "",
    },
  });

  useEffect(() => {
    const redirect = searchParams?.get("redirect") || "/";
    const phoneNumber = searchParams?.get("phoneNumber");
    if (!phoneNumber || !redirect) {
      router.push("/");
    }
    const verified = getVerifiedCookie();
    if (verified === "true") {
      router.push(redirect);
    }
  }, [router, searchParams]);

  useEffect(() => {
    if (data) {
      const redirect = searchParams?.get("redirect") || "/";
      setVerifiedCookie("true");
      // window.location.reload();
      router.push(redirect);
    }
  }, [data, router, searchParams]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const phoneNumber = searchParams?.get("phoneNumber");
    mutate({
      id: user?.uid!,
      email: user?.email!,
      phoneNumber: phoneNumber!,
      otpCode: values.otpCode,
      photoUrl: user?.photoURL ?? ``,
    });
    console.log(values);
  }

  return (
    <Card className="w-[350px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>Account Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="otpCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the verification code you received.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
