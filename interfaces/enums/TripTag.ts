import { enumFromList } from "../../utils/utils";

const TripTagList = [
    "PHOTO",
    "EAT",
    "FRIENDSHIP",
    "PHYSICAL",
    "REST",
    "INFLUENCER",
    "COFFEE",
    "CULTURE",
    "ADVENTURE",
    "PASSION",
    "REFRESH"
];
export const TripTag = enumFromList(TripTagList);
export type ITripTag = typeof TripTag[keyof typeof TripTag]; 