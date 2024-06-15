
import { defaultChemistry } from "~/interfaces/IChemistry";
import { useAppSelector } from "../store";

const useTripMemberNicknames = (key: keyof typeof defaultChemistry.memberLists) => useAppSelector((state) => (
    state.chemistry.data.memberLists[key].map((id)=>
        state.chemistry.data.profileList[id].nickname
    )    
))

export default useTripMemberNicknames;