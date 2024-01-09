import React from "react";
import TextInformation from "../TextInformation";

export default function FirstAid() {
  return (
    <TextInformation
      title="First Aid"
      description="While first aid can be crucial in many situations, it is not a substitute for professional medical care. Always seek medical help when needed."
    >
      <div className="w-full">
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Stay Informed: </span>
          Regularly update your first aid knowledge. Attend first aid training
          courses to learn new techniques and refresh existing skills.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Keep a First Aid Kit: </span>
          Have a well-stocked first aid kit readily available. Regularly check
          and replenish supplies.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Stay Calm: </span>
          In any emergency, staying calm is crucial. It helps you think clearly
          and provide assistance more effectively.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Assess the Situation: </span>
          Before providing first aid, assess the safety of the environment.
          Ensure there are no ongoing risks to yourself or others.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Call for Help: </span>
          In serious situations, always call for professional help (emergency
          services) before administering first aid. Provide clear and concise
          information.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">ABCs of First Aid: </span>
          Assess the Airway, Breathing, and Circulation. Ensure the airway is
          clear, check for breathing, and assess circulation. Provide CPR if
          necessary.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Protect Yourself: </span>
          Use personal protective equipment (PPE) if available, especially when
          dealing with bodily fluids or potential contaminants.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Reassure and Comfort: </span>
          Offer reassurance and comfort to the injured or ill person. Keep them
          calm and encourage them to remain still.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Positioning: </span>
          Place the person in a comfortable position. For someone feeling faint,
          lying down with legs elevated can help. For someone having difficulty
          breathing, help them find a comfortable breathing position.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Maintain Body Temperature:{" "}
          </span>
          In extreme weather conditions, ensure the person stays warm or cool,
          depending on the situation. Use blankets or shade as needed.
        </div>
      </div>
    </TextInformation>
  );
}
