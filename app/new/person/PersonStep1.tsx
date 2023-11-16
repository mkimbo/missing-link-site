import React from "react";
import { useFormContext } from "react-hook-form";
import FormTextField from "@/components/form_inputs/form_text_field";
import FormSelect from "@/components/form_inputs/form_select_input";
import FormFileUpload from "@/components/form_inputs/form_file_upload";
import FormDisclaimerInput from "@/components/form_inputs/form_disclaimer_input";
type Props = {};

function PersonStep1({}: Props) {
  const { control } = useFormContext();
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl my-3">Personal Info</div>
      <div className="flex flex-col md:flex-row gap-2">
        <FormTextField name="fullname" label="Fullname" control={control} />
        <FormTextField name="othername" label="Othername" control={control} />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <FormTextField name="age" label="Age" type="number" control={control} />
        <FormSelect
          label="Gender"
          name="gender"
          control={control}
          options={[
            { value: "F", label: "Female" },
            { value: "M", label: "Male" },
            { value: "O", label: "Other" },
          ]}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <FormSelect
          label="Complexion"
          name="complexion"
          control={control}
          options={[
            { value: "dark", label: "Dark" },
            { value: "light", label: "Light" },
          ]}
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
            locating my loved one."
      />
    </div>
  );
}

export default PersonStep1;
