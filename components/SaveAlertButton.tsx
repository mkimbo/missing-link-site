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
    defaultValue: "3",
  });
  const mobileNo = useWatch({
    control,
    name: "paymentMobileNo",
  });

  const isDisabled = () => {
    if (radius == "3") {
      return false;
    } else if (!mobileNo || safaricomPhoneNumberRegex.test(mobileNo) == false) {
      return true;
    }
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
