import { enumFromList } from "../../utils/utils";

const ExpectationTagList = [
    "HEAL",
    "COMPACT",
    "FULLFILL",
    "MEMORY",
    "RELAX",
    "COMFORT",
    "ADVENTURE",
    "NEW",
    "DIGITAL_DETOX",
    "REST",
    "VIEW",  
    "FRIENDSHIP",  
];
export const ExpectationTag = enumFromList(ExpectationTagList);
export type IExpectationTag = typeof ExpectationTag[keyof typeof ExpectationTag]; 