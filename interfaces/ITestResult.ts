import { ITripCharacter, defaultTripCharacter } from "./ITripCharacter";
import { ITripTag } from "./enums/TripTag";

export interface ITestResult{
    // id?: string;
    tripTagList: ITripTag[];
    tripCharacter: ITripCharacter;
    // placeGroup: string[];
}
export const defaultTestResult : ITestResult = {
    tripTagList: [],
    tripCharacter: defaultTripCharacter,
}
