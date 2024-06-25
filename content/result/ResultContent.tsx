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

const UserTestResultBlock = withUserProfile(TestResultBlock);

function ResultContent() {

    const strings = useStrings().public.contents.result;

    const navigate = useNavigateWithGuestContext();

    /* Reducers */
    const characterId = useAppSelector((state) =>
        state.auth.data.profile.testResult.characterId
    );

    /* Event Handlers */
    const handleChemistryButtonClick = () => {
        navigate('../myChemistry');
    }

    return (
        <div className="page fill-window">
            <MainAppBar/>
            <Toolbar />
                <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="wrapper content">
                    <m.h2 className="typography-heading">{strings.sections.character.title}</m.h2>
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
                </m.div>
        </div>
    );
}
export default ResultContent;