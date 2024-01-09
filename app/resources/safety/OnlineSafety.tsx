import React from "react";
import TextInformation from "../TextInformation";

export default function OnlineSafety() {
  return (
    <TextInformation
      title="Online Safety"
      description=" Online safety is an ongoing effort, and staying informed about
            emerging threats and best practices is crucial. Here are some tips to protect yourself while browsing the internet."
    >
      <div className="w-full">
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Protect Personal Information:{" "}
          </span>
          Avoid sharing sensitive information like full name, address, phone
          number, or financial details online, especially on public platforms.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Use Strong and Unique Passwords:{" "}
          </span>
          Create strong and unique passwords for all your online accounts and
          avoid using the same password across multiple platforms.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Be Cautious of Suspicious Links and Downloads:{" "}
          </span>
          Avoid clicking on unknown or suspicious links, and refrain from
          downloading files from untrusted sources to prevent malware or
          phishing attacks.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Enable Two-Factor Authentication (2FA):{" "}
          </span>
          Activate 2FA whenever possible to add an extra layer of security to
          your online accounts.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Practice Safe Social Media Usage:{" "}
          </span>
          Adjust privacy settings on social media platforms to control who can
          see your posts and personal information. Be selective about accepting
          friend requests or connections from unknown individuals.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Report and Block Cyberbullies:{" "}
          </span>
          If you encounter online bullying or harassment, report the abusive
          behavior to the platform administrators and consider blocking the
          person involved. Don&#39;t engage or retaliate, as it can escalate the
          situation.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Be Mindful of Online Friends:{" "}
          </span>
          Exercise caution when interacting with strangers online. Be skeptical
          of individuals who quickly try to establish deep personal connections
          or request personal information.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Educate Yourself on Social Engineering:{" "}
          </span>
          Learn about common online scams, such as phishing emails, fake
          websites, or requests for money. Be skeptical of unsolicited requests
          for personal or financial information.
        </div>
        <div className="text-sm text-muted-foreground my-2">
          <span className="text-primary font-bold">
            Foster a Positive Online Environment:{" "}
          </span>
          Promote kindness and respect in your online interactions. Stand
          against cyberbullying, and support others who may be targeted. Spread
          positivity and use social media to uplift and inspire others.
        </div>
      </div>
    </TextInformation>
  );
}
