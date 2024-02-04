"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { useZact } from "zact/client";
import { bloodAppealSchema } from "@/types/zod_schemas";
import { saveBloodAppealAlert, sendMpesaSTKPush } from "@/app/actions/actions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BloodAppealStep2 from "./BloodAppealStep2";
import ProgressBar from "@/components/ProgressBar";
import BloodAppealStep1 from "./BloodRequestStep1";
import BloodAppealSuccess from "./BloodRequestSuccess";
import SaveAlertButton from "@/components/SaveAlertButton";
import { getAmountToPay, getRandomItem } from "@/lib/functions";
import { useUser } from "@/context/UserContext";
import { toast } from "@/components/ui/use-toast";

export type TFormSchema = z.infer<typeof bloodAppealSchema>;
export function MedicalAlert() {
  const { user } = useUser();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setProcessing] = useState(false);
  const methods = useForm<TFormSchema>({
    resolver: zodResolver(bloodAppealSchema),
    reValidateMode: "onChange",
    defaultValues: {
      PIDisclaimer: false,
      paymentMobileNo: user?.phoneNumber.number ?? "",
    },
  });

  const { handleSubmit, formState, trigger, getValues, reset } = methods;
  const { mutate, data, isLoading } = useZact(saveBloodAppealAlert);

  useEffect(() => {
    if (data?.success) {
      setCurrentStep(3);
    }
  }, [data, router, reset]);

  // if (!user?.phoneNumber.number || !user?.id) {
  //   router.push(`/add-mobile?redirect=/new?type=medical}`);
  // }

  return (
    <FormProvider {...methods}>
      <Card className=" lg:w-6/12 p-4 mt-6 mx-2 md:mx-4 lg:mx-auto">
        {currentStep != 3 && (
          <div className="flex flex-row justify-between mb-2">
            <div>
              {currentStep == 2 && (
                <Button
                  variant="default"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className=""
                >
                  <ChevronLeft fontSize={25} />
                  <span>Back</span>
                </Button>
              )}
            </div>

            {currentStep == 1 && (
              <Button
                variant="default"
                disabled={currentStep == 1 && !getValues().PIDisclaimer}
                onClick={async () => {
                  const result = await trigger([
                    "fullname",
                    "hospitalName",
                    "hospitalLocation",
                    "bloodGroup",
                    "bUnits",
                    "PIDisclaimer",
                    "secondaryContact",
                    "placeId",
                  ]);
                  if (result) setCurrentStep(currentStep + 1);
                }}
              >
                <span>Next</span>
                <ChevronRight fontSize={25} />
              </Button>
            )}

            {currentStep == 2 && (
              <SaveAlertButton
                loading={isProcessing || isLoading}
                onClick={async () => {
                  handleSubmit(async (values) => {
                    setProcessing(true);
                    if (values.alertRadius === "3" || values.alertReach === 0) {
                      const data = {
                        ...values,
                        createdBy: user?.id!,
                        paymentAmount:
                          values.alertRadius === "3"
                            ? 0
                            : getRandomItem([50, 100, 200]), // TODO: remove this
                      };
                      mutate(data);
                    } else {
                      const payment = await sendMpesaSTKPush({
                        amount: parseInt(getAmountToPay(values.alertRadius)),
                        phoneNumber:
                          values.paymentMobileNo ?? user?.phoneNumber.number!,
                      });
                      console.log(payment, "payment status");
                      if (payment.invoice.state == "COMPLETE") {
                        const data = {
                          ...values,
                          createdBy: user?.id!,
                          paymentId: payment.invoice.id,
                          paymentMobileNo: payment.invoice.account,
                          paymentMode: payment.invoice.provider,
                          paymentDate: payment.invoice.updated_at,
                          paymentReference: payment.invoice.mpesa_reference,
                          paymentAmount: payment.invoice.net_amount,
                        };
                        mutate(data);
                      } else {
                        toast({
                          title: "Payment not successful!",
                        });
                      }
                    }

                    setProcessing(false);
                  })();
                }}
              />
            )}
          </div>
        )}
        {currentStep != 3 && (
          <ProgressBar progress={Math.round((currentStep / 2) * 100)} />
        )}
        <div className="">
          {currentStep === 1 && <BloodAppealStep1 />}
          {currentStep === 2 && (
            <BloodAppealStep2
              caseLocation={[
                getValues().geoloc?.lat!,
                getValues().geoloc?.lng!,
              ]}
            />
          )}
          {currentStep === 3 && data && (
            <BloodAppealSuccess
              data={{
                id: data?.id!,
                numUsersNotified: data?.numUsersNotified!,
                shareTitle: getValues().fullname,
                shareDescription:
                  getValues().requestDescription || "Urgent Blood Request",
              }}
            />
          )}
        </div>
      </Card>
    </FormProvider>
  );
}
