"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { TRadius } from "@/types/common";
import { useZact } from "zact/client";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { updateUser } from "../actions/actions";

const FormSchema = z.object({
  alertRadius: z.enum(["3", "5", "10", "50"], {
    required_error: "You need to select a valid distance.",
  }),
});

interface RadiusFormProps {
  userId: string;
  alertRadius: TRadius;
}

export function RadiusForm({ alertRadius, userId }: RadiusFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      alertRadius: alertRadius,
    },
  });
  const { mutate, data, isLoading } = useZact(updateUser);
  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate({
      id: userId,
      alertRadius: Number(data.alertRadius),
    });
  }

  useEffect(() => {
    if (data?.success) {
      toast({
        title: "Settings updated successfully!",
      });
    }
  }, [data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="alertRadius"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Receive alerts from....</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="3" />
                    </FormControl>
                    <FormLabel className="font-normal">3 Km away</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="5" />
                    </FormControl>
                    <FormLabel className="font-normal">5 Km away</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="10" />
                    </FormControl>
                    <FormLabel className="font-normal">10 Km away</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="50" />
                    </FormControl>
                    <FormLabel className="font-normal">50 Km away</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline" className="w-full">
          {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Save preferences
        </Button>
      </form>
    </Form>
  );
}
