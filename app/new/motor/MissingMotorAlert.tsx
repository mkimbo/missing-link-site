"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

import { useZact } from "zact/client";
import { newAlertFormSchema, newMotorAlertSchema } from "@/types/zod_schemas";
import { useAuth } from "@/auth/context";
import { saveAlert, saveMotorAlert } from "@/app/actions/actions";
import { ChevronLeft, ChevronRight, Loader, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFileObjectFromBlobUrl } from "@/lib/functions";
import ProgressBar from "@/components/ProgressBar";
import { Card } from "@/components/ui/card";
import { uploadFileToCloud } from "@/auth/firebase";
import MotorStep1 from "./MotorStep1";
import MotorStep2 from "./MotorStep2";
import MotorStep3 from "./MotorStep3";
import MotorSuccess from "./MotorSuccess";

type Props = {
  type: string;
};

export type TFormSchema = z.infer<typeof newMotorAlertSchema>;
export function MissingMotorAlert({ type }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [savingFiles, setSavingFiles] = useState(false);

  const methods = useForm<TFormSchema>({
    resolver: zodResolver(newMotorAlertSchema),
    reValidateMode: "onChange",
    defaultValues: {
      motorType: type,
      make: "",
      images: [],
      model: "",
      PIDisclaimer: false,
      year: "",
      color: "",
      licencePlate: "",
      secondaryContact: "",
      lastSeenDate: new Date().toISOString(),
      lastSeenDescription: "",
      obNumber: "",
    },
  });

  const { handleSubmit, formState, trigger, getValues, reset } = methods;
  const { mutate, data, isLoading } = useZact(saveMotorAlert);

  useEffect(() => {
    if (data?.success) {
      setCurrentStep(4);
    }
  }, [data, router, reset]);

  if (!user?.email) {
    return null;
  }

  return (
    <FormProvider {...methods}>
      <Card className=" lg:w-6/12 p-4 mt-6 mx-2 md:mx-4 lg:mx-auto">
        {currentStep != 4 && (
          <div className="flex flex-row justify-between mb-2">
            <div>
              {currentStep != 1 && (
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

            {currentStep != 3 && (
              <Button
                variant="default"
                disabled={currentStep == 1 && !getValues().PIDisclaimer}
                onClick={async () => {
                  if (currentStep == 1) {
                    const result = await trigger([
                      "make",
                      "model",
                      "year",
                      "color",
                      "licencePlate",
                      "secondaryContact",
                      "images",
                    ]);
                    if (result) setCurrentStep(currentStep + 1);
                  }
                  if (currentStep == 2) {
                    const result = await trigger([
                      "make",
                      "model",
                      "year",
                      "color",
                      "licencePlate",
                      "images",
                      "lastSeenDescription",
                      "lastSeenDate",
                      "lastSeenLocation",
                      "policeStation",
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
              <Button
                variant="default"
                disabled={savingFiles || isLoading}
                onClick={async () => {
                  handleSubmit(async (values) => {
                    const files: string[] = [];
                    setSavingFiles(true);
                    for await (const item of values.images) {
                      const file = await getFileObjectFromBlobUrl(item);
                      const downloadUrl = await uploadFileToCloud(file);
                      if (downloadUrl) {
                        files.push(downloadUrl);
                      }
                    }

                    if (files.length < 1) {
                      return;
                    }
                    const data = {
                      ...values,
                      createdBy: user?.uid,
                      motorType: type,
                      images: files,
                      found: false,
                    };

                    mutate(data);
                    setSavingFiles(false);
                  })();
                }}
              >
                {(savingFiles || isLoading) && (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
                <Save className="h-5 w-5" />
              </Button>
            )}
          </div>
        )}

        {currentStep != 4 && (
          <ProgressBar progress={Math.round((currentStep / 3) * 100)} />
        )}
        <div className="">
          {currentStep === 1 && <MotorStep1 type={type} />}
          {currentStep === 2 && <MotorStep2 />}
          {currentStep === 3 && <MotorStep3 />}
          {currentStep === 4 && data && (
            <MotorSuccess
              data={{
                id: data?.id!,
                numUsersNotified: data?.numUsersNotified!,
                shareTitle: `${getValues().make} ${getValues().model}`,
                shareDescription: getValues().lastSeenDescription,
                type: type,
              }}
            />
          )}
          {/* Steps {currentStep} */}
        </div>
      </Card>
    </FormProvider>
  );
}
