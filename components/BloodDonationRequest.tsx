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
import { saveDonationRequest } from "@/app/actions/actions";
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
import { donationRequestFormSchema } from "@/types/zod_schemas";
type Props = {
  appealId: string;
  creatorId: string;
  donorContact?: string;
  isCompatible?: boolean;
};

export function BloodDonationRequest({
  appealId,
  creatorId,
  donorContact,
  isCompatible,
}: Props) {
  const { user } = useAuth();
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  type TDonationRequestForm = z.infer<typeof donationRequestFormSchema>;

  const methods = useForm<TDonationRequestForm>({
    resolver: zodResolver(donationRequestFormSchema),
    reValidateMode: "onChange",
    defaultValues: {
      requestAccepted: false,
      appealId: appealId,
      donorId: user?.uid!,
      donorRequestContact: donorContact!,
      PIDisclaimer: false,
    },
  });

  const { handleSubmit, control, getValues, reset } = methods;
  const { mutate, data, isLoading } = useZact(saveDonationRequest);

  React.useEffect(() => {
    if (data?.success) {
      toast({
        title: "Thank you, request recorded succesfully!",
      });
      reset();
      setOpen(false);
    }
  }, [data, reset]);

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
        <Button
          variant="default"
          className="w-full my-2"
          disabled={!isCompatible}
        >
          {isCompatible
            ? "Send A Donation Request"
            : "Incompatible Blood Group"}
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
                disabled={isLoading || !getValues().PIDisclaimer}
                type="button"
                variant="default"
                onClick={async () => {
                  if (!user) return;

                  handleSubmit((values) => {
                    mutate({
                      ...values,
                    });
                  })();
                }}
              >
                {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
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
