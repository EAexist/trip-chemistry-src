/* React */
import { useEffect, useState } from "react";

/* Externals */
import { Button, Stack, Toolbar } from "@mui/material";
import { useLocation, useNavigate } from "~/router-module";

/* App */
import { Help } from "@mui/icons-material";
import MainAppBar from "~/components/AppBar/MainAppBar";
import { useAppSelector } from "~/store";
import { KAKAO_AUTH_URL_BASE } from "../../common/auth";
import KakaoLoginButton from "../../components/Button/KakaoLoginButton";
import { asyncGuestSignIn, authorize } from "../../reducers/authReducer";
import { useAppDispatch } from "../../store";
import { AuthLoadRequiredContent } from "../LoadRequiredContent";
import { KakoLoginHelp } from "~/components/KakaoLoginHelp";
// import env from "~/env";
interface LoginContentProps {
    title?: string;
}

function LoginContent({ title = "테스트를 시작해볼까요?" }: LoginContentProps) {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [url, setUrl] = useState<string>(KAKAO_AUTH_URL_BASE);

    /* Reducers */
    const doRequireInitialization = useAppSelector((state) => state.auth.data.doRequireInitialization);

    const handleAuthSuccess = () => {

        /* If user has logined before, fetch the profile. Else, InitializeNicknameContent (/initializeNickname) handles the process. */
        if (!doRequireInitialization) {
            dispatch(authorize());
        }
        else {
            navigate('/login/initializeNickname', { state: { loginRedirectPath: pathname, navigateDirection: "next" } });
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
            handleFail: () => { }
        }}>
            <div className="fill-window flex">
                <Toolbar />
                <div className="flex-grow block--centered content content--sparse">
                    <h2 className="typography-label">
                        {title}
                    </h2>
                    <Stack direction={"column"} spacing={2} className="wrapper">
                        <KakaoLoginButton />
                        <Button
                            onClick={handleGuestSignIn}
                            variant="contained"
                            sx={{ width: "100%", height: '45px', borderRadius: "6px" }}
                        >
                            게스트 로그인
                        </Button>
                    </Stack>
                    <KakoLoginHelp/>
                </div>
            </div>
        </AuthLoadRequiredContent>
    );
}
export default LoginContent;