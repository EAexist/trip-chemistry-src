/* React */
import { useState } from "react";

/* Externals */
import { Close, Done } from "@mui/icons-material";
import { Button, Dialog, Grid, Stack } from "@mui/material";
import { m } from 'framer-motion';
import { useDispatch } from "react-redux";
import LazyDomAnimation from "../../motion/LazyDomAnimation";

/* App */
import { Navigate, useLocation, useNavigate } from "~/router-module";
import { FADEIN, FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { authorize, setIsInitialized, useUserProfile } from "../../reducers/authReducer";
import { AppDispatch } from "../../store";
import { AuthLoadRequiredContent } from "../LoadRequiredContent";
import SetNicknamePage from "./SetNicknamePage";
import { IUserProfile } from "../../interfaces/IUserProfile";

function InitializeNicknameContent() {

    /* Hooks */
    const { state } = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    /* States */
    const [isConfirmCancelModalOpen, setIsConfirmCancelModalOpen] = useState(false);

    /* Reducers */
    const { id: userId, authProvider } = useUserProfile() as IUserProfile;

    /* Event Handlers */
    const handleClose = () => {
        setIsConfirmCancelModalOpen(true);
    }

    const handleCancelLogin = () => {
        navigate(`${((state !== null) && state.loginRedirectPath) ? state.loginRedirectPath : ""}`, { state: { navigateDirection: 'prev' } });
    }

    const handleCloseConfirmCancelModal = () => {
        setIsConfirmCancelModalOpen(false);
    }

    const handleSuccess = () => {
        // dispatch(asyncGetSampleProfiles());
        dispatch(setIsInitialized());
        dispatch(authorize());
        navigate(`${((state !== null) && state.loginRedirectPath)
            ? state.loginRedirectPath
            : "home"}${(authProvider === 'GUEST')
                ? `?guestId=${userId}`
                : ''
            }`);
    }

    return (
        /**Allow access by navigate( path, { state: {loginRedirectPath} }) only.
         *  Redirect access by URL to Homepage.
        */
        (state && state.loginRedirectPath)
            ?
            <AuthLoadRequiredContent
                handleSuccess={handleSuccess}
            >
                <SetNicknamePage
                    handleClose={handleClose}
                    doRequireInitialization={true}
                />
                <Dialog
                    fullScreen
                    open={isConfirmCancelModalOpen}
                    onClose={handleCancelLogin}
                >
                    <LazyDomAnimation>
                        <m.div {...FADEIN} className="page fill-window flex">
                            <div className='block--with-margin block__body block__body--large block--centered flex-grow'>
                                <h3 className='typography-heading'>
                                    {`닉네임을 설정 중이에요.\n취소하고 처음으로 돌아갈까요?`}
                                </h3>
                                <div>                                
                                    <Stack spacing={2}>
                                    <Button onClick={handleCloseConfirmCancelModal} startIcon={<Close />} variant="contained" sx={{ borderRadius: "24px" }}>
                                        로그인 계속하기
                                    </Button>
                                    <Button onClick={handleCancelLogin} startIcon={<Done />} variant="contained" color="gray" sx={{ borderRadius: "24px" }}>
                                        확인
                                    </Button>
                                </Stack>
                                </div>

                                {/* [Deprecated] Grid */}
                                {/* <Grid container columnSpacing={4}>
                                        <Grid item xs={6}>
                                            <Button onClick={handleCloseConfirmCancelModal} startIcon={<Close />}>
                                                로그인 계속하기
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6} display={"flex"} justifyContent={"center"} >
                                            <Button onClick={handleCancelLogin} startIcon={<Done />}>
                                                확인
                                            </Button>
                                        </Grid>
                                    </Grid> */}
                            </div>
                        </m.div>
                    </LazyDomAnimation>
                </Dialog>
            </AuthLoadRequiredContent>
            : <Navigate to={'/home'} />
    );
}
export default InitializeNicknameContent;