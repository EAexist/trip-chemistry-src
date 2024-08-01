/* React */
import { useEffect, useState } from "react";

/* Externals */
import { Button, Container, Divider, Toolbar } from "@mui/material";
import { useLocation, useNavigate } from "~/router-module";

/* App */
import { KAKAO_AUTH_URL_BASE } from "../../constants/auth";
import KakaoLoginButton from "../../components/Button/KakaoLoginButton";
import { KakaoLoginHelp } from "../../components/KakaoLoginHelp";
import { asyncGuestSignIn, authorize, useUserId } from "../../reducers/authReducer";
import { useAppDispatch, useAppSelector } from "../../store";
import { AuthLoadRequiredContent } from "../LoadRequiredContent";

import env from "~/env";

interface LoginContentProps {
    title?: string;
}

function LoginContent({ title = "테스트를 시작해보세요" }: LoginContentProps) {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const userId = useUserId();

    const [url, setUrl] = useState<string>(KAKAO_AUTH_URL_BASE);

    /* Reducers */
    const doRequireInitialization = useAppSelector((state) => state.auth.data.doRequireInitialization);

    const { state } = useLocation();

    const handleAuthSuccess = () => {

        /* If user has logined before, fetch the profile. Else, InitializeNicknameContent (/initializeNickname) handles the process. */
        if (!doRequireInitialization) {
            dispatch(authorize());
            navigate(`/user?guestId=${userId}`);
        }
        else {
            navigate(`/login/initializeNickname${(userId !== undefined) ? `?guestId=${userId}` : ``}`, { state: { isAccessValid: true, navigateDirection: "next" } });
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
        urlObject.searchParams.set('client_id', `${env.KAKAO_REST_API_KEY}`);
        urlObject.searchParams.set('redirect_uri', `${env.PUBLIC_URL}${env.KAKAO_REDIRECT_PATH}`);
        urlObject.searchParams.set('response_type', 'code');
        setUrl(urlObject.toString());
    }, []);

    useEffect(() => {
        console.log(`[LoginContent]\n\turl=${url}`);
    }, [url])

    return (
        <AuthLoadRequiredContent {...{
            handleSuccess: handleAuthSuccess,
            showOnSuccess: false
        }}>
            <div className="fill-window">
                <Toolbar />
                <div style={{ paddingTop: "24px" }}>
                    <Container className="gutter-xl content" style={{ marginTop: "48px" }}>
                        <div className="section-header" style={{ marginBottom: "48px" }}>
                            <h2 className="section-title">로그인</h2>
                            <p>{title}</p>
                        </div>
                        <KakaoLoginButton />
                        <Divider>또는</Divider>
                        <Button
                            onClick={handleGuestSignIn}
                            variant="contained"
                            sx={{ width: "100%", height: '45px', borderRadius: "6px" }}
                        >
                            게스트 로그인
                        </Button>
                        <div style={{ marginTop: "64px" }}>
                            <KakaoLoginHelp />
                        </div>
                    </Container>
                </div>
            </div>
        </AuthLoadRequiredContent>
    );
}
export default LoginContent;