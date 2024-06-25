/* React */
import { useCallback, useContext, useState } from "react";

/* Externals */
import { Done } from "@mui/icons-material";
import { AppBar, Button, Toolbar } from "@mui/material";

/* App */

import { USER } from "../../common/app-const";
import useSetNickname from "../../hooks/useSetNickname";
import RoutedMotionPage from "../../motion/components/RoutedMotionPage";
import { useUserProfile } from "../../reducers/authReducer";

import NavigateBeforeButton from "~/components/Button/NavigateBeforeButton";
import { useAppSelector } from "~/store";
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
    const { nickname: currentNickname } = useUserProfile();
    const authProviderNickname = useAppSelector((state) => state.auth.data.profile.authProviderNickname)

    /* States */
    const [value, setValue] = useState(currentNickname ? currentNickname : (authProviderNickname ? authProviderNickname : ""));
    const isInputAllowed = (value.length > 0)

    /* Event Handlers */
    const handleConfirm = (value: string) => {
        setNickname(value);
    }
    const getIsConfirmAllowed = useCallback((value: string) => (
        !doRequireInitialization && (value === currentNickname)
    ), [doRequireInitialization, currentNickname]);

    const getIsValueAllowed = useCallback((value: string) => (
        (value.length <= USER.maxNicknameLength) && !value.includes(' ')
    ), [USER.maxNicknameLength]);

    const helperText = useCallback((value: string) => (
        `${value.length}/${USER.maxNicknameLength}`
    ), [USER.maxNicknameLength]);

    return (
        <RoutedMotionPage >
            <AppBar>
                <Toolbar>
                    <NavigateBeforeButton onClick={handleClose} />
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
            </AppBar>
            <Toolbar />
            <div className="wrapper">
                <TextFieldBlock
                    value={value}
                    setValue={setValue}
                    getIsValueAllowed={getIsValueAllowed}
                    helperText={helperText}
                    title={"사용할 이름을 입력해주세요"}
                    note={
                        <div className="content content--narrow">
                            <p>- 최대 5글자까지 가능해요.</p>
                            <p>- 공백은 포함할 수 없어요.</p>
                        </div>
                    }
                />
            </div>
        </RoutedMotionPage>
    );
}
export default SetNicknamePage;