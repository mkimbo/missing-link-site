import {
  ServerAuthProvider,
  getTenantFromCookies,
} from "@/auth/server-auth-provider";
import Container from "@/components/ui/container";
import { serverDB } from "@/lib/firebase";
import { TBloodAppeal } from "@/types/missing_person.model";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import APos from "../../../public/img/bloodA_pos.png";
import BPos from "../../../public/img/bloodB_pos.png";
import ABPos from "../../../public/img/bloodAB_pos.png";
import OPos from "../../../public/img/bloodO_pos.png";
import ANeg from "../../../public/img/bloodA_neg.png";
import BNeg from "../../../public/img/bloodB_neg.png";
import ABNeg from "../../../public/img/bloodAB_neg.png";
import ONeg from "../../../public/img/bloodO_neg.png";
import ShareButtons from "@/components/ShareButtons";
import { BloodDonationRequest } from "@/components/BloodDonationRequest";
import { getUser } from "@/app/actions/actions";
type Props = {
  params: { id: string };
};

function getBloodGroupImage(bloodGroup: string) {
  switch (bloodGroup) {
    case "A+":
      return APos;
    case "B+":
      return BPos;
    case "AB+":
      return ABPos;
    case "O+":
      return OPos;
    case "A-":
      return ANeg;
    case "B-":
      return BNeg;
    case "AB-":
      return ABNeg;
    case "O-":
      return ONeg;
    default:
      return APos;
  }
}

async function getBloodAppealById(
  appealId: string
): Promise<TBloodAppeal | null> {
  const bloodAppeal = await serverDB
    .collection(process.env.FIREBASE_FIRESTORE_BLOOD_APPEALS!)
    .doc(appealId)
    .get();
  if (!bloodAppeal.exists) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("No Appeal found with that id");
  }
  return bloodAppeal.data() as TBloodAppeal;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  if (!params.id) {
    throw new Error("No appealId provided");
  }

  const data = await getBloodAppealById(params.id);
  if (!data) {
    throw new Error("No appeal found with that id");
  }

  const { fullname, requestDescription, bloodGroup, hospitalName } = data;
  const ogImage = " images[0]";

  return {
    title:
      fullname + " urgently needs " + bloodGroup + " blood at " + hospitalName,
    description: requestDescription,
    // metadataBase: new URL("${process.env.NEXT_PUBLIC_URL!}"),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL!}/blood-appeal/${params.id}`,
    },
    openGraph: {
      title:
        fullname +
        " urgently needs " +
        bloodGroup +
        " blood at " +
        hospitalName,
      description: requestDescription,
      type: "article",
      url: `${process.env.NEXT_PUBLIC_URL!}/blood-appeal/${params.id}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        fullname +
        " urgently needs " +
        bloodGroup +
        " blood at " +
        hospitalName,
      description: requestDescription,
      images: [ogImage],
    },
    // robots: {
    //   index: true,
    //   follow: true,
    //   googleBot: {
    //     index: true,
    //     follow: true,
    //     "max-video-preview": -1,
    //     "max-image-preview": "large",
    //     "max-snippet": -1,
    //   },
    // },
    verification: {
      google: "VaD1qjKK95G1B1wsA3ZydoAdSg2r3aCm6D7ZJw2bw",
    },
  } as Metadata;
}

export default async function BloodAppeal({ params }: Props) {
  if (!params.id) {
    throw new Error("No appealId provided");
  }

  const data = await getBloodAppealById(params.id);
  const loggedInUser = await getUser();

  return (
    <Container>
      <ServerAuthProvider>
        <div className="w-full lg:w-6/12 px-4 mx-auto items-center justify-center">
          <div
            className={`flex items-center justify-center mt-4 md:mt-8  h-16  w-full bg-primary`}
            //    ${
            //     data?.found ? "bg-secondary" : "bg-primary"
            //   }`}
          >
            <span className="text-xl">Urgent Blood Appeal</span>
          </div>
          <div className="grid grid-cols-2 gap-2 my-6">
            <Image
              className="rounded-lg w-[200px] h-[200px] lg:w-[300px] lg:h-[300px]"
              src={getBloodGroupImage(data?.bloodGroup!)}
              alt={`${data?.bloodGroup}`}
              width={500}
              height={500}
              placeholder="empty"
            />
            <div className="flex flex-col text-xs md:text-base">
              <span className="font-bold text-primary text-base md:text-lg">
                {data?.fullname}
              </span>
              <span>
                Blood Group:{" "}
                <span className="text-primary">{data?.bloodGroup}</span>
              </span>
              <span>
                Units: <span className="text-primary">{data?.bUnits}</span>
              </span>
              <span>
                Hospital:{" "}
                <span className="text-primary">{data?.hospitalName}</span>
              </span>

              {/* <span className="text-primary mt-2 md:mt-4">Location</span> */}
              <span>{data?.formattedAddress ?? data?.hospitalLocation}</span>
              {/* <span>
                  {data?.county ? data?.county : data?.formattedAddress}
                </span> */}
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardDescription className="text-center text-base text-foreground">
                {data?.requestDescription}
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center">
              <BloodDonationRequest
                appealId={params.id}
                creatorId={data?.createdBy!}
                donorContact={loggedInUser?.phoneNumber?.number}
              />
              <ShareButtons
                url={`${process.env.NEXT_PUBLIC_URL!}/blood-appeal/${
                  params.id
                }`}
                title={`${data?.fullname} + " urgently needs " + ${data?.bloodGroup} + " blood at " + ${data?.hospitalName}`}
                description={
                  data?.requestDescription ??
                  `${data?.fullname} + " urgently needs " + ${data?.bloodGroup} + " blood at " + ${data?.hospitalName}`
                }
              />
            </CardContent>

            <CardFooter className="flex flex-col">
              {/* {tenant?.uid === data?.createdBy && (
                  <MarkAsFoundButton
                    type="bike"
                    found={data?.found}
                    itemId={params.id!}
                  />
                )} */}
            </CardFooter>
          </Card>
          {/* {tenant?.uid === data?.createdBy && !data?.found && (
              <Card className="my-6">
                <CardHeader className="pb-3">
                  <CardTitle>Recent sightings</CardTitle>
                  <CardDescription>
                    If someone reports sighting your loved one, you will receive a
                    notification and from here you can see where and when.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-1">
                  {data?.sightings?.map((sighting) => (
                    <div
                      key={sighting.sightingDate}
                      className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground"
                    >
                      <CalendarDays className="mt-px h-5 w-5" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {" "}
                          {format(new Date(sighting.sightingDate), "do MMM yyyy")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {`${sighting.sightingLocation}, ${sighting.longAddress}`}
                        </p>
                      </div>
                    </div>
                  ))}
                  {(!data?.sightings || data?.sightings?.length === 0) && (
                    <div className="text-base flex justify-center">
                      <span> 0 Sightings</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )} */}
        </div>
      </ServerAuthProvider>
    </Container>
  );
}
