import {
  ServerAuthProvider,
  getTenantFromCookies,
} from "@/auth/server-auth-provider";
import Container from "@/components/ui/container";
import { serverDB } from "@/lib/firebase";
import { TPerson } from "@/types/missing_person.model";
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
import { SightingDialog } from "@/components/SightingDialog";
type Props = {
  params: { id: string };
};

async function getMissingPersonById(personId: string): Promise<TPerson | null> {
  const missingPerson = await serverDB
    .collection(process.env.FIREBASE_FIRESTORE_MISSING_PERSONS!)
    .doc(personId)
    .get();
  if (!missingPerson.exists) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("No person found with that id");
  }
  return missingPerson.data() as TPerson;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  if (!params.id) {
    throw new Error("No personId provided");
  }

  const data = await getMissingPersonById(params.id);
  if (!data) {
    throw new Error("No person found with that id");
  }

  const { fullname, lastSeenDescription, lastSeenDate, images, found } = data;
  const ogImage = images[0];

  return {
    title: found ? fullname : fullname,
    description: lastSeenDescription,
    // metadataBase: new URL("${process.env.NEXT_PUBLIC_URL!}"),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL!}/missing/persons/${params.id}`,
    },
    openGraph: {
      title: fullname + " is missing",
      description: lastSeenDescription,
      type: "article",
      publishedTime: lastSeenDate,
      url: `${process.env.NEXT_PUBLIC_URL!}/missing/persons/${params.id}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullname + " is missing",
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
  } as Metadata;
}

export default async function MissingPerson({ params }: Props) {
  if (!params.id) {
    throw new Error("No personId provided");
  }

  const data = await getMissingPersonById(params.id);
  const tenant = await getTenantFromCookies(cookies);

  function getGender(val: string): string {
    if (val === "M") {
      return "Male";
    }
    if (val === "F") {
      return "Female";
    }
    return "Other";
  }

  return (
    <Container>
      <ServerAuthProvider>
        <div className="w-full lg:w-6/12 px-4 mx-auto items-center justify-center">
          <div
            className={`flex items-center justify-center mt-4 md:mt-8  h-16  w-full ${
              data?.found ? "bg-secondary" : "bg-primary"
            }`}
          >
            <span className="text-xl">{data?.found ? "Found" : "Missing"}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 my-6">
            <Image
              className="rounded-lg w-[200px] h-[200px] lg:w-[300px] lg:h-[300px]"
              src={data?.images!.length! > 0 ? data?.images[0]! : sampleMissing}
              alt={`${data?.fullname}`}
              width={500}
              height={500}
              placeholder="blur"
              blurDataURL={placeholderUrl}
            />
            <div className="flex flex-col text-xs md:text-base">
              <span className="font-bold text-primary text-base md:text-lg">{`${
                data?.fullname
              }${data?.othername && ` (${data?.othername})`}`}</span>
              <span>
                Age: <span className="text-primary">{data?.age}</span>
              </span>
              <span>
                Gender:{" "}
                <span className="text-primary">{getGender(data?.gender!)}</span>
              </span>
              <span>
                Complexion:{" "}
                <span className="text-primary">{data?.complexion}</span>
              </span>
              <span className=" text-primary mt-2 md:mt-4">Last seen on</span>
              <span>
                {format(new Date(data?.lastSeenDate!), "do MMM yyyy")}
              </span>
              <span className="text-primary mt-2 md:mt-4">Location</span>
              <span>{data?.lastSeenLocation}</span>
              <span>
                {data?.county ? data?.county : data?.formattedAddress}
              </span>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardDescription className="text-center text-base text-foreground">
                {data?.lastSeenDescription}
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center">
              <div className="mb-2">{`If you have any info please contact ${data?.secondaryContact}. You can also report to the nearest police station or directly on this platform by clicking the button below.`}</div>
              <SightingDialog
                type="motor"
                missingItem={{ ...data!, id: params.id }}
                creatorId={`${data?.createdBy}`}
              />
            </CardContent>

            <CardFooter className="flex flex-col">
              <ShareButtons
                url={`${process.env.NEXT_PUBLIC_URL!}/missing/persons/${
                  params.id
                }`}
                title={data?.fullname!}
                description={data?.lastSeenDescription!}
              />
              {tenant?.uid === data?.createdBy && (
                <MarkAsFoundButton
                  type="bike"
                  found={data?.found}
                  itemId={params.id!}
                />
              )}
            </CardFooter>
          </Card>
          {tenant?.uid === data?.createdBy && !data?.found && (
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
          )}
        </div>
      </ServerAuthProvider>
    </Container>
  );
}
