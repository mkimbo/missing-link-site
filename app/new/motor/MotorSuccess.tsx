import ShareButtons from "@/components/ShareButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

type Props = {
  data: {
    id: string;
    numUsersNotified: number;
    shareTitle: string;
    shareDescription: string;
    type: string;
  };
};

function MotorSuccess({ data }: Props) {
  const router = useRouter();
  const { id, numUsersNotified, shareDescription, shareTitle, type } = data;
  const url = `/missing/${type === "vehicle" ? "vehicles" : "bikes"}/${id}`;
  return (
    <Card className="w-[350px]">
      <CardHeader className="text-center">
        <CardTitle>Success</CardTitle>
        <CardDescription>Report was recorded successfully</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          {numUsersNotified > 0 ? (
            <div className="text-center">
              <div className="text-3xl font-bold">{numUsersNotified}</div>
              <div className="text-sm">Users notified</div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-base">
                Unfortunately there are no nearby users to send the alert to.
                You can still share this alert on different social media
                platforms below.
              </div>
            </div>
          )}
          <ShareButtons
            url={`${process.env.NEXT_PUBLIC_URL!}/${url}`}
            title={shareTitle}
            description={shareDescription}
          />
        </div>
      </CardContent>
      <CardFooter className="flex">
        <Button className="w-full" onClick={() => router.push(url)}>
          View Report
        </Button>
      </CardFooter>
    </Card>
  );
}

export default MotorSuccess;
