"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

import { uploadFileToCloud } from "../../../auth/firebase";

import { useZact } from "zact/client";
import { newAlertFormSchema } from "@/types/zod_schemas";
import { saveAlert, sendMpesaSTKPush } from "@/app/actions/actions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAmountToPay, getFileObjectFromBlobUrl } from "@/lib/functions";
import ProgressBar from "@/components/ProgressBar";
import PersonStep1 from "./PersonStep1";
import { Card } from "@/components/ui/card";
import PersonStep2 from "./PersonStep2";
import PersonStep3 from "./PersonStep3";
import PersonSuccess from "./PersonSuccess";
import { toast } from "@/components/ui/use-toast";
import SaveAlertButton from "@/components/SaveAlertButton";
import { useUser } from "@/context/UserContext";

export type TFormSchema = z.infer<typeof newAlertFormSchema>;
export function MissingPersonAlert() {
  const { user } = useUser();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setProcessing] = useState(false);

  const methods = useForm<TFormSchema>({
    resolver: zodResolver(newAlertFormSchema),
    reValidateMode: "onChange",
    defaultValues: {
      fullname: "",
      PIDisclaimer: false,
      images: [],
      othername: "",
      age: 12,
      complexion: "",
      gender: "",
      secondaryContact: "",
      lastSeenDate: new Date().toISOString(),
      lastSeenDescription: "",
      obNumber: "",
      paymentMobileNo: user?.phoneNumber.number ?? "",
    },
  });

  const saveFiles = async (images: string[]): Promise<string[]> => {
    const files: string[] = [];

    for await (const item of images) {
      const file = await getFileObjectFromBlobUrl(item);
      const downloadUrl = await uploadFileToCloud(file);
      if (downloadUrl) {
        files.push(downloadUrl);
      }
    }

    return files;
  };

  const { handleSubmit, formState, trigger, getValues, reset } = methods;
  const { mutate, data, isLoading } = useZact(saveAlert);

  useEffect(() => {
    if (data?.success) {
      setCurrentStep(4);
    } else if (data?.error) {
      toast({
        title: data.error,
      });
    }
  }, [data, router, reset]);

  if (!user?.phoneNumber.number || !user?.id) {
    router.push("/add-mobile?redirect=/new?type=person");
  }

  return (
    <FormProvider {...methods}>
      <Card className=" lg:w-6/12 p-4 mt-6 mx-2 md:mx-4 lg:mx-auto">
        {currentStep != 4 && (
          <div className="flex flex-row justify-between mb-2">
            <div>
              {currentStep != 1 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className=""
                >
                  <ChevronLeft fontSize={25} />
                  <span>Back</span>
                </Button>
              )}
            </div>

            {currentStep != 3 && (
              <Button
                variant="default"
                disabled={currentStep == 1 && !getValues().PIDisclaimer}
                onClick={async () => {
                  if (currentStep == 1) {
                    const result = await trigger([
                      "fullname",
                      "othername",
                      "age",
                      "gender",
                      "complexion",
                      "secondaryContact",
                      "images",
                    ]);
                    if (result) setCurrentStep(currentStep + 1);
                  }
                  if (currentStep == 2) {
                    const result = await trigger([
                      "fullname",
                      "othername",
                      "age",
                      "gender",
                      "complexion",
                      "images",
                      "lastSeenDescription",
                      "lastSeenDate",
                      "lastSeenLocation",
                      "policeStation",
                      "obNumber",
                      "placeId",
                    ]);
                    if (result) setCurrentStep(currentStep + 1);
                  }
                }}
              >
                <span>Next</span>
                <ChevronRight fontSize={25} />
              </Button>
            )}
            {currentStep == 3 && (
              <SaveAlertButton
                loading={isProcessing || isLoading}
                onClick={async () => {
                  handleSubmit(async (values) => {
                    setProcessing(true);
                    if (values.alertRadius === "3") {
                      const files = await saveFiles(values.images);
                      const data = {
                        ...values,
                        createdBy: user?.id!,
                        images: files,
                        found: false,
                      };
                      mutate(data);
                    } else {
                      const payment = await sendMpesaSTKPush({
                        amount: parseInt(getAmountToPay(values.alertRadius)),
                        phoneNumber:
                          values.paymentMobileNo ?? user?.phoneNumber.number!,
                      });
                      if (payment.invoice.state == "COMPLETE") {
                        const files = await saveFiles(values.images);
                        const data = {
                          ...values,
                          createdBy: user?.id!,
                          images: files,
                          found: false,
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

        {currentStep != 4 && (
          <ProgressBar progress={Math.round((currentStep / 3) * 100)} />
        )}
        <div className="">
          {currentStep === 1 && <PersonStep1 />}
          {currentStep === 2 && <PersonStep2 />}
          {currentStep === 3 && <PersonStep3 />}
          {currentStep === 4 && data && (
            <PersonSuccess
              data={{
                id: data?.id!,
                numUsersNotified: data?.numUsersNotified!,
                shareTitle: getValues().fullname,
                shareDescription: getValues().lastSeenDescription,
              }}
            />
          )}
          {/* Steps {currentStep} */}
        </div>
      </Card>
    </FormProvider>
  );
}
