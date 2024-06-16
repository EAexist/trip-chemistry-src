import { IProfile, defaultProfile } from "./IProfile";

export interface IUserProfile extends IProfile {
    authProvider: string,
    kakaoAccessToken: string,
    authProviderNickname?: string,
    chemistryIdList: string[],
    tripList?: {
        [id: string]: {
            title: string,
            titleCity: string,
            profiles: {
                nickname: string,
                avatarId: string,
            }[]
        }
    };
};

export const defaultUserProfile : IUserProfile = {
    ...defaultProfile,
    authProvider: "",
    kakaoAccessToken: "",
    // authProviderNickname: "",
    chemistryIdList: [],
};