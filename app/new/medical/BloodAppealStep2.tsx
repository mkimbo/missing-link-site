import React from "react";
import { useFormContext } from "react-hook-form";

import FormSelect from "@/components/form_inputs/form_select_input";

function BloodAppealStep2() {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl my-3">Personal Info Again</div>
      <div className="flex flex-col md:flex-row gap-2">
        <FormSelect
          label="Alert Radius"
          name="alertRadius"
          control={control}
          options={[
            { value: "3", label: "3 Km" },
            { value: "5", label: "5 Km (Pro)" },
            { value: "10", label: "10 Km (Pro)" },
            { value: "50", label: "50 Km (Pro)" },
          ]}
        />
      </div>
    </div>
  );
}

export default BloodAppealStep2;
