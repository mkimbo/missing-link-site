"use client";
import React, { BaseSyntheticEvent, useState } from "react";
import { Control, Controller, useFormContext } from "react-hook-form";
import Autocomplete from "react-google-autocomplete";
import { processPlaceDetails } from "@/lib/functions";
import { FormItem, FormLabel, FormMessage } from "../ui/form";

type Props = {
  name: string;
  country?: string;
  label: string;
  control: Control<any>;
  placeholder?: string;
};

export default function FormLocationInput({
  name,
  control,
  country,
  label,
  placeholder,
}: Props) {
  const [errors, setErrors] = useState<String[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { setValue } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>

          <Autocomplete
            {...field}
            placeholder={placeholder}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            onLoad={() => {
              inputRef!.current!.value = "";
            }}
            ref={inputRef}
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            options={{
              types: [],
              componentRestrictions: { country: country ?? "ke" },
            }}
            onBlur={(e: BaseSyntheticEvent) => {
              setValue(name, e.target.value, { shouldValidate: true });
              setValue("placeId", "", { shouldValidate: true });
            }}
            onPlaceSelected={async (place) => {
              const res = await processPlaceDetails(place);
              if (!res) {
                setErrors([
                  ...errors,
                  `Error processing location, please choose another nearby landmark`,
                ]);
                return field.onChange("");
              }
              setErrors([]);
              setValue("placeId", res.placeId, { shouldValidate: true });
              setValue("geoloc", res.geoloc, { shouldValidate: true });
              setValue("geohash", res.geohash, { shouldValidate: true });
              setValue("longAddress", res.longAddress, {
                shouldValidate: true,
              });
              setValue("formattedAddress", res.formattedAddress, {
                shouldValidate: true,
              });
              setValue("county", res.county, { shouldValidate: true });
              setValue("constituency", res.constituency, {
                shouldValidate: true,
              });
              const inputElement = inputRef.current;
              setValue(name, inputElement?.value);
            }}
          />
          {formState.errors?.placeId && (
            <span className="text-destructive self-start text-sm">
              {formState.errors?.placeId?.message as string}
            </span>
          )}
          {errors.length > 0 &&
            errors.map((e) => (
              <span
                key={e.toString()}
                className="text-destructive self-start text-sm"
              >
                {e}
              </span>
            ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
