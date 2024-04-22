import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, ScrollRestoration, useSearchParams } from "~/router-module";
import AppBar from "../components/AppBar/AppBar";
import { AppBarContextProvider } from "../components/AppBar/AppBarContext";
import { AuthLoadRequiredContent } from "../content/LoadRequiredContent";
import { asyncGuestLogin, asyncKakaoLoginByAccessToken, disableAutoLogin, useAuthorize, useIsAutoLoginEnabled } from "../reducers/authReducer";
import { AppDispatch } from "../store";

interface PageProps {

};

function Page({ }: PageProps) {

    /* Hooks */
    const dispatch = useDispatch<AppDispatch>();
    const authorize = useAuthorize();
    const [searchParams] = useSearchParams();
    const guestId = searchParams.get('guestId');
    const isAutoLoginEnabaled = useIsAutoLoginEnabled();

    /* States */

    /* Event Handlers  */
    const handleSuccess = () => {
        dispatch(disableAutoLogin());
        authorize();
    }

    const handleFail = () => {
        window.localStorage.setItem("kakaoAccessToken", "");
        dispatch(disableAutoLogin());
    }

    /* Effects */

    /* 로컬 스토리지에 카카오 액세스 토큰이 남아 있을 경우 해당 정보를 이용해 로그인 */
    useEffect(() => {
        if (isAutoLoginEnabaled) {
            const kakaoAccessToken = window.localStorage.getItem("kakaoAccessToken");
            console.log(`[Page] useEffect\n\tkakaoAccessToken=${kakaoAccessToken}`);

            if (kakaoAccessToken) {
                dispatch(asyncKakaoLoginByAccessToken({ accessToken: kakaoAccessToken }));
            }
            else {
                dispatch(disableAutoLogin());
            }
        }
    }, [isAutoLoginEnabaled, dispatch]);

    /* Guest 접속 주소일 경우 주소의 id를 이용해 게스트로 로그인. */

    useEffect(() => {
        if ( guestId ) {
            console.log(`[Page] useEffect guestId=${guestId}`);
            dispatch(asyncGuestLogin(guestId));
        }
    }, [ guestId, dispatch ])
      

    return (
        <AppBarContextProvider>
            <ScrollRestoration
                getKey={(location, matches) => {
                    console.log(`[ScrollRestoration] ${location.pathname}`);
                    return location.pathname;
                }}
            />
            <AuthLoadRequiredContent
                isEnabled={isAutoLoginEnabaled}
                handleFail={handleFail}
                handleSuccess={handleSuccess}
                showHandleFailButton={false}
            >
                <AppBar />
                <Outlet />
            </AuthLoadRequiredContent>
        </AppBarContextProvider>
    );
}
export default Page;