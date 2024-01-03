"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useEffect, useState } from "react";
import { getVerifiedCookie } from "@/lib/functions";
import { useZact } from "zact/client";
import { ChevronDown, Loader } from "lucide-react";
import { registerMobileNumber } from "../actions/actions";
import countries from "../../public/countries.json";
import { TCountryData } from "@/types/common";
import { ScrollArea } from "@/components/ui/scroll-area";
const formSchema = z.object({
  mobile: z.string().regex(PhoneNumberRegex, "Please enter a valid mobile no."),
});

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect") || "/";
  const { mutate, data, isLoading } = useZact(registerMobileNumber);
  const [selectedCountry, setSelectedCountry] = useState("KE");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const allcountries = Array.from(countries).map((item) => {
    return {
      name: item.name,
      code: item.code,
      dialCode: item.dial_code,
    } as TCountryData;
  });
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
      params.append("country", selectedCountry);
      params.append("redirect", redirect);
      const url = `/verify?${params.toString()}`;
      router.push(url);
    }
  }, [data, redirect, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const code = allcountries.find(
      (country) => country.code === selectedCountry
    )?.dialCode;
    if (!code) return;
    const phoneNumber = `${code}${removeLeadingZero(values.mobile.toString())}`;
    console.log(phoneNumber);
    // mutate({ mobile: phoneNumber });
  }

  function removeLeadingZero(mobileNumber: string) {
    if (mobileNumber.startsWith("0")) {
      return mobileNumber.substring(1);
    } else {
      return mobileNumber;
    }
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
            <div className="flex items-center">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <div className="h-9 p-2">
                    <div className="w-24 text-sm flex flex-row justify-evenly">
                      <span
                        className={`fi fi-${selectedCountry.toLocaleLowerCase()}`}
                      ></span>
                      <span>
                        {
                          allcountries.find(
                            (country) => country.code === selectedCountry
                          )?.dialCode
                        }
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-24 p-0">
                  <Command>
                    <CommandInput placeholder="" className="h-9" />
                    <CommandEmpty>No result.</CommandEmpty>
                    <ScrollArea className="h-72">
                      <CommandGroup>
                        {allcountries.map((country) => (
                          <CommandItem
                            key={country.code}
                            value={country.name}
                            onSelect={(currentValue) => {
                              setSelectedCountry(country.code);
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <div className="w-fit text-sm flex flex-row justify-evenly">
                              <span
                                className={`fi fi-${country.code.toLocaleLowerCase()} mr-2`}
                              ></span>
                              <span> {country.dialCode} </span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </ScrollArea>
                  </Command>
                </PopoverContent>
              </Popover>

              <div className="relative w-full">
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
