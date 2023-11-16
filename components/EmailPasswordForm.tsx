import { FirebaseError } from "firebase-admin";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader, LucideGithub } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const emailformSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Please a password of at least 6 characters."),
});

export type TEmailForm = z.infer<typeof emailformSchema>;

interface EmailPasswordForm
  extends Omit<JSX.IntrinsicElements["form"], "onSubmit"> {
  loading: boolean;
  onSubmit: (value: TEmailForm) => void;
  error?: FirebaseError;
}

export default function EmailPasswordForm({
  children,
  loading,
  onSubmit,
}: EmailPasswordForm) {
  const params = useSearchParams();
  const path = usePathname();
  const isLoginRoute = path?.includes("/login");
  const redirect = params?.get("redirect");
  const form = useForm<TEmailForm>({
    resolver: zodResolver(emailformSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function passRedirectParam(url: string) {
    if (redirect) {
      return `${url}?redirect=${redirect}`;
    }

    return url;
  }
  return (
    <div className="grid gap-6 ">
      <Form {...form}>
        <form className="mb-0" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading}>
              {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Sign In with Email
            </Button>

            {isLoginRoute && (
              <>
                <span className="text-xs">
                  Forgot password?{" "}
                  <Link
                    href={passRedirectParam("/reset-password")}
                    className="text-primary"
                  >
                    Reset here
                  </Link>
                </span>
                <span className="text-xs mb-4">
                  New user?{" "}
                  <Link
                    className="text-primary"
                    href={passRedirectParam("/register")}
                  >
                    Register
                  </Link>
                </span>
              </>
            )}
          </div>
        </form>
      </Form>
      {children}
    </div>
  );
}
