import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "~/router-module";

import { asyncKakaoLogin, useUserId } from "../reducers/authReducer";
import { AppDispatch } from "../store";

const useKakaoLogin = ( ) => {

    /* Hooks */
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();

    /* Try login when access code is generated. */
    useEffect(() => {
        const code = searchParams.get('code');
        const state = searchParams.get('state'); 
        let userId = ""
        if ( state ){
            let pathList = state?.split('/');
            console.log(`[useKakaoLogin] pathList=${pathList}`);
            if ( pathList.includes('guest')){
                userId = pathList[pathList.indexOf('guest')+1];
            }
        }
        console.log(`[useKakaoLogin] useEffect\n\tcode=${code}\n\tstate=${state}\n\tuserId=${userId}`);
        if (code){
            dispatch( asyncKakaoLogin({ code, id: userId }) );
        }
    }, [ dispatch, searchParams ])

}

export default useKakaoLogin;