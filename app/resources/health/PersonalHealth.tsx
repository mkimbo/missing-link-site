import React from "react";
import TextInformation from "../TextInformation";

type Props = {};

export default function PersonalHealth({}: Props) {
  return (
    <TextInformation
      title="Personal Wellness"
      description="Prioritize your health and well-being by making small, sustainable
    changes towards a healthier lifestyle."
    >
      <div className="w-full lg:w-2/3">
        <div className="text-sm text-muted-foreground my-2">
          <strong className="text-primary-foreground">
            Eat a Balanced Diet:{" "}
          </strong>
          Include a variety of fruits, vegetables, whole grains, lean proteins,
          and healthy fats in your meals. Aim for portion control and
          moderation.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <strong className="text-primary-foreground">Stay Hydrated: </strong>
          Drink an adequate amount of water throughout the day to support your
          body&#39;s functions and maintain good overall health.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <strong className="text-primary-foreground">
            Exercise Regularly:{" "}
          </strong>
          Incorporate physical activity into your daily routine. Find activities
          you enjoy, such as walking, jogging, swimming, cycling, or dancing.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <strong className="text-primary-foreground">
            Practice Stress Management:{" "}
          </strong>
          Find healthy ways to manage stress, such as practicing mindfulness,
          deep breathing exercises, yoga, or engaging in hobbies that bring you
          joy.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <strong className="text-primary-foreground">
            Get Sufficient Sleep:{" "}
          </strong>
          Prioritize getting enough sleep to allow your body to rest and
          rejuvenate. Aim for 7-8 hours of quality sleep each night.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <strong className="text-primary-foreground">
            Practice Good Hygiene:{" "}
          </strong>
          Maintain good personal hygiene habits, including regular handwashing,
          dental care, and skincare.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <strong className="text-primary-foreground">
            Limit Processed Foods and Sugary Drinks:{" "}
          </strong>
          Reduce your consumption of processed foods, sugary snacks, and sugary
          drinks. Opt for healthier alternatives.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <strong className="text-primary-foreground">
            Practice Safe Sun Exposure:{" "}
          </strong>
          Protect your skin from harmful UV rays by wearing sunscreen,
          protective clothing, and seeking shade during peak sun hours.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <strong className="text-primary-foreground">
            Take Breaks from Screen Time:{" "}
          </strong>
          Limit excessive screen time and take regular breaks to reduce eye
          strain and promote overall well-being. Engage in other activities such
          as reading, hobbies, or spending time outdoors.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <strong className="text-primary-foreground">Stay Connected: </strong>
          Foster social connections with friends, family, and the community.
          Engage in meaningful conversations, maintain relationships, and seek
          support when needed.
        </div>
      </div>
    </TextInformation>
  );
}
