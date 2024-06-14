import { IProfile, IProfileId } from "./IProfile";

export interface IChemistry {
    id: string
    title: string
    titleCity: string
    city: {
        [key: string]: number
    }
    schedule: {
        relaxingMembers: IProfileId[]
        busyMembers: IProfileId[]         
    }
    budget: {
        interestedMembers: IProfileId[]
        notInterestedMembers: IProfileId[]
    }
    profileList: { [id: IProfileId]: IProfile };
};

export const defaultChemistry : IChemistry = {
    id: "",
    title: "",
    titleCity: "",
    city: {},
    schedule: {
        relaxingMembers: [],
        busyMembers: []         
    },
    budget: {
        interestedMembers: [],
        notInterestedMembers: []
    },
    profileList: {},
}