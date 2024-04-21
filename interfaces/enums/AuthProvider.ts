import { enumFromList } from "../../utils/utils";

const AuthProviderList = [
    "NONE",
    "GUEST",
    "KAKAO",
];
export const AuthProvider = enumFromList(AuthProviderList);
export type IAuthProvider = typeof AuthProvider[keyof typeof AuthProvider]; 