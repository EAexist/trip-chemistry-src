import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { useUserId } from "../reducers/authReducer";
import { AppDispatch } from "../store";
import { asyncCreateChemistry } from "../reducers/chemistryReducer";

const useCreateChemistry = () => {

    const dispatch = useDispatch<AppDispatch>();
    const userId = useUserId();
    return(
        useCallback(( title: string )=>{
            dispatch( asyncCreateChemistry({
                title: title,
                titleCity: "kyoto",
                userId: userId
            }))
        }, [ dispatch, userId ])
    )
}

export default useCreateChemistry;