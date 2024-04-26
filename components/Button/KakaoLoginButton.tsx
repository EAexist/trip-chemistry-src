/* React */
import { useEffect, useState } from "react";

/* Externals */
import { ButtonBase } from "@mui/material";
import { useLocation } from "~/router-module";

/* App */
import { KAKAO_AUTH_URL_BASE } from "../../common/auth";
import getImgSrc from "../../utils/getImgSrc";
// import env from "~/env";

function KakaoLoginButton(){

    const { state, pathname } = useLocation();
    const [url, setUrl] = useState<string>(KAKAO_AUTH_URL_BASE);

    /* Reducers */
    useEffect(() => {

        const urlObject = new URL(url);

        if ((state !== null) && state.loginRedirectPath) {
            console.log(`[KakaoLoginButton] loginRedirectPath=${state.loginRedirectPath}`);
            urlObject.searchParams.set('state', state.loginRedirectPath);
        }
        else {
            console.log(`[KakaoLoginButton] pathname=${pathname}`);
            urlObject.searchParams.set('state', pathname);
        }
        setUrl(urlObject.toString());
    }, [state, pathname, url]);

    useEffect(() => {
        const urlObject = new URL(url);
        urlObject.searchParams.set('client_id', `${window.ENV.REACT_APP_KAKAO_REST_API_KEY}`);
        urlObject.searchParams.set('redirect_uri', `${window.ENV.REACT_APP_KAKAO_REDIRECT_URL}`);
        urlObject.searchParams.set('response_type', 'code');
        setUrl(urlObject.toString());
    }, []);

    useEffect(() => {
        console.log(`[KakaoLoginButton]\n\turl=${url}`);
    }, [url])

    return (
        <a href={url}>
            <ButtonBase>
                <img height={'45px'} width={'183px'} src={getImgSrc("/kakao", "kakao_login_large_narrow" )} alt={"kakao_login"} className="width-full"/>
            </ButtonBase>
        </a>
    );
}
export default KakaoLoginButton;