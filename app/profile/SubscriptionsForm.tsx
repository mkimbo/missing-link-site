"use client";
import React, { useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { useZact } from "zact/client";
import { Loader } from "lucide-react";
import { updateUser } from "../actions/actions";
import FormRadioGroup from "@/components/form_inputs/form_radio_group";

const FormSchema = z.object({
  bikeAlerts: z.boolean(),
  vehicleAlerts: z.boolean(),
  personAlerts: z.boolean(),
  bloodAppealAlerts: z.boolean(),
  bloodGroup: z.string().optional(),
});

interface SubscriptionsFormProps {
  userId: string;
  missingVehicleAlerts: boolean;
  missingBikeAlerts: boolean;
  bloodAppealAlerts: boolean;
  bloodGroup: string;
}

function SubscriptionsForm({
  userId,
  missingVehicleAlerts,
  missingBikeAlerts,
}: SubscriptionsFormProps) {
  const [show, setShow] = React.useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      vehicleAlerts: missingVehicleAlerts,
      bikeAlerts: missingBikeAlerts,
      personAlerts: true,
      bloodAppealAlerts: false,
      bloodGroup: "",
    },
  });
  const { mutate, data, isLoading } = useZact(updateUser);
  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate({
      id: userId,
      missingPersonAlerts: true,
      missingVehicleAlerts: data.vehicleAlerts,
      missingBikeAlerts: data.bikeAlerts,
      bloodAppealAlerts: data.bloodAppealAlerts,
      bloodGroup: data.bloodGroup,
    });
  }
  useEffect(() => {
    if (data?.success) {
      toast({
        title: "Settings updated successfully!",
      });
    }
  }, [data]);
  console.log(userId, "user");
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <FormField
            control={form.control}
            name="personAlerts"
            render={({ field }) => (
              <FormItem className="flex w-full flex-row items-center justify-between">
                <div>
                  <FormLabel>Missing Person</FormLabel>
                  <FormDescription>
                    You will receive alerts of missing persons near you.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    id="personAlerts"
                    disabled
                    defaultChecked={true}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <FormField
            control={form.control}
            name="vehicleAlerts"
            render={({ field }) => (
              <FormItem className="flex w-full  flex-row items-center justify-between">
                <div>
                  <FormLabel>Missing Cars</FormLabel>
                  <FormDescription>
                    You can subscribe to receive missing vehicle alerts.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    id="vehicleAlerts"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <FormField
            control={form.control}
            name="bikeAlerts"
            render={({ field }) => (
              <FormItem className="flex w-full  flex-row items-center justify-between">
                <div>
                  <FormLabel>Missing Bikes</FormLabel>
                  <FormDescription>
                    You can subscribe to receive missing motor bike alerts.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <FormField
            control={form.control}
            name="bloodAppealAlerts"
            render={({ field }) => (
              <FormItem className="flex w-full  flex-row items-center justify-between">
                <div>
                  <FormLabel>Blood Appeals</FormLabel>
                  <FormDescription>
                    You can subscribe to receive blood donation appeals. You
                    will need to provide your blood group so that you can only
                    receive relevant appeals.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    id="bloodAppealAlerts"
                    checked={field.value}
                    onCheckedChange={(value) => {
                      field.onChange(value);
                      if (value) {
                        setShow(true);
                      } else {
                        setShow(false);
                        form.setValue("bloodGroup", "");
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {show && (
          <div className="flex items-center justify-between space-x-2">
            <FormRadioGroup
              name="bloodGroup"
              control={form.control}
              label="Blood Group"
              options={[
                { value: "A+", label: "A+" },
                { value: "A-", label: "A-" },
                { value: "B+", label: "B+" },
                { value: "B-", label: "B-" },
                { value: "AB+", label: "AB+" },
                { value: "AB-", label: "AB-" },
                { value: "O+", label: "O+" },
                { value: "O-", label: "O-" },
              ]}
            />
          </div>
        )}
        <Button variant="outline" className="w-full">
          {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Save preferences
        </Button>
      </form>
    </Form>
  );
}

export default SubscriptionsForm;
