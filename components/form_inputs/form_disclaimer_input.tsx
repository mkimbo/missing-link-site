import React from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "../ui/checkbox";

type Props = {
  name: string;
  label?: string;
  control: Control<any>;
};

export default function FormDisclaimerInput({ name, label, control }: Props) {
  return (
    <div className="w-full">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2 align-middle">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>{label}</FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
