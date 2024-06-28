/* React */

/* Externals */
import { Edit, Help } from "@mui/icons-material";
import { Button, ButtonBase, Icon, IconButton, Toolbar } from "@mui/material";


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
import { asyncKakaoLogout, useUserProfile } from "../../reducers/authReducer";
import { useAppDispatch } from "../../store";
import { AuthLoadRequiredContent } from "../LoadRequiredContent";
import { KakaoLoginHelp } from "~/components/KakaoLoginHelp";

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

    return (
        <AuthLoadRequiredContent
            handleSuccess={handleLogoutSuccess}
        >
            <RoutedMotionPage className="flex fill-window">
                <MainAppBar />
                <Toolbar />
                <div className='flex-grow block--centered content'>
                    <div>
                        <ButtonBase onClick={handleClickAvatar}>
                            <UserAvatar sx={{ height: "128px", width: "128px" }} renderLabel={false} />
                        </ButtonBase>
                    </div>
                    <div>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                onClick={handleEdit}
                                disabled
                            >
                                <Icon />
                            </IconButton>
                            <p className="section-title ">{nickname}</p>
                            <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={handleEdit}
                            >
                                <Edit />
                            </IconButton>
                        </Toolbar>
                    </div>
                </div>
                <div className="wrapper content block--centered">
                    {
                        (AuthProvider[authProvider] === AuthProvider.GUEST)
                            ?
                            <>
                                {
                                    (AuthProvider[authProvider] === AuthProvider.GUEST)
                                    &&
                                    <KakaoLoginHelp/>
                                }
                                <div style={{ width: "100%" }}>
                                    <KakaoLoginButton sx={{ width: "100%" }} />
                                </div>
                            </>
                            :
                            <Button onClick={handleLogout} color="gray" variant="contained" className="main-action-button">
                                로그아웃
                            </Button>
                    }
                </div>
                <ConfirmDrawer
                    open={openConfirmDrawer}
                    onOpen={()=>setOpenConfirmDrawer(true)}
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