import { useCallback } from "react";


import { asyncSetNickname, useUserId } from "../reducers/authReducer";
import { useAppDispatch } from "../store";

const useSetNickname = () => {

    const dispatch = useAppDispatch();
    const userId = useUserId();
    return(
        useCallback(( value: string )=>{
            dispatch( asyncSetNickname( { id: userId, value }) )
        }, [ dispatch, userId ])
    )
}

export default useSetNickname;