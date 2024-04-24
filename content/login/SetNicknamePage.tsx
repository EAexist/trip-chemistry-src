/* React */
import { useCallback, useContext, useState } from "react";

/* Externals */
import { Done, NavigateBefore } from "@mui/icons-material";
import { Button, IconButton, Toolbar } from "@mui/material";

/* App */
import { useSelector } from "react-redux";
import { USER } from "../../common/app-const";
import RoutedMotionPage from "../../motion/components/RoutedMotionPage";
import AppBarContext, { useHideAppbar } from "../../components/AppBar/AppBarContext";
import useSetNickname from "../../hooks/useSetNickname";
import { useUserInfo } from "../../reducers/authReducer";
import { RootState } from "../../store";
import TextFieldBlock from "../../components/Block/TextFieldBlock";

interface SetNicknamePageProps {
    handleClose: () => void;
    doRequireInitialization?: boolean;
};

function SetNicknamePage({
    handleClose,
    doRequireInitialization
}: SetNicknamePageProps) {

    /* Hooks */
    const setNickname = useSetNickname();

    /* Reducers */
    const { nickname: currentNickname } = useUserInfo();
    const authProviderNickname = useSelector((state: RootState) => state.auth.data.profile.authProviderNickname)

    /* States */
    const [value, setValue] = useState(currentNickname ? currentNickname : (authProviderNickname ? authProviderNickname : ""));
    const { setShow: setShowAppBar } = useContext(AppBarContext);
    const isInputAllowed = value.length > 0

    /* Event Handlers */
    const handleConfirm = (value: string) => {
        setNickname(value);
    }
    const getIsConfirmAllowed = useCallback((value: string) => (
        !doRequireInitialization && (value === currentNickname)
    ), [doRequireInitialization, currentNickname]);

    const getIsValueAllowed = useCallback((value: string) => (
        value.length <= USER.maxNicknameLength
    ), [USER.maxNicknameLength]);

    const helperText = useCallback((value: string) => (
        `${value.length}/${USER.maxNicknameLength}`
    ), [USER.maxNicknameLength]);

    return (
        <RoutedMotionPage doHideAppbar={true}>
            <Toolbar className="block--with-margin-x">
                <IconButton
                    aria-label="cancel"
                    onClick={handleClose}
                    edge="start"
                >
                    <NavigateBefore />
                </IconButton>
                <Button
                    disabled={!isInputAllowed || getIsConfirmAllowed(value)}
                    onClick={() => handleConfirm(value)}
                    variant='text'
                    className=""
                    startIcon={<Done />}
                >
                    확인
                </Button>
            </Toolbar>
            <TextFieldBlock
                value={value}
                setValue={setValue}
                getIsValueAllowed={getIsValueAllowed}
                helperText={helperText}
                title={"사용할 이름을 입력해주세요."}
                className="block--with-margin-x"
            />
        </RoutedMotionPage>
    );
}
export default SetNicknamePage;