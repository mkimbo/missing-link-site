import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import FormSelect from "@/components/form_inputs/form_select_input";
import MPesaPayment from "@/components/MPesaPayment";
import { TAlertType } from "@/types/missing_person.model";

function BloodAppealStep2({
  caseLocation,
  bloodGroupFilter,
}: {
  caseLocation: number[];
  bloodGroupFilter: string;
}) {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl my-3 text-primary">Alert Preferences</div>
      <div className="flex flex-col md:flex-row gap-2">
        <FormSelect
          label="Alert Radius"
          name="alertRadius"
          control={control}
          options={[
            { value: "3", label: "3 Km" },
            { value: "5", label: "5 Km (Pro)" },
            { value: "10", label: "10 Km (Pro)" },
            { value: "20", label: "20 Km (Pro)" },
          ]}
        />
      </div>
      <MPesaPayment
        caseLocation={caseLocation}
        notificationType="bloodAppeal"
        bloodGroupFilter={bloodGroupFilter}
      />
    </div>
  );
}

export default BloodAppealStep2;
