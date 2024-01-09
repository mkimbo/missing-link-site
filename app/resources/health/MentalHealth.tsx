import React from "react";
import TextInformation from "../TextInformation";

export default function MentalHealth() {
  return (
    <TextInformation
      title="Mental Health"
      description="Everyone&#39;s mental health journey is unique, find strategies and
      techniques that work best for you. Seek proffesional help if you
      need it."
    >
      <div className="w-full">
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Practice Self-Care: </span>
          Take time for yourself and engage in activities that bring you joy,
          relaxation, and rejuvenation. This can include hobbies, exercise,
          reading, or simply spending time in nature.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Prioritize Sleep: </span>
          Establish a consistent sleep routine and aim for 7-8 hours of quality
          sleep each night. Good sleep is essential for mental and emotional
          well-being.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Connect with Others: </span>
          Maintain healthy social connections with friends, family, and
          supportive individuals. Cultivate meaningful relationships and engage
          in regular social interactions.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Manage Stress: </span>
          Learn effective stress management techniques such as deep breathing
          exercises, meditation, mindfulness, or engaging in activities that
          help you unwind and de-stress.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Set Realistic Goals: </span>
          Break down your goals into achievable steps, celebrate small
          successes, and avoid overwhelming yourself with unrealistic
          expectations. This helps foster a sense of accomplishment and boosts
          self-esteem.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Seek Support: </span>
          Reach out to trusted individuals or professionals when you are feeling
          overwhelmed or need support. Its okay to ask for help and seek
          guidance when needed.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Practice Mindfulness: </span>
          Stay present in the moment and engage in mindfulness practices, such
          as focusing on your breath or observing your thoughts and emotions
          without judgment.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Limit Media Consumption:{" "}
          </span>
          Take breaks from news or social media to protect your mental
          well-being. Set boundaries around media consumption and prioritize
          activities that promote positivity.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Engage in Physical Activity:{" "}
          </span>
          Regular exercise has numerous mental health benefits. Find activities
          you enjoy, whether its walking, yoga, dancing, or any form of movement
          that gets your body moving.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">Practice Gratitude: </span>
          Cultivate a gratitude practice by focusing on things you are grateful
          for each day. This simple exercise can shift your mindset towards
          positivity and increase overall well-being.
        </div>
      </div>
    </TextInformation>
  );
}
