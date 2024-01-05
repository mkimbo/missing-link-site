import React from "react";
import { useFormContext } from "react-hook-form";
import FormTextField from "@/components/form_inputs/form_text_field";
import FormSelect from "@/components/form_inputs/form_select_input";
import FormDisclaimerInput from "@/components/form_inputs/form_disclaimer_input";
import FormLocationInput from "@/components/form_inputs/form_location_input";
import FormTextArea from "@/components/form_inputs/form_text_area";
import { useUser } from "@/context/UserContext";
type Props = {};

function BloodAppealStep1({}: Props) {
  const { control } = useFormContext();
  const { user } = useUser();
  console.log(user, "user");
  return (
    <div className="flex flex-col gap-x-2 gap-y-3">
      <div className="text-xl my-3">Patient & Hospital details</div>
      <div className="flex flex-col md:flex-row gap-2">
        <FormTextField name="fullname" label="Fullname" control={control} />
        <FormTextField
          name="secondaryContact"
          placeholder="Phone number/email"
          label="Contact Info"
          control={control}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <FormTextField
          name="hospitalName"
          label="Hospital Name"
          control={control}
        />
        <div className="w-full md:w-6/12 mt-[11px]">
          <FormLocationInput
            name="hospitalLocation"
            country={user?.country.toLowerCase() ?? "ke"}
            control={control}
            label="Hospital Location"
            placeholder="or nearest landmark"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <FormSelect
          label="Blood Group"
          name="bloodGroup"
          control={control}
          options={[
            { value: "A+", label: "A+" },
            { value: "A-", label: "A-" },
            { value: "B+", label: "B+" },
            { value: "B-", label: "B-" },
            { value: "AB+", label: "AB+" },
            { value: "AB-", label: "AB-" },
            { value: "O+", label: "O+" },
            { value: "O-", label: "O-" },
          ]}
        />
        <FormTextField
          name="bUnits"
          label="Units of blood needed"
          control={control}
          type="number"
        />
      </div>
      <div className="my-2">
        <FormTextArea
          label="Last seen description:"
          name="requestDescription"
          control={control}
          placeholder="Any other information you think might be useful to potential donors?"
        />
      </div>
      <FormDisclaimerInput
        control={control}
        name="PIDisclaimer"
        label="I agree that the above information can be shared by Missing Link (ML)
            on various platforms, including social media, for the purpose of this urgent blood appeal."
      />
    </div>
  );
}

export default BloodAppealStep1;
