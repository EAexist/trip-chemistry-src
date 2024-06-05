/* React */
import { useEffect, useState } from "react";

/* Externals */
import { Button, Grid, Stack, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "~/router-module";

/* App */
import { Help } from "@mui/icons-material";
import { KAKAO_AUTH_URL_BASE } from "../../common/auth";
import KakaoLoginButton from "../../components/Button/KakaoLoginButton";
import RoutedMotionPage from "../../motion/components/RoutedMotionPage";
import { asyncGuestSignIn, authorize } from "../../reducers/authReducer";
import { AppDispatch, RootState } from "../../store";
import { AuthLoadRequiredContent } from "../LoadRequiredContent";
// import env from "~/env";
interface LoginContentProps {
    title?: string;
}

function LoginContent({ title ="테스트를 시작해볼까요?" }:LoginContentProps){

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [url, setUrl] = useState<string>(KAKAO_AUTH_URL_BASE);

    /* Reducers */
    const doRequireInitialization = useSelector((state: RootState) => state.auth.data.doRequireInitialization);

    const handleAuthSuccess = () => {

        /* If user has logined before, fetch the profile. Else, InitializeNicknameContent (/initializeNickname) handles the process. */
        if (!doRequireInitialization) {
            dispatch(authorize());
        }
        else {
            navigate('/login/initializeNickname', { state: { loginRedirectPath: pathname, navigateDirection : "next" } });
        }
    }

    const handleGuestSignIn = () => {
        dispatch(asyncGuestSignIn());
    }

    useEffect(() => {
        console.log(`[LoginContent] pathname=${pathname}`);
        const urlObject = new URL(url);
        urlObject.searchParams.set('state', pathname);
        setUrl(urlObject.toString());
    }, [url, pathname]);

    useEffect(() => {
        const urlObject = new URL(url);
        urlObject.searchParams.set('client_id', `${window.ENV.REACT_APP_KAKAO_REST_API_KEY}`);
        urlObject.searchParams.set('redirect_uri', `${window.ENV.REACT_APP_KAKAO_REDIRECT_URL}`);
        urlObject.searchParams.set('response_type', 'code');
        setUrl(urlObject.toString());
    }, []);

    useEffect(() => {
        console.log(`[LoginContent]\n\turl=${url}`);
    }, [url])

    return (
        <AuthLoadRequiredContent {...{
            handleSuccess: handleAuthSuccess,
            handleFail: () =>{}
        }}>
                <div className="flex-grow block--centered-row block__body block__body--large">
                    <div style={{ marginTop: "128px" }} />
                    <h2 className="typography-label">
                        {title}
                    </h2>
                    <div className="block--with-padding block--with-padding--large">
                        <Grid container direction={"column"} rowSpacing={2}>
                            <Grid item>
                                <KakaoLoginButton />
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={handleGuestSignIn}
                                    variant="contained"
                                    sx={{ width: '183px', height: '45px', borderRadius: "4px" }}
                                >
                                    게스트 로그인
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className="block--with-margin block--with-margin--large block--centered">
                    <p className="typography-note block--width-large">
                        <Help fontSize="inherit" />
                        {
                            "카카오 로그인을 이용하면\n링크를 잃어버려도 내 테스트 결과를 안전하게 불러올 수 있어요."
                        }
                    </p>
                </div>
        </AuthLoadRequiredContent>
    );
}
export default LoginContent;