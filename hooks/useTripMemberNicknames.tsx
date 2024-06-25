
import { defaultChemistry } from "~/interfaces/IChemistry";
import { useAppSelector } from "../store";
import { createSelector } from "@reduxjs/toolkit";

const useTripMemberNicknames = (key: keyof typeof defaultChemistry.memberLists) => useAppSelector(
    createSelector(
        state => state.chemistry.data.memberLists[key],
        state => state.chemistry.data.profiles,
        (memberList, profiles) => (
            memberList.map((id) =>
                profiles[id].nickname
            )
        )))

export default useTripMemberNicknames;