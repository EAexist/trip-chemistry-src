/* React */
import { useEffect, useState } from "react";

/* Externals */

/* App */
import ConfirmDrawer from "../../components/ConfirmDrawer";
import { Navigate, useLocation, useNavigate } from "~/router-module";
import { IUserProfile } from "../../interfaces/IUserProfile";
import { authorize, setIsInitialized, useAuthLoadStatus, useUserProfile } from "../../reducers/authReducer";
import { useAppDispatch, useAppSelector } from "../../store";
import { AuthLoadRequiredContent } from "../LoadRequiredContent";
import SetNicknamePage from "./SetNicknamePage";
import { LoadStatus } from "~/src/interfaces/enums/LoadStatus";

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
        navigate(`/login`, { state: { navigateDirection: 'prev' } });
    }

    const handleContinueLogin = () => {
        setOpenConfirmDrawer(false);
    }

    const handleSuccess = () => {
        dispatch(authorize());
        navigate(`/user?guestId=${userId}`);
    }

    useEffect(() => {
        if (!(state && state.isAccessValid)) {
            navigate('/login')
        }
    }, [])
    

    const [ isEnabaled, setIsEnabled ] = useState(false)
    const doRequireInitialization = useAppSelector((state) => state.auth.data.doRequireInitialization);
    const [ authLoadStatus ] = useAuthLoadStatus();

    useEffect(() => {
        if ( doRequireInitialization == false ) {
            dispatch(authorize());
            navigate(`/user?guestId=${userId}`);
        }
    }, [ doRequireInitialization ])

    useEffect(() => {
        if ( authLoadStatus===LoadStatus.REST && doRequireInitialization ) {
            setIsEnabled(true)
        }
    }, [ authLoadStatus, doRequireInitialization ])

    return (
        /**Allow access by navigate( path, { state: {loginRedirectPath} }) only.
         *  Redirect access by URL to Homepage.
        */
        <AuthLoadRequiredContent
            handleSuccess={handleSuccess}
            isEnabled={isEnabaled}
        >
            <SetNicknamePage
                handleClose={handleClose}
                doRequireInitialization={true}
            />
            <ConfirmDrawer
                open={openConfirmDrawer}
                onOpen={() => setOpenConfirmDrawer(true)}
                onClose={handleCancelLogin}
                onCancel={handleContinueLogin}
                onConfirm={handleCancelLogin}
                title={`다음에 할까요?`}
                body={`이름을 입력하면 바로 테스트를 시작할 수 있어요.\n취소하고 처음으로 돌아갈까요?`}
                cancelButtonLabel={'로그인 계속하기'}
                isConfirmDefault={false}
            />
        </AuthLoadRequiredContent>
    );
}
export default InitializeNicknameContent;