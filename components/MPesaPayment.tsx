import { useFormContext } from "react-hook-form";
import { useWatch } from "react-hook-form";
import FormTextField from "./form_inputs/form_text_field";
type Props = {};

function MPesaPayment({}: Props) {
  const { control } = useFormContext();
  const radius = useWatch({
    control,
    name: "alertRadius",
    defaultValue: "3",
  });

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
      {radius != "3" ? (
        <div className="flex flex-col gap-1">
          <div className=" text-primary">Paid Alert</div>
          <div className="text-sm text-muted-foreground">
            {`A payment request for Ksh. ${getAmountToPay()} will be sent to the mobile number
            below.`}
          </div>
          <FormTextField
            name="paymentMobileNo"
            placeholder="Phone number"
            label="Mpesa Number"
            control={control}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default MPesaPayment;
