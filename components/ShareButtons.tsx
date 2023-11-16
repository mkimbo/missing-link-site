"use client";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";

type SocialShareProps = {
  url: string;
  title: string;
  description: string;
  hashtag?: string;
};

export default function ShareButtons({
  url,
  title,
  description,
  hashtag,
}: SocialShareProps) {
  return (
    <div className="flex flex-col gap-2 text-center">
      <span className="text-sm">
        Amplify this alerts impact by spreading the word on social media.
      </span>
      <div className="flex flex-row items-center justify-center  gap-x-2">
        <FacebookShareButton url={url} quote={description} hashtag={hashtag}>
          <FacebookIcon size={32} />
        </FacebookShareButton>
        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon size={32} />
        </WhatsappShareButton>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={32} />
        </TwitterShareButton>
      </div>
    </div>
  );
}
