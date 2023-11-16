import React from "react";
import { Control, useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  name: string;
  label?: string;
  required?: boolean;
  control: Control<any>;
  placeholder?: string;
  className?: string;
  options: { value: string; label: string }[];
};

export default function FormAutoCompleteSelect({
  name,
  required,
  control,
  placeholder,
  options,
  label,
}: Props) {
  const { setValue, getValues } = useFormContext();
  return (
    <div className="w-full md:w-6/12">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-col py-2">
            <FormLabel className="">{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between pt-2",
                      !field.value && "text-muted-foreground text-sm"
                    )}
                  >
                    {field.value
                      ? options.find((option) => option.label === field.value)
                          ?.label
                      : "Select Police Station"}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search..."
                    className="h-9 text-sm"
                  />
                  <CommandEmpty>No result found.</CommandEmpty>
                  <CommandGroup>
                    <ScrollArea className="h-72 w-full rounded-md border">
                      {options.map((option) => (
                        <CommandItem
                          className="text-sm"
                          value={option.label}
                          key={option.value}
                          onSelect={() => {
                            console.log(option.label, "option.label");
                            setValue("policeStation", option.label);
                          }}
                        >
                          {option.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              option.label === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </ScrollArea>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
