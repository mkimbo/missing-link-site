import React from "react";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { safaricomPhoneNumberRegex } from "@/lib/constants";
type Props = {
  loading: boolean;
  onClick: () => void;
};

function SaveAlertButton({ loading, onClick }: Props) {
  const { control } = useFormContext();
  const radius = useWatch({
    control,
    name: "alertRadius",
  });

  const reach = useWatch({
    control,
    name: "alertReach",
    defaultValue: 0,
  });
  const mobileNo = useWatch({
    control,
    name: "paymentMobileNo",
  });

  const isDisabled = () => {
    if (radius && (radius == "3" || reach == 0)) {
      return false;
    } else if (
      radius &&
      radius != "3" &&
      (!mobileNo || safaricomPhoneNumberRegex.test(mobileNo) == false)
    ) {
      return true;
    }
    return false;
  };
  return (
    <Button
      variant="default"
      disabled={loading || isDisabled()}
      onClick={onClick}
    >
      {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? "Processing" : radius == "3" ? "Submit" : "Confirm"}
    </Button>
  );
}

export default SaveAlertButton;
