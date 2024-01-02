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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PhoneNumberRegex } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getVerifiedCookie } from "@/lib/functions";
import { useZact } from "zact/client";
import { Loader } from "lucide-react";
import { registerMobileNumber } from "../actions/actions";
const formSchema = z.object({
  mobile: z.string().regex(PhoneNumberRegex, "Please enter a valid mobile no."),
});

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect") || "/";
  const { mutate, data, isLoading } = useZact(registerMobileNumber);

  useEffect(() => {
    const redirect = searchParams?.get("redirect");
    if (!redirect) {
      router.push("/");
    }
    const verified = getVerifiedCookie();
    if (verified === "true" && redirect) {
      router.push(redirect);
    }
  }, [router, searchParams]);

  useEffect(() => {
    if (data?.success) {
      const params = new URLSearchParams();
      params.append("phoneNumber", data.mobile);
      params.append("redirect", redirect);
      const url = `/verify?${params.toString()}`;
      router.push(url);
    }
  }, [data, redirect, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const phoneNumber = `+254${values.mobile.slice(1)}`;
    mutate({ mobile: phoneNumber });
  }

  return (
    <Card className="w-[350px] mx-auto mt-40 border-0">
      <CardHeader className="text-center">
        <CardTitle>Verify Phone</CardTitle>
        <CardDescription>
          Verify your account with a phone number.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
            <div className="text-sm text-center">
              Message and data rates may apply.
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
