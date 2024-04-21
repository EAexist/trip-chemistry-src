import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { asyncSetNickname, useUserId } from "../reducers/authReducer";
import { AppDispatch } from "../store";

const useSetNickname = () => {

    const dispatch = useDispatch<AppDispatch>();
    const userId = useUserId();
    return(
        useCallback(( value: string )=>{
            dispatch( asyncSetNickname( { id: userId, value }) )
        }, [ dispatch, userId ])
    )
}

export default useSetNickname;