/* React */

/* Externals */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "~/router-module";
import useKakaoLogin from "../../hooks/useKakaoLogin";
import { IUserProfile } from "../../interfaces/IUserProfile";
import { LoadStatus } from "../../interfaces/enums/LoadStatus";
import { disableAutoLogin, useAuthLoadStatus, useAuthorize, useUserProfile } from "../../reducers/authReducer";
import { AppDispatch } from "../../store";

function KakaoAuthRedirectPage(){

    /* Hooks */
    const [ searchParams ] = useSearchParams();
    const loginRedirectPath = searchParams.get('state');

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const authorize = useAuthorize();
    const userProfile = useUserProfile() as IUserProfile;
    useKakaoLogin();

    /* Reducers */
    const [ authLoadStatus, setAuthLoadStatus ] = useAuthLoadStatus();

    useEffect(() => {
        /* 카카오 로그인 성공시 권한 부여, 로컬 스토리지에 정보 저장 및 loadStatus 정리. */
        if( authLoadStatus === LoadStatus.SUCCESS ){
            console.log(`[KakaoAuthRedirectPage] kakaoAccessToken=${userProfile.kakaoAccessToken}`);
            window.localStorage.setItem("kakaoAccessToken", userProfile.kakaoAccessToken );
            authorize();
            /* [ 게스트 -> 카카오 계정으로 전환한 경우 ]
                닉네임 초기화 없이 바로 리다이렉트 */
            navigate(`${
                    loginRedirectPath
                    ? loginRedirectPath
                    : "home"}`);
            setAuthLoadStatus( LoadStatus.REST );
        }
    }, [ authLoadStatus, authorize, setAuthLoadStatus, userProfile ]);

    useEffect(()=>{
        dispatch(disableAutoLogin());
    }, [ dispatch ])

    return (
        null
    );
}
export default KakaoAuthRedirectPage;