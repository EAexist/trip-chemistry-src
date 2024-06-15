import { useEffect } from "react";
import { useSearchParams } from "~/router-module";

import { asyncKakaoLogin } from "../reducers/authReducer";
import { useAppDispatch } from "../store";

const useKakaoLogin = ( ) => {

    /* Hooks */
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

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