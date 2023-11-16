import React from "react";
import { useFormContext } from "react-hook-form";
import FormTextField from "@/components/form_inputs/form_text_field";
import FormSelect from "@/components/form_inputs/form_select_input";
import FormFileUpload from "@/components/form_inputs/form_file_upload";
import FormDisclaimerInput from "@/components/form_inputs/form_disclaimer_input";
type Props = {
  type: string;
};

function MotorStep1({ type }: Props) {
  const { control } = useFormContext();
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl my-3">
        {type === "vehicle" ? "Vehicle Details" : "Bike Details"}
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <FormTextField
          name="make"
          label="Make"
          placeholder="eg. BMW"
          control={control}
        />
        <FormTextField
          name="model"
          label="Model"
          placeholder="eg. X5"
          control={control}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <FormTextField
          name="year"
          label="Year"
          placeholder="eg. 2015"
          control={control}
        />
        <FormTextField
          name="color"
          label="Color"
          placeholder="eg. White"
          control={control}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <FormTextField
          name="licencePlate"
          placeholder="eg. KCA 123A"
          label="Licence Plate"
          control={control}
        />
        <FormTextField
          name="secondaryContact"
          placeholder="Phone number/email"
          label="Contact Info"
          control={control}
        />
      </div>

      <FormFileUpload label="Recent Photo" name="images" />
      <FormDisclaimerInput
        control={control}
        name="PIDisclaimer"
        label="I agree that the above information can be shared by Missing Link (ML)
            on various platforms, including social media, for the purpose of
            locating my property."
      />
    </div>
  );
}

export default MotorStep1;
