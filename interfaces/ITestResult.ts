import { ICharacterId } from "~/common/app-const";
import { ITripTag } from "./enums/TripTag";

export interface ITestResult{
    // id?: string;
    tripTagList: ITripTag[];
    characterId?: ICharacterId;
    city: {
        [k: string] : number
    }
    // placeGroup: string[];
}
export const defaultTestResult : ITestResult = {
    tripTagList: [],
    characterId: undefined,
    city: {}
}
