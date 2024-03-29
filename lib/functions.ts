const geofire = require("geofire-common");
import { geocodeByPlaceId, getLatLng } from "react-places-autocomplete";
import Cookies from "js-cookie";
import { TDetailedLocation } from "@/types/missing_person.model";

export const loadScript = (
  src: string,
  position: HTMLElement | null,
  id: string
) => {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const getGeoHash = (geoloc: { lat: number; lng: number }) => {
  const hash = geofire?.geohashForLocation([geoloc.lat, geoloc.lng]);
  return hash;
};

export const setVerifiedCookie = (val: string) => {
  // Set a cookie
  const cookieName = "userVerified";
  const cookieValue = val;
  const cookieOptions = {
    path: "/",
    expires: 7,
    //httpOnly: true,
    //secure: process.env.NODE_ENV === "production",
  };
  console.log("setting cookie", cookieName, cookieValue, cookieOptions);
  Cookies.set(cookieName, cookieValue, cookieOptions);
  //setCookie(cookieName, cookieValue, cookieOptions);
};

export const deleteVerifiedCookie = () => {
  Cookies.remove("userVerified");
};

export const getVerifiedCookie = () => {
  return Cookies.get("userVerified");
};

export const truncateText = (str: string, n: number, b?: boolean) => {
  if (str.length <= n) {
    return str;
  }
  const useWordBoundary = b != null ? b : true;
  const subString = str.substring(0, n - 1); // the original check
  return useWordBoundary
    ? subString.substring(0, subString.lastIndexOf(" "))
    : subString;
};

export const extractUsername = (email: string) => {
  const atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    const name = email.slice(0, atIndex);
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  return email;
};

export const processPlaceDetails: (
  place: google.maps.places.PlaceResult
) => Promise<TDetailedLocation | null> = async (place) => {
  const placeId = place.place_id;
  if (!placeId) {
    return null;
  }
  let geoloc: google.maps.LatLngLiteral;
  let geohash: string = "";
  let longAddress: string = "";
  let formattedAddress: string = place.formatted_address
    ? place.formatted_address
    : "";
  let county: string = "";
  let constituency: string = "";
  const results = await geocodeByPlaceId(placeId);
  //get lat long
  const latLng = await getLatLng(results[0]);
  geoloc = latLng;
  //get geohash
  geohash = getGeoHash(latLng);
  //get county & constituency
  const addressComponents = place.address_components;
  if (addressComponents?.length) {
    const longNameArray = addressComponents.map(
      (component) => component.long_name
    );
    longAddress = longNameArray.join(",");
    const countyName = longNameArray.find((name) => name.includes("County"));
    const constituencyName = longNameArray.find((name) =>
      name.includes("Consituency")
    );
    county = countyName ? countyName : "";
    constituency = constituencyName ? constituencyName : "";
  }
  const detailedLocation: TDetailedLocation = {
    placeId,
    geoloc,
    geohash,
    longAddress,
    formattedAddress,
    county,
    constituency,
  };

  return detailedLocation;
};

export function getFileObjectFromBlobUrl(blobUrl: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", blobUrl);
    xhr.responseType = "blob";
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(`Failed to retrieve file from ${blobUrl}.`);
      }
    };
    xhr.onerror = () => {
      reject(`Failed to retrieve file from ${blobUrl}.`);
    };
    xhr.send();
  });
}

export function getGender(val: string): string {
  if (val === "M") {
    return "Male";
  }
  if (val === "F") {
    return "Female";
  }
  return "Other";
}

export function getAmountToPay(radius: string): string {
  switch (radius) {
    case "5":
      return "50";
    case "10":
      return "100";
    case "20":
      return "200";
    default:
      return "50";
  }
}

export function maskPhoneNumber(phoneNumber: string): string {
  console.log("Original phone number:", phoneNumber);

  const length = phoneNumber.length;
  if (length < 8) {
    return phoneNumber; // Return the original phone number if it has less than 8 characters
  }

  const maskedNumber =
    phoneNumber.slice(0, Math.floor(length / 2) - 2) +
    "****" +
    phoneNumber.slice(Math.ceil(length / 2) + 2);

  return maskedNumber;
}

export function getRandomItem(list: any[]) {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}
