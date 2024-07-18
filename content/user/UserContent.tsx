/* React */

/* Externals */
import { Edit, Help } from "@mui/icons-material";
import { Button, ButtonBase, Container, Icon, IconButton, Stack, Toolbar } from "@mui/material";
import { m } from "framer-motion"

/* App */
import { useState } from "react";
import MainAppBar from "~/components/AppBar/MainAppBar";
import ConfirmDrawer from "~/components/ConfirmDrawer";
import UserAvatar from "../../components/Avatar/UserAvatar";
import KakaoLoginButton from "../../components/Button/KakaoLoginButton";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { IUserProfile } from "../../interfaces/IUserProfile";
import { AuthProvider } from "../../interfaces/enums/AuthProvider";
import RoutedMotionPage from "../../motion/components/RoutedMotionPage";
import { asyncKakaoLogout, useHasAnsweredTest, useUserProfile } from "../../reducers/authReducer";
import { useAppDispatch } from "../../store";
import { AuthLoadRequiredContent } from "../LoadRequiredContent";
import { KakaoLoginHelp } from "~/components/KakaoLoginHelp";
import { FADEIN_VIEWPORT } from "~/motion/props";

function UserContent() {

    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigateWithGuestContext();

    /* Reducers */
    const { id, authProvider, nickname } = useUserProfile() as IUserProfile;

    /* Event Handlers */
    const handleClickAvatar = () => {
        // if (!hasAnsweredTest) {
        //     navigate('avatarGallery');
        // }
    };

    const handleEdit = () => {
        navigate('setNickname', { state: { navigateDirection: 'next' } });
    }

    /* ConfirmDrawer */
    const [openConfirmDrawer, setOpenConfirmDrawer] = useState(false);

    const handleLogout = () => {
        setOpenConfirmDrawer(true);
    }

    const handleCancelLogout = () => {
        setOpenConfirmDrawer(false);
    }

    const handleConfirmLogout = () => {
        dispatch(asyncKakaoLogout(id));
    }

    const handleLogoutSuccess = () => {
        window.localStorage.setItem("kakaoAccessToken", "");
    }

    const hasAnsweredTest = useHasAnsweredTest()

    const handleStartTest = () => {
        navigate('/test');
    }
    return (
        <AuthLoadRequiredContent
            handleSuccess={handleLogoutSuccess}
        >
            <RoutedMotionPage className="flex fill-window">
                <MainAppBar>
                    <m.h1 {...FADEIN_VIEWPORT} className="section-title">
                        내 프로필
                    </m.h1>
                </MainAppBar>
                <Toolbar />
                <Container className="flex-grow gutter-xl column-padding" sx={{ display: "flex", flexDirection: "column" }}>
                    <div className='flex-grow content block--centered'>
                        <div>
                            {/* <ButtonBase onClick={handleClickAvatar}> */}
                                <UserAvatar sx={{ height: "128px", width: "128px" }} renderLabel={false} />
                            {/* </ButtonBase> */}
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    aria-label="placeholder"
                                    disabled
                                >
                                    <Icon />
                                </IconButton>
                                <p className="section-title">{nickname}</p>
                                <IconButton
                                    edge="end"
                                    aria-label="edit username"
                                    onClick={handleEdit}
                                >
                                    <Edit />
                                </IconButton>
                            </Toolbar>
                        </div>
                        {
                            !hasAnsweredTest &&
                            <Button
                                onClick={handleStartTest}
                                variant="contained"
                                sx={{ width: "100%", height: '45px', borderRadius: "6px" }}
                            >
                                테스트 시작하기
                            </Button>
                        }
                        {
                            (AuthProvider[authProvider] === AuthProvider.GUEST)
                                ?
                                <KakaoLoginButton />
                                :
                                <Button onClick={handleLogout} color="gray" variant="contained" className="main-action-button" sx={{ height: '45px', borderRadius: "6px" }}>
                                    로그아웃
                                </Button>
                        }
                    </div>
                    {
                        (AuthProvider[authProvider] === AuthProvider.GUEST)
                        &&
                        <KakaoLoginHelp />
                    }
                </Container>
                <ConfirmDrawer
                    open={openConfirmDrawer}
                    onOpen={() => setOpenConfirmDrawer(true)}
                    onClose={handleCancelLogout}
                    onCancel={handleCancelLogout}
                    onConfirm={handleConfirmLogout}
                    title={`로그아웃 할까요?`}
                    body={`로그아웃하면 다시 로그인하기 전까지\n테스트 결과와 여행들을 확인할 수 없어요.`}
                    cancelButtonLabel={'로그인 유지하기'}
                    isConfirmDefault={false}
                />
            </RoutedMotionPage>
        </AuthLoadRequiredContent>
    );
}
export default UserContent;