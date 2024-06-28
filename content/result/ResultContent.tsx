/* React */
/* Externals */
import { Button, Toolbar } from "@mui/material";
import { m } from "framer-motion";


import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";

import MainAppBar from "~/components/AppBar/MainAppBar";
import TestResultBlock from "~/components/Profile/TestResultBlock";
import withUserProfile from "~/hocs/withUserProfile";
import { useAppSelector } from "~/store";
import getImgSrc from "~/utils/getImgSrc";
import { useStrings } from "../../texts";
import { useHasAnsweredTest } from "~/reducers/authReducer";
import NoticeBlock from "~/components/Block/NoticeBlock";

const UserTestResultBlock = withUserProfile(TestResultBlock);

function ResultContent() {

    /* Require Test Answer */

    const nickname = useAppSelector((state) => state.auth.data.profile.nickname)
    const hasAnsweredTest = useHasAnsweredTest();

    /* Event Handlers */
    const handleHasNotAnsweredTest = () => {
        navigate('test');
    }

    const strings = useStrings().public.contents.result;

    const navigate = useNavigateWithGuestContext();

    /* Reducers */
    const characterId = useAppSelector(state =>
        state.auth.data.profile.testResult?.characterId
    );

    /* Event Handlers */
    const handleChemistryButtonClick = () => {
        navigate('../myChemistry');
    }

    return (
        <div className="page fill-window">
            <MainAppBar />
            <Toolbar />
            <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="wrapper content">
                <m.h2 className="section-title">{strings.sections.character.title}</m.h2>
                {
                    hasAnsweredTest
                    &&
                    <>
                        <div className="block--centered">
                            <img
                                src={getImgSrc('/character', characterId, { size: "large" })}
                                alt={characterId}
                                className="title-image"
                                style={{ marginBottom: "-16px" }}
                            />
                        </div>
                        <UserTestResultBlock />
                        <Button
                            onClick={handleChemistryButtonClick}
                            variant="contained"
                            className="main-action-button"
                        >
                            {strings.navigateToChemistryButton}
                        </Button>
                    </>
                }
            </m.div>
            {
                !hasAnsweredTest
                &&
                <NoticeBlock
                    alt={"miss"}
                    src={getImgSrc('/info', "MISS", { size: "xlarge" })}
                    body={`${nickname} 님은 어떤 여행 타입일까요?\n테스트를 완료하고 결과를 확인해보세요.`}
                    buttonText={"테스트 시작하기"}
                    onClick={handleHasNotAnsweredTest}
                    isFullscreen={false}
                />
            }
        </div>
    );
}
export default ResultContent;