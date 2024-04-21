import { enumFromList } from "../../utils/utils";

const ActivityTagList = [
    "PHOTO",
    "INSTA",
    "NETWORK",
    "EXTREME",
    "SWIM",
    "DRIVE",
    "WALK",
    "THEMEPARK",
    "MARKET",
    "HOTEL",
    "VLOG",
    "WAITING",
    "BAR",
    "CAFE",
    "SHOPPING",
    "SHOW",
]
export const ActivityTag = enumFromList(ActivityTagList);
export type IActivityTag = typeof ActivityTag[keyof typeof ActivityTag]; 