import { IProfile, IProfileId } from "./IProfile";

export interface IChemistry {
    id: string
    isSample: boolean
    title: string
    titleCity: string
    city: {
        [key: string]: number
    }
    memberLists: {
        relaxing: IProfileId[]
        busy: IProfileId[]      
        lowDailyRestaurantBudget: IProfileId[] 
        highDailyRestaurantBudget: IProfileId[] 
        interested: IProfileId[]
        notInterested: IProfileId[] 
    }
    profiles: { [id: IProfileId]: IProfile };
    profileIds: IProfileId[];
};
export interface IChemistryDTO {
    id: string
    isSample: boolean
    title: string
    titleCity: string
    city: {
        [key: string]: number
    }
    memberLists: {
        relaxing: IProfileId[]
        busy: IProfileId[]      
        lowDailyRestaurantBudget: IProfileId[] 
        highDailyRestaurantBudget: IProfileId[] 
        interested: IProfileId[]
        notInterested: IProfileId[] 
    }
    profiles: IProfile[];
    unAnsweredprofiles: { [id: IProfileId]: IProfile };
};

export const defaultChemistry : IChemistry = {
    id: "",
    isSample: false,
    title: "",
    titleCity: "",
    city: {},
    memberLists: {
        relaxing: [],
        busy: [],      
        lowDailyRestaurantBudget: [],
        highDailyRestaurantBudget: [],
        interested: [],
        notInterested: []
    },
    profiles: {},
    profileIds: []
}