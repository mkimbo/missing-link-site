import React from "react";
import TextInformation from "../TextInformation";

export default function PersonalSafety() {
  return (
    <TextInformation
      title="Personal Safety"
      description="Personal safety is a priority, and being observant and alert can help you identify potential dangers and take necessary precautions to protect yourself."
    >
      <div className="w-full lg:w-2/3">
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Trust Your Instincts: </span>
          Pay attention to your gut feelings and intuition. If something feels
          off or unsafe, trust yourself and take necessary precautions.
        </div>

        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Be Aware of Your Surroundings:{" "}
          </span>
          Stay alert and observant of your environment at all times. Take note
          of exits, emergency resources, and potential hazards in public places.
        </div>

        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Avoid Isolated Areas: </span>
          Stick to well-lit and populated areas, especially at night. Avoid
          shortcuts through dark or secluded places that may pose a safety risk.
        </div>

        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Walk Confidently: </span>
          Project confidence in your body language while walking. Keep your head
          up, maintain a brisk pace, and avoid appearing vulnerable or
          distracted.
        </div>

        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Limit Distractions: </span>
          Minimize distractions like excessive phone use or wearing headphones
          that can make you less aware of your surroundings and potential risks.
        </div>

        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Trustworthy Companions:{" "}
          </span>
          When possible, walk with a friend or in a group, especially in
          unfamiliar or potentially unsafe areas. There is safety in numbers.
        </div>

        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Use Well-Traveled Routes:{" "}
          </span>
          Stick to commonly used paths and routes that are known to be safe.
          Avoid taking unfamiliar shortcuts or venturing into uncharted areas
          alone.
        </div>

        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Stay Connected: </span>
          Keep your phone charged and easily accessible. Inform a trusted person
          about your whereabouts or travel plans, especially if you&apos;re in
          an unfamiliar location.
        </div>

        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Recognize Suspicious Activities:{" "}
          </span>
          Stay vigilant and observe people and activities around you. Trust your
          instincts if something or someone seems out of place or behaving
          suspiciously.
        </div>

        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Report Suspicious Behavior:{" "}
          </span>
          If you witness or suspect any suspicious activity, report it to the
          appropriate authorities or notify a nearby security personnel or law
          enforcement.
        </div>
      </div>
    </TextInformation>
  );
}
