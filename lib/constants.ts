export const placeholderUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8X8IwDQAF+AILf7WxgQAAAABJRU5ErkJggg==";
export const MAX_FILE_SIZE = 3000000;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const PhoneNumberRegex = /^\d+$/;
export const safaricomPhoneNumberRegex =
  /^(?:254|\+254|0)?((?:70[0-9]|71[0-9]|72[0-9]|74[0-3]|74[5-6]|748|75[7-9]|76[8-9]|79[0-9]|011[2-5])[0-9]{6})$/;

export const personSearchFields = {
  keys: [
    "lastSeenLocation",
    "fullname",
    "formattedAddress",
    "othername",
    "longAddress",
  ],
  threshold: 0.3,
};

export const appealSearchFields = {
  keys: [
    "hospitalLocation",
    "hospitalName",
    "formattedAddress",
    "othername",
    "longAddress",
  ],
  threshold: 0.3,
};

export const motorSearchFields = {
  keys: [
    "lastSeenLocation",
    "licencePlate",
    "formattedAddress",
    "longAddress",
    "make",
  ],
  threshold: 0.3,
};

export const policeSearchFields = {
  keys: ["label", "county"],
  threshold: 0.3,
};
