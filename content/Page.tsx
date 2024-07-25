import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

import AppDrawer from "../components/Drawer/AppDrawer";
import LazyDomAnimation from "../motion/LazyDomAnimation";
import { Outlet, useNavigate, useSearchParams } from "~/router-module";
import { AuthLoadRequiredContent } from "./LoadRequiredContent";
import { asyncGuestLogin, asyncKakaoLoginByAccessToken, disableAutoLogin, useAuthorize, useIsAuthorized } from "../reducers/authReducer";
import { useAppDispatch, useAppSelector } from "../store";

interface DrawerContextProps {
    openDrawer: boolean,
    setOpenDrawer: Dispatch<SetStateAction<boolean>>
}
export const DrawerContext = createContext<DrawerContextProps>({} as DrawerContextProps)

function Page({ }) {

    /* Hooks */
    const dispatch = useAppDispatch();
    const authorize = useAuthorize();
    const [searchParams] = useSearchParams();
    const guestId = searchParams.get('guestId');
    const isAutoLoginEnabaled = useAppSelector((state) => state.auth.data.isAutoLoginEnabled);
    const navigate = useNavigate();

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
    const handleGuestLoginSuccess = () => {
        authorize();
    }

    const handleGuestLoginFail = () => {
        navigate('/')
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
    
    const doRequireInitialization = useAppSelector((state) => state.auth.data.doRequireInitialization);

    /* Guest 접속 주소일 경우 주소의 id를 이용해 게스트로 로그인. */
    useEffect(() => {
        if (!isAutoLoginEnabaled && !doRequireInitialization && ( guestId !== undefined )) {
            console.log(`[Page] useEffect guestId=${guestId}`);
            dispatch(asyncGuestLogin(guestId));
        }
    }, [isAutoLoginEnabaled, doRequireInitialization, guestId, dispatch])

    /* Drawer */
    const [openDrawer, setOpenDrawer] = useState(false);

    const isAuthorized = useIsAuthorized()

    return (
        <LazyDomAnimation>
            <AuthLoadRequiredContent
                isEnabled={isAutoLoginEnabaled}
                handleFail={handleFail}
                handleSuccess={handleSuccess}
                showHandleFailButton={false}
                showOnPending={true}
            >
            <AuthLoadRequiredContent
                isEnabled={(!isAutoLoginEnabaled) && (!isAuthorized)}
                handleFail={handleGuestLoginFail}
                handleSuccess={handleGuestLoginSuccess}
                showHandleFailButton={false}
                showOnPending={true}
            >
                <DrawerContext.Provider value={{ openDrawer, setOpenDrawer }}>
                    <AppDrawer
                        open={openDrawer}
                        onOpen={() => setOpenDrawer(true)}
                        onClose={() => setOpenDrawer(false)}
                        onDrawerItemClick={() => setOpenDrawer(false)}
                    />
                    <Outlet />
                </DrawerContext.Provider>
                </AuthLoadRequiredContent>
            </AuthLoadRequiredContent>
        </LazyDomAnimation>
    );
}
export default Page;