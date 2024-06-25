/* React */
import { useEffect, useState } from "react";

/* Externals */
import { ButtonBase, ButtonBaseProps } from "@mui/material";
import { useLocation } from "~/router-module";

/* App */
import { KAKAO_AUTH_URL_BASE } from "../../common/auth";
import getImgSrc from "../../utils/getImgSrc";
// import env from "~/env";

function KakaoLoginButton({ sx, ...props }: Omit<ButtonBaseProps, "href">) {

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
        <ButtonBase href={url} sx={{ height: "45px", borderRadius: "6px", overflow: "hidden", backgroundColor: "#FEE500" , ...sx }}>
            <img src={getImgSrc("/kakao", "kakao_login_large_narrow", { size: "default" })} alt={"kakao_login"} height={"100%"}/>
        </ButtonBase>
    );
}
export default KakaoLoginButton;