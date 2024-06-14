/* React */

/* Externals */
import { Edit, Help } from "@mui/icons-material";
import { Button, ButtonBase, Icon, IconButton, Stack, Toolbar } from "@mui/material";
import { useDispatch } from "react-redux";

/* App */
import UserAvatar from "../../components/Avatar/UserAvatar";
import KakaoLoginButton from "../../components/Button/KakaoLoginButton";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { IUserProfile } from "../../interfaces/IUserProfile";
import { AuthProvider } from "../../interfaces/enums/AuthProvider";
import RoutedMotionPage from "../../motion/components/RoutedMotionPage";
import { asyncKakaoLogout, useUserProfile } from "../../reducers/authReducer";
import { AppDispatch } from "../../store";
import { AuthLoadRequiredContent } from "../LoadRequiredContent";

function UserContent(){

    /* Hooks */
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigateWithGuestContext();

    /* Reducers */
    const { id, authProvider, nickname } = useUserProfile() as IUserProfile;

    /* Event Handlers */
    const handleClickAvatar = () => {
        // if (!hasAnsweredTest) {
        //     navigate('avatarGallery');
        // }
    };

    const handleLogout = () => {
        dispatch(asyncKakaoLogout(id));
    }

    const handleLogoutSuccess = () => {
        window.localStorage.setItem("kakaoAccessToken", "");
    }

    const handleEdit = () => {
        navigate('setNickname', { state: { navigateDirection: 'next' } });
    }


    return (
        <AuthLoadRequiredContent
            handleSuccess={handleLogoutSuccess}
        >
            <RoutedMotionPage className="flex fill-window">
                <Toolbar />
                <div className='flex-grow block--centered content content--large'>
                    <div>
                        <ButtonBase onClick={handleClickAvatar}>
                            <UserAvatar sx={{ height: "128px", width: "128px" }} renderLabel={false} />
                        </ButtonBase>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                onClick={handleEdit}
                                disabled
                            >
                                <Icon />
                            </IconButton>
                            {/* <div className="block--center"> */}
                            <p className="typography-heading  typography-heading--large">{nickname}</p>
                            {/* </div> */}
                            <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={handleEdit}
                            >
                                <Edit />
                            </IconButton>
                        </Toolbar>
                    </div>
                    <div>
                        <Stack direction={'column'}>
                            {
                                (AuthProvider[authProvider] === AuthProvider.GUEST)
                                    ?
                                    <KakaoLoginButton />
                                    :
                                    <Button onClick={handleLogout} variant="outlined">
                                        로그아웃
                                    </Button>
                            }
                        </Stack>
                    </div>
                </div>
                {
                    (AuthProvider[authProvider] === AuthProvider.GUEST)
                    &&
                    <div className="block--with-margin block--with-margin--large block--centered">
                        <p className="typography-note block--width-large">
                            <Help fontSize="inherit" />
                            {
                                "카카오 로그인을 이용하면\n링크를 잃어버려도 내 테스트 결과를 안전하게 불러올 수 있어요."
                            }
                        </p>
                    </div>
                }
            </RoutedMotionPage>
        </AuthLoadRequiredContent>
    );
}
export default UserContent;