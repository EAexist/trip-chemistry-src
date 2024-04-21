/* React */
import { useState } from "react";

/* Externals */
import { Close, Done } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { m } from 'framer-motion';
import { useDispatch } from "react-redux";
import LazyDomAnimation from "../../motion/LazyDomAnimation";

/* App */
import { Navigate, useLocation, useNavigate } from "@remix-run/react";
import { SLIDEINUPINVIEW } from "../../motion/props";
import { authorize, setIsInitialized, useUserProfile } from "../../reducers/authReducer";
import { AppDispatch } from "../../store";
import { AuthLoadRequiredContent } from "../LoadRequiredContent";
import SetNicknamePage from "./SetNicknamePage";
import { IUserProfile } from "../../interfaces/IUserProfile";

interface InitializeNicknameContentProps {
};

function InitializeNicknameContent({ }: InitializeNicknameContentProps) {

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
        /* Allow access by navigate( path, { state: {loginRedirectPath} }) only.
            Redirect access by URL to Homepage.
        */
        (state && state.loginRedirectPath)
            ?
        <AuthLoadRequiredContent
            handleSuccess={handleSuccess}
        >
            {
                // doRequireInitialization ?
                <>
                    {
                        isConfirmCancelModalOpen
                        &&
                        <LazyDomAnimation>
                            <m.div {...SLIDEINUPINVIEW} className="page fill-window flex">
                                <div className='block--with-margin-lg block__body--large block--centered flex-grow'>
                                    <h3 className='typography-label'>
                                        {`닉네임을 설정 중이에요.\n취소하고 처음으로 돌아갈까요?`}
                                    </h3>
                                    <Grid container columnSpacing={4}>
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
                                    </Grid>
                                </div>
                            </m.div>
                        </LazyDomAnimation>
                    }
                    <SetNicknamePage
                        handleClose={handleClose}
                        doRequireInitialization={true}
                    />
                </>
                // : <></>
            }
        </AuthLoadRequiredContent>
        : <Navigate to={'/home'} />
    );
}
export default InitializeNicknameContent;