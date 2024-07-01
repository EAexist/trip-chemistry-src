import { enumFromList } from "../../utils/utils";

const CityTagList = [
    "QUIET",
    "LOUD",
    "ACTIVE",
    "HISTORY",
    "MODERN",
    "FAMOUS",
    "HIDDEN",
    "NATURE",
    "INTERNATIONAL",
]
export const CityTag = enumFromList(CityTagList);
export type ICityTag = typeof CityTag[keyof typeof CityTag]; 