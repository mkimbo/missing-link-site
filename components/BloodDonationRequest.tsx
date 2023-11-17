"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useZact } from "zact/client";
import { savePersonSighting, saveMotorSighting } from "@/app/actions/actions";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { toast } from "./ui/use-toast";
import { Form } from "@/components/ui/form";
import { usePathname } from "next/navigation";
import { useAuth } from "@/auth/context";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import FormDisclaimerInput from "./form_inputs/form_disclaimer_input";
import { maskPhoneNumber } from "@/lib/functions";
type Props = {
  appealId: string;
  creatorId: string;
  donorContact?: string;
};

export function BloodDonationRequest({
  appealId,
  creatorId,
  donorContact,
}: Props) {
  const { user } = useAuth();
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const donationRequestFormSchema = z.object({
    appealId: z.string({ required_error: "Required" }),
    donorRequestContact: z.string({ required_error: "Required" }),
    donorId: z.string({ required_error: "Required" }),
    requestAccepted: z.boolean(),
  });

  type TSightingForm = z.infer<typeof donationRequestFormSchema>;

  const methods = useForm<TSightingForm>({
    resolver: zodResolver(donationRequestFormSchema),
    reValidateMode: "onChange",
    defaultValues: { requestAccepted: false },
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

  if (!user || !user?.email) {
    return (
      <Button
        variant="default"
        className="w-fit my-2"
        onClick={() => {
          const params = new URLSearchParams();
          params.append("redirect", `${path}`);
          const url = `/login?${params.toString()}`;
          router.push(url);
        }}
      >
        Login to donate
      </Button>
    );
  }

  return !donorContact ? (
    <Button
      variant="default"
      className="w-fit my-2"
      onClick={() => {
        const params = new URLSearchParams();
        params.append("redirect", `${path}`);
        const url = `/add-mobile?${params.toString()}`;
        router.push(url);
      }}
    >
      Verify your phone number to donate
    </Button>
  ) : user?.uid != creatorId ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full my-2">
          Send A Donation Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] pointer-events-auto">
        <Form {...methods}>
          <form className="w-full space-y-6">
            <DialogHeader>
              <DialogTitle className="text-center">Donate Request</DialogTitle>
              <DialogDescription className="text-left">
                <FormDisclaimerInput
                  name="PIDisclaimer"
                  label={`By submitting a donation request, you agree to share your
                phone number (${maskPhoneNumber(
                  donorContact
                )}) with the person who created this blood appeal.`}
                  control={control}
                />
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4"></div>
            <DialogFooter>
              <Button
                disabled={isLoading || isRunning}
                type="button"
                variant="default"
                onClick={async () => {
                  if (!user) return;

                  handleSubmit((values) => {
                    // if (type == "motor") {
                    //   mutate({
                    //     ...values,
                    //     sightedBy: user.uid!,
                    //     itemId: missingItem.id!,
                    //   });
                    // }
                    // if (type == "person") {
                    //   sendit({
                    //     ...values,
                    //     sightedBy: user.uid!,
                    //     itemId: missingItem.id!,
                    //   });
                    // }
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
