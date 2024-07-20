"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useZact } from "zact/client";
import { savePersonSighting, saveMotorSighting } from "@/app/actions/actions";
import { TPerson } from "@/types/missing_person.model";
import { TMotor } from "@/types/misssing_motor.model";
import { z } from "zod";
import { newSightingFormSchema } from "@/types/zod_schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { toast } from "./ui/use-toast";
import { Form } from "@/components/ui/form";
import { FormDatePicker } from "./form_inputs/form_date_picker";
import FormLocationInput from "./form_inputs/form_location_input";
import FormTextArea from "./form_inputs/form_text_area";
import { usePathname } from "next/navigation";

import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useUser } from "@/context/UserContext";
type Props = {
  missingItem: TPerson | TMotor;
  type: "person" | "motor";
  creatorId: string;
};

export function SightingDialog({ missingItem, type, creatorId }: Props) {
  const { user } = useUser();
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const sightingFormSchema = z.intersection(
    newSightingFormSchema,
    z.object({
      sightingDate: z.string({ required_error: "Required" }),
    })
  );

  type TSightingForm = z.infer<typeof sightingFormSchema>;

  const methods = useForm<TSightingForm>({
    resolver: zodResolver(sightingFormSchema),
    reValidateMode: "onChange",
    defaultValues: { sightingDate: new Date().toDateString() },
  });

  const { handleSubmit, control, formState, reset } = methods;
  const { mutate, data, isLoading } = useZact(saveMotorSighting);
  const {
    mutate: sendit,
    data: response,
    isLoading: isRunning,
  } = useZact(savePersonSighting);

  function calculateDaysFromDate(date: number): number {
    const currentDate = new Date().getTime();
    const diffInMs = Math.abs(currentDate - date);
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
  }

  React.useEffect(() => {
    if (data?.success || response?.success) {
      toast({
        title: "Thank you, sighting recorded succesfully!",
      });
      reset();
      setOpen(false);
    }
  }, [data, response, reset]);
  console.log(user, "user");

  return !user || !user?.email ? (
    <Button
      variant="default"
      className="w-full"
      onClick={() => {
        const params = new URLSearchParams();
        params.append("redirect", `${path}`);
        const url = `/login?${params.toString()}`;
        router.push(url);
      }}
    >
      Login & verify your account to report a sighting
    </Button>
  ) : user?.id != creatorId ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          Report sighting
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] pointer-events-auto">
        <Form {...methods}>
          <form className="w-full space-y-6">
            <DialogHeader>
              <DialogTitle className="text-center">Report Sighting</DialogTitle>
              <DialogDescription className="text-center">
                Please provide info on where/when the sighting happened
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormDatePicker
                name="sightingDate"
                label="Sighting Date"
                control={control}
                minDate={calculateDaysFromDate(
                  new Date(missingItem.lastSeenDate).getTime()
                )}
              />
              <FormLocationInput
                label="Sigting Location"
                country={user?.country.toLowerCase() ?? "ke"}
                name="sightingLocation"
                control={control}
              />
              <FormTextArea
                label="Last Seen Description:"
                name="sightingDescription"
                control={control}
                placeholder="Briefly describe the circumstances of the last time you saw the person."
              />
            </div>
            <DialogFooter>
              <Button
                disabled={isLoading || isRunning}
                type="button"
                variant="default"
                onClick={async () => {
                  if (!user) return;

                  handleSubmit((values) => {
                    if (type == "motor") {
                      mutate({
                        ...values,
                        sightedBy: user.id!,
                        itemId: missingItem.id!,
                      });
                    }
                    if (type == "person") {
                      sendit({
                        ...values,
                        sightedBy: user.id!,
                        itemId: missingItem.id!,
                      });
                    }
                  })();
                }}
              >
                {(isLoading || isRunning) && (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  ) : (
    <></>
  );
}
