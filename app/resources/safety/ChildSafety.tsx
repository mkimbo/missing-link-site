import React from "react";
import TextInformation from "../TextInformation";

export default function ChildSafety() {
  return (
    <TextInformation
      title="Child Safety"
      description="  It&#39;s important to educate children about potential risks,
            establish clear guidelines, and maintain open lines of
            communication."
    >
      <div className="w-full lg:w-2/3">
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Supervision: </span>
          Always supervise young children and be actively involved in their
          activities, both online and offline.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Stranger Danger: </span>
          Teach children about the concept of strangers and establish clear
          guidelines on interacting with unknown individuals.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Personal Boundaries: </span>
          Teach children about personal boundaries and the importance of saying
          &#34;No&#34; when someone makes them uncomfortable.
        </div>

        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Safe Routes: </span>
          Teach children safe routes to school, parks, and other frequented
          places. Practice these routes together to ensure they are familiar
          with them.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Emergency Contacts: </span>
          Ensure children know their full name, address, and emergency contact
          numbers. Teach them when and how to use these numbers in case of an
          emergency.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Safety at Home: </span>
          Teach children about potential hazards at home, such as sharp objects,
          chemicals, and electrical outlets. Establish safety rules and
          precautions.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Stranger Safety: </span>
          Teach children about the importance of staying away from strangers,
          both in public places and online. Teach them to seek help from a
          trusted adult if approached by a stranger.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Water Safety: </span>
          Teach children about water safety rules, such as swimming only in
          designated areas, wearing life jackets when boating, and never
          swimming alone.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Open Communication: </span>
          Foster open communication with children, encouraging them to share any
          concerns or uncomfortable experiences. Teach them to trust their
          instincts and seek help when needed.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Set Clear Boundaries: </span>
          Establish rules and guidelines for internet usage, including time
          limits and appropriate content.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Educate About Online Dangers:{" "}
          </span>
          Teach your child about potential risks such as cyberbullying, online
          predators, and scams.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Use Parental Controls:{" "}
          </span>
          Enable parental control features on devices and internet browsers to
          filter and restrict access to inappropriate content.
        </div>
      </div>
    </TextInformation>
  );
}
