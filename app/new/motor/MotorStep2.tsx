import React from "react";
import { useFormContext } from "react-hook-form";
import { FormDatePicker } from "@/components/form_inputs/form_date_picker";
import FormLocationInput from "@/components/form_inputs/form_location_input";
import FormTextArea from "@/components/form_inputs/form_text_area";
import FormAutoCompleteSelect from "@/components/form_inputs/form_autocomplete_input";
import policeInfo from "../../../public/pStations.json";
import FormTextField from "@/components/form_inputs/form_text_field";
import { useUser } from "@/context/UserContext";
function MotorStep2() {
  const { control } = useFormContext();
  const { user } = useUser();
  const stations = Array.from(policeInfo)
    .filter((item) => item.label.includes("Police Station"))
    .map((item) => {
      return {
        label: item.label,
        value: `${item.value}`,
      };
    });
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl my-3">Last Seen Details</div>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-6/12">
          <FormDatePicker
            name="lastSeenDate"
            label="Last Seen Date"
            control={control}
          />{" "}
        </div>
        <div className="w-full md:w-6/12">
          <FormLocationInput
            name="lastSeenLocation"
            country={user?.country.toLowerCase() ?? "ke"}
            control={control}
            label="Last Seen Location"
          />
        </div>
      </div>
      <div className="my-1">
        <FormTextArea
          label="Last seen description:"
          name="lastSeenDescription"
          control={control}
          placeholder="Describe the circumstances of the last time the person was seen."
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2 ">
        <FormAutoCompleteSelect
          name="policeStation"
          label="Police Station"
          placeholder="Police Station where the case was reported"
          options={stations}
          control={control}
        />
        <FormTextField
          name="obNumber"
          placeholder="Occurence Book No."
          label="Occurence Book No."
          control={control}
        />
      </div>
    </div>
  );
}

export default MotorStep2;
