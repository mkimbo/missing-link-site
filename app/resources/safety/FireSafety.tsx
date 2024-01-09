import React from "react";
import TextInformation from "../TextInformation";

export default function FireSafety() {
  return (
    <TextInformation
      title="Fire Safety"
      description="Fire safety is crucial for protecting lives and property."
    >
      <div className="w-full">
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Install Smoke Alarms: </span>
          Install smoke alarms on every level of your home, including inside
          each bedroom and outside sleeping areas. Test them monthly and replace
          batteries as needed.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Create an Escape Plan:{" "}
          </span>
          Develop a fire escape plan that includes multiple exit routes from
          each room. Practice the plan regularly with all household members.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Keep Exits Clear: </span>
          Ensure all exits are clear of obstacles and easy to access in case of
          a fire. Do not block doors, windows, or stairways with furniture or
          clutter.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Learn Fire Extinguisher Use:{" "}
          </span>
          Familiarize yourself with the proper use of fire extinguishers. Keep
          one in an easily accessible location and know how to operate it
          effectively.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Check Electrical Cords:{" "}
          </span>
          Regularly inspect electrical cords for damage or fraying. Replace any
          cords that are worn out or damaged to reduce the risk of electrical
          fires.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Use Candles Safely: </span>
          Place candles in sturdy holders on a stable surface and away from
          flammable materials. Never leave candles unattended and extinguish
          them before leaving the room.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Cooking Safety: </span>
          Never leave cooking unattended, especially when using high heat. Keep
          flammable items away from the stove and use a timer as a reminder.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Practice Caution with Heaters:{" "}
          </span>
          Maintain a safe distance between portable heaters and flammable
          objects. Turn off heaters when leaving the room or going to sleep.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Store Flammable Materials Properly:{" "}
          </span>
          Store flammable liquids, such as gasoline and paint, in approved
          containers away from heat sources. Follow all safety guidelines for
          their storage.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Educate Family Members:{" "}
          </span>
          Teach family members, especially children, about fire safety. Teach
          them how to respond in case of a fire and the importance of not
          playing with matches or lighters.
        </div>
      </div>
    </TextInformation>
  );
}
