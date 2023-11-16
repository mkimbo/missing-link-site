import Container from "@/components/ui/container";
import { ServerAuthProvider } from "@/auth/server-auth-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import SubscriptionsForm from "./SubscriptionsForm";
import { RadiusForm } from "./RadiusForm";
import { TRadius } from "@/types/common";
import { Metadata } from "next";
import { AllowNotificationsButton } from "./AllowNotifications";
import { getUser } from "../actions/actions";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your profile settings",
};

export default async function Profile() {
  const user = await getUser();
  const extractUsername = (email: string) => {
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      const name = email.slice(0, atIndex);
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return email;
  };

  return (
    <Container>
      <ServerAuthProvider>
        <div className="w-full lg:w-6/12 px-4 mx-auto">
          <Card className=" flex flex-col min-w-0 break-word w-full mb-6 rounded-lg mt-8">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <CardHeader className="w-full px-4 flex justify-center ">
                  <Avatar className="mx-auto w-20 h-20">
                    <AvatarImage
                      height={80}
                      width={80}
                      src={user?.photoUrl}
                      alt={extractUsername(user?.email!)}
                    />
                    <AvatarFallback>
                      {extractUsername(user?.email!).slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent className="w-full px-4">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold leading-normal  mb-2">
                      {extractUsername(user?.email!)}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2  font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg "></i>
                      Mombasa, Kenya
                    </div>
                  </div>
                  <div className="flex justify-center py-4 lg:pt-4 ">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-primary">
                        580
                      </span>
                      <span className="text-sm ">VP</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-primary">
                        58
                      </span>
                      <span className="text-sm ">RP</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-primary">
                        25
                      </span>
                      <span className="text-sm ">Alerts</span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
          <Card className="mb-6 rounded-lg">
            <CardHeader>
              <CardTitle>Alert Settings</CardTitle>
              <CardDescription>
                Manage your alert settings here.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {user?.enabledNotifications ? (
                <SubscriptionsForm
                  userId={user?.id!}
                  missingVehicleAlerts={user?.missingVehicleAlerts ?? false}
                  missingBikeAlerts={user?.missingBikeAlerts ?? false}
                />
              ) : (
                <AllowNotificationsButton />
              )}
            </CardContent>
          </Card>

          <Card className="mb-6 shadow-xl rounded-lg">
            <CardHeader>
              <CardTitle>Proximity Settings</CardTitle>
              <CardDescription>Manage location settings.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              {user?.enabledLocation ? (
                <RadiusForm
                  userId={user?.id!}
                  alertRadius={(user?.alertRadius.toString() as TRadius) ?? "3"}
                />
              ) : (
                <div className="flex items-center justify-between space-x-2">
                  <Label
                    htmlFor="necessary"
                    className="flex flex-col space-y-1"
                  >
                    <span>GeoLocation</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                      Your location is necessary for this application to work.
                    </span>
                  </Label>
                  <Switch id="necessary" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </ServerAuthProvider>
    </Container>
  );
}

// Generate customized metadata based on user cookies
// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
// export async function generateMetadata(): Promise<Metadata> {
//   const tokens = await getTenantFromCookies(cookies);

//   if (!tokens) {
//     return {};
//   }

//   return {
//     title: `${tokens.email} | next-firebase-auth-edge example`,
//   };
// }
