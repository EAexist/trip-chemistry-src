/* React */
/* Externals */
import { Button, Container, Toolbar } from "@mui/material";
import { m } from "framer-motion";


import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { FADEIN_FROMBOTTOM_VIEWPORT, FADEIN_VIEWPORT } from "../../motion/props";

import MainAppBar from "~/components/AppBar/MainAppBar";
import StartTestFab from "~/components/Button/StartTestFab";
import LazyImage from "~/components/LazyImage";
import TestResultBlock from "~/components/Profile/TestResultBlock";
import withUserProfile from "~/hocs/withUserProfile";
import { useHasAnsweredTest } from "~/reducers/authReducer";
import { useAppSelector } from "~/store";
import getImgSrc from "~/utils/getImgSrc";
import { useStrings } from "../../texts";

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
            <MainAppBar >
                <m.h1 {...FADEIN_VIEWPORT} className="section-title">{strings.sections.character.title}</m.h1>
            </MainAppBar>
            <Toolbar />
            <m.div {...FADEIN_FROMBOTTOM_VIEWPORT}>
                <Container className="content">
                    {
                        hasAnsweredTest
                            ?
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
                            :
                            <>
                                <LazyImage
                                    alt={"miss"}
                                    src={getImgSrc('/info', "MISS", { size: "xlarge" })}
                                    width={"256px"}
                                    height={"256px"}
                                    containerClassName="NoticeBlock__image"
                                />
                                <p>{`${nickname} 님은 어떤 여행 타입일까요?\n테스트를 완료하고 결과를 확인해보세요.`}</p>
                                <StartTestFab />
                            </>
                    }
                </Container>
            </m.div>
        </div>
    );
}
export default ResultContent;