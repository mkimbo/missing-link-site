import React from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

type Props = {
  name: string;
  type?: string;
  label?: string;
  control: Control<any>;
  placeholder?: string;
};

export default function FormTextField({
  name,
  type,
  label,
  control,
  placeholder,
}: Props) {
  return (
    <div className="w-full md:w-6/12">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder={placeholder}
                onChange={(e) => {
                  if (type == "number") {
                    field.onChange(parseInt(e.target.value));
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
                type={type}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
