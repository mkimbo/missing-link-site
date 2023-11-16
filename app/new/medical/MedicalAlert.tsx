"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { useZact } from "zact/client";
import { bloodAppealSchema } from "@/types/zod_schemas";
import { useAuth } from "@/auth/context";
import { saveBloodAppealAlert } from "@/app/actions/actions";
import { ChevronLeft, ChevronRight, Loader, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BloodAppealStep2 from "./BloodAppealStep2";
import ProgressBar from "@/components/ProgressBar";
import BloodAppealStep1 from "./BloodRequestStep1";
import BloodAppealSuccess from "./BloodRequestSuccess";

export type TFormSchema = z.infer<typeof bloodAppealSchema>;
export function MedicalAlert() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm<TFormSchema>({
    resolver: zodResolver(bloodAppealSchema),
    reValidateMode: "onChange",
    defaultValues: {
      PIDisclaimer: false,
    },
  });

  const { handleSubmit, formState, trigger, getValues, reset } = methods;
  const { mutate, data, isLoading } = useZact(saveBloodAppealAlert);

  useEffect(() => {
    if (data?.success) {
      setCurrentStep(3);
    }
  }, [data, router, reset]);

  if (!user?.email) {
    return null;
  }

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
              <Button
                variant="default"
                disabled={isLoading}
                onClick={async () => {
                  handleSubmit(async (values) => {
                    const data = {
                      ...values,
                      createdBy: user?.uid,
                    };

                    mutate(data);
                  })();
                }}
              >
                {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                Save
                <Save className="h-5 w-5" />
              </Button>
            )}
          </div>
        )}
        {currentStep != 3 && (
          <ProgressBar progress={Math.round((currentStep / 2) * 100)} />
        )}
        <div className="">
          {currentStep === 1 && <BloodAppealStep1 />}
          {currentStep === 2 && <BloodAppealStep2 />}
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
