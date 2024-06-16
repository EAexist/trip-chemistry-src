import { IProfile, IProfileId } from "./IProfile";

export interface IChemistry {
    id: string
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
    profileList: { [id: IProfileId]: IProfile };
    unAnsweredprofileList: { [id: IProfileId]: IProfile };
};
export interface IChemistryDTO {
    id: string
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
    profileList: IProfile[];
    unAnsweredprofileList: { [id: IProfileId]: IProfile };
};

export const defaultChemistry : IChemistry = {
    id: "",
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
    profileList: {},
    unAnsweredprofileList: {}
}