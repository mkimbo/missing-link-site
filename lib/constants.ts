export const placeholderUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8X8IwDQAF+AILf7WxgQAAAABJRU5ErkJggg==";
export const MAX_FILE_SIZE = 3000000;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const PhoneNumberRegex = /^(07|01)\d{8}$/;

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
