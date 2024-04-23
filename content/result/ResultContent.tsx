/* React */
/* Externals */
import { Button, Toolbar } from "@mui/material";
import { m } from "framer-motion";
import { useSelector } from "react-redux";
import LazyDomAnimation from "../../motion/LazyDomAnimation";

import { UserTestResultBlock } from "../../components/Profile/TestResultBlock";
import { FADEIN_VIEWPORT } from "../../motion/props";
import { RootState } from "../../store";
import { useStrings } from "../../texts";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";

function ResultContent() {

    const strings = useStrings().public.contents.result;

    const navigate = useNavigateWithGuestContext();

    /* Reducers */
    const character = useSelector((state: RootState) =>
        state.auth.data.profile.testResult.tripCharacter
    );

    /* Event Handlers */
    const handleChemistryButtonClick = () => {
        navigate('../myChemistry');
    }
    return (
        <div className="page fill-window flex">
            <Toolbar />
            <LazyDomAnimation>
                <m.div  {...FADEIN_VIEWPORT} className="block__body--large block--with-padding-x flex-grow">
                    {/* <SectionPaper className="body__head"> */}
                    <m.h5 className="typography-heading">{strings.sections.tripCharacter.title}</m.h5>
                    <div style={{ marginTop: '-1rem' }}>
                        <UserTestResultBlock />
                    </div>
                    {
                        character.body.split("\n").map((text) =>
                            <p key={text}>{text}</p>
                        )
                    }
                </m.div>       
                <m.div  {...FADEIN_VIEWPORT} className="block--with-padding flex">
                    <Button
                        onClick={handleChemistryButtonClick}
                        variant="contained"
                        className="button--full"
                    >
                        {strings.navigateToChemistryButton}
                    </Button>
                </m.div>     
            </LazyDomAnimation>
        </div>
    );
}
export default ResultContent;