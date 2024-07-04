/* React */
import { useState } from "react";

/* Externals */


/* App */
import ConfirmDrawer from "~/components/ConfirmDrawer";
import { Navigate, useLocation, useNavigate } from "~/router-module";
import { IUserProfile } from "../../interfaces/IUserProfile";
import { authorize, setIsInitialized, useUserProfile } from "../../reducers/authReducer";
import { useAppDispatch } from "../../store";
import { AuthLoadRequiredContent } from "../LoadRequiredContent";
import SetNicknamePage from "./SetNicknamePage";

function InitializeNicknameContent() {

    /* Hooks */
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /* States */
    const [openConfirmDrawer, setOpenConfirmDrawer] = useState(false);

    /* Reducers */
    const { id: userId, authProvider } = useUserProfile() as IUserProfile;

    /* Event Handlers */
    const handleClose = () => {
        setOpenConfirmDrawer(true);
    }

    const handleCancelLogin = () => {
        navigate(`${((state !== null) && state.loginRedirectPath) ? state.loginRedirectPath : ""}`, { state: { navigateDirection: 'prev' } });
    }

    const handleContinueLogin = () => {
        setOpenConfirmDrawer(false);
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
        // (state && state.loginRedirectPath)
        true
            ?
            <AuthLoadRequiredContent
                handleSuccess={handleSuccess}
            >
                <SetNicknamePage
                    handleClose={handleClose}
                    doRequireInitialization={true}
                />
                <ConfirmDrawer
                    open={openConfirmDrawer}
                    onOpen={()=>setOpenConfirmDrawer(true)}
                    onClose={handleCancelLogin}
                    onCancel={handleContinueLogin}
                    onConfirm={handleCancelLogin}
                    title={`다음에 할까요?`}
                    body={`이름을 입력하면 바로 테스트를 시작할 수 있어요.\n취소하고 처음으로 돌아갈까요?`}
                    cancelButtonLabel={'로그인 계속하기'}
                    isConfirmDefault={false}
                />
            </AuthLoadRequiredContent>
            : <Navigate to={'/home'} />
    );
}
export default InitializeNicknameContent;