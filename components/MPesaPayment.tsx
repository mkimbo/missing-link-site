import { useFormContext } from "react-hook-form";
import { useWatch } from "react-hook-form";
import FormTextField from "./form_inputs/form_text_field";
import { HoverableText } from "./HoverableText";
import { useEffect, useState } from "react";
import { getPossibleReachWithinRadiusOfCase } from "@/app/actions/actions";
import { TAlertType } from "@/types/missing_person.model";
type Props = {
  caseLocation: number[];
  notificationType: TAlertType;
  bloodGroupFilter?: string;
};

function MPesaPayment({
  caseLocation,
  notificationType,
  bloodGroupFilter,
}: Props) {
  const { control, setValue } = useFormContext();
  const [reach, setReach] = useState(0);
  const [loading, setLoading] = useState(false);
  const radius = useWatch({
    control,
    name: "alertRadius",
  });
  const getReach = async () => {
    setLoading(true);
    const res = await getPossibleReachWithinRadiusOfCase({
      radiusInM: radius * 1000,
      caseLocation,
      type: notificationType,
      bloodGroup: bloodGroupFilter,
    });
    setLoading(false);
    setReach(res);
    setValue("alertReach", res);
  };
  useEffect(() => {
    if (radius && radius != "3") {
      getReach();
    }
  }, [radius]);

  const getAmountToPay = () => {
    switch (radius) {
      case "5":
        return "50";
      case "10":
        return "100";
      case "20":
        return "200";
      default:
        return "50";
    }
  };

  return (
    <>
      {radius && radius != "3" ? (
        <div className="flex flex-col gap-1">
          <div className="text-primary">
            Paid Alert{" "}
            <span className="text-sm text-muted-foreground">
              <HoverableText
                title={loading ? "Calculating reach..." : `(${reach} devices)`}
                content={`There are ${reach} devices within the chosen radius that may receive this alert.`}
              />
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {reach > 0 && !loading
              ? `A payment request for Ksh. ${getAmountToPay()} will be sent to the mobile number
            below.`
              : !loading &&
                "The reach is zero, no payment will be required. Share this platform with your friends & family to make it more effective for you and your community."}
          </div>
          {reach > 0 && !loading && (
            <FormTextField
              name="paymentMobileNo"
              placeholder="Phone number"
              label="Mpesa Number"
              control={control}
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default MPesaPayment;
