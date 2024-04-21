import { IProfile, IProfileId } from "./IProfile";

interface ICityChemistry {
    [key: string]: number
};

export interface IChemistry {
    id: string,
    title: string,
    titleCity: string,
    leaderList: IProfileId[];
    cityChemistry: ICityChemistry;
    scheduleChemistryText?: string[];
    budgetChemistryText?: string[];
    profileList: { [id: IProfileId]: IProfile };
};

export const defaultChemistry = {
    id: "",
    title: "",
    titleCity: "",
    leaderList: [],
    cityChemistry: {},
    scheduleChemistryText: [],
    budgetChemistryText: [],
    profileList: {},
}