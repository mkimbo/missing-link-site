import {
  ServerAuthProvider,
  getTenantFromCookies,
} from "@/auth/server-auth-provider";
import Container from "@/components/ui/container";
import { serverDB } from "@/lib/firebase";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import sampleMissing from "../../../../public/img/missing-person.webp";
import { placeholderUrl } from "@/lib/constants";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SightingButton from "@/components/LoginSightingButton";
import ShareButtons from "@/components/ShareButtons";
import MarkAsFoundButton from "@/components/MarkAsFoundButton";
import { CalendarDays } from "lucide-react";
import { TMotor } from "@/types/misssing_motor.model";
import { SightingDialog } from "@/components/SightingDialog";
import BackButton from "@/components/BackButton";
import ResourceHeader from "@/app/resources/ResourceHeader";
type Props = {
  params: { id: string };
};

async function getMissingVehicleById(
  vehicleId: string
): Promise<TMotor | null> {
  const missingVehicle = await serverDB
    .collection(process.env.FIREBASE_FIRESTORE_MISSING_MOTORS!)
    .doc(vehicleId)
    .get();
  if (!missingVehicle.exists) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("No vehicle found with that id");
  }
  return missingVehicle.data() as TMotor;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  if (!params.id) {
    throw new Error("No vehicle Id provided");
  }

  const data = await getMissingVehicleById(params.id);
  if (!data) {
    throw new Error("No vehicle found with that id");
  }

  const { model, lastSeenDescription, lastSeenDate, images, make, found } =
    data;
  const ogImage = images[0];

  return {
    title: found ? make + " " + model : make + " " + model,
    description: lastSeenDescription,

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL!}/missing/vehicles/${
        params.id
      }`,
    },
    openGraph: {
      title: "A " + make + " " + model + " was stolen",
      description: lastSeenDescription,
      type: "article",
      publishedTime: lastSeenDate,
      url: `${process.env.NEXT_PUBLIC_URL!}/missing/vehicles/${params.id}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      title: "A " + make + " " + model + " was stolen",
      card: "summary_large_image",
      description: lastSeenDescription,
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
  };
}

export default async function MissingVehicle({ params }: Props) {
  if (!params.id) {
    throw new Error("No vehicleId provided");
  }

  const vehicle = await getMissingVehicleById(params.id);
  const tenant = await getTenantFromCookies(cookies);

  return (
    <ServerAuthProvider>
      <div className="sticky self-end top-0 z-50 backdrop-blur-lg w-full">
        <ResourceHeader title="" />
      </div>
      <div className="w-full lg:w-6/12 px-4 mx-auto items-center justify-center">
        <div
          className={`flex items-center justify-center  h-16  w-full ${
            vehicle?.found ? "bg-green-500" : "bg-primary"
          }`}
        >
          <span className="text-xl">
            {vehicle?.found ? "Found" : "Missing"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 my-6">
          <Image
            className="rounded-lg w-[200px] h-[200px] lg:w-[300px] lg:h-[300px]"
            src={
              vehicle?.images!.length! > 0 ? vehicle?.images[0]! : sampleMissing
            }
            alt={`${vehicle?.make}`}
            width={500}
            height={500}
            placeholder="blur"
            blurDataURL={placeholderUrl}
          />
          <div className="flex flex-col text-xs md:text-base">
            <span className="font-bold text-primary text-base md:text-lg">
              {vehicle?.make} {vehicle?.model} {vehicle?.year}
            </span>
            <span>
              Year: <span className="text-primary">{vehicle?.year}</span>
            </span>
            <span>
              Color: <span className="text-primary">{vehicle?.color}</span>
            </span>

            <span className=" text-primary mt-2 md:mt-4">Last seen on</span>
            <span>
              {format(new Date(vehicle?.lastSeenDate!), "do MMM yyyy")}
            </span>
            <span className="text-primary mt-2 md:mt-4">Location</span>
            <span>{vehicle?.lastSeenLocation}</span>
            <span>
              {vehicle?.county ? vehicle?.county : vehicle?.formattedAddress}
            </span>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardDescription className="text-center text-base text-foreground">
              {vehicle?.lastSeenDescription}
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            <div className="mb-2">
              {!vehicle?.found
                ? `If you have any info please contact ${vehicle?.secondaryContact}. You can also report to the nearest police station or directly on this platform by clicking the button below.`
                : `This vehicle was found! Thank you.`}
            </div>
            {!vehicle?.found && (
              <SightingDialog
                type="motor"
                missingItem={{ ...vehicle!, id: params.id }}
                creatorId={`${vehicle?.createdBy}`}
              />
            )}
          </CardContent>

          {!vehicle?.found && (
            <CardFooter className="flex flex-col">
              <ShareButtons
                url={`${process.env.NEXT_PUBLIC_URL!}/missing/vehicles/${
                  params.id
                }`}
                title={`${vehicle?.make} ${vehicle?.model} is missing`}
                description={vehicle?.lastSeenDescription!}
              />
              {tenant?.uid === vehicle?.createdBy && (
                <MarkAsFoundButton
                  type="vehicle"
                  found={vehicle?.found}
                  itemId={params.id!}
                />
              )}
            </CardFooter>
          )}
        </Card>
        {tenant?.uid === vehicle?.createdBy && !vehicle?.found && (
          <Card className="my-6">
            <CardHeader className="pb-3">
              <CardTitle>Recent sightings</CardTitle>
              <CardDescription>
                If someone reports sighting your vehicle, you will receive a
                notification and from here you can see where and when.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-1">
              {vehicle?.sightings?.map((sighting) => (
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
              {(!vehicle?.sightings || vehicle?.sightings?.length === 0) && (
                <div className="text-base flex justify-center">
                  <span> 0 Sightings</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </ServerAuthProvider>
  );
}
