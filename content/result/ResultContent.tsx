/* React */
/* Externals */
import { Button, Toolbar } from "@mui/material";
import { m } from "framer-motion";
import { useSelector } from "react-redux";
import LazyDomAnimation from "../../motion/LazyDomAnimation";

import { CHARACTERS } from "~/common/app-const";
import AppBarBackground from "~/components/AppBar/AppBarBackground";
import { UserCharacterBody } from "~/components/Profile/CharacterBody";
import { UserProfileImage } from "~/components/Profile/ProfileImage";
import { UserTripTags } from "~/components/Profile/TripTags";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { FADEIN_FROMBOTTOM_VIEWPORT, FADEIN_VIEWPORT } from "../../motion/props";
import { RootState } from "../../store";
import { useStrings } from "../../texts";

function ResultContent() {

    const strings = useStrings().public.contents.result;

    const navigate = useNavigateWithGuestContext();

    /* Reducers */
    const character = useSelector((state: RootState) =>
        CHARACTERS[state.auth.data.profile.testResult.characterId]
    );

    /* Event Handlers */
    const handleChemistryButtonClick = () => {
        navigate('../myChemistry');
    }

    return (
        <div className="page fill-window flex content">
            <AppBarBackground />
            <Toolbar />
            <LazyDomAnimation>
                <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="content block--with-padding-x flex-grow">
                    {/* <SectionPaper> */}
                    <m.h5 className="typography-heading">{strings.sections.character.title}</m.h5>
                    <UserProfileImage />
                    <div className="content">
                        <h2 className="typography-label">{character.prefix} {character.name}</h2>
                        <UserCharacterBody />
                    </div>
                    <div className="content">
                        <h2 className="typography-label"># 여행 태그</h2>
                        <UserTripTags />
                    </div>
                </m.div>
                <m.div  {...FADEIN_VIEWPORT} className="flex">
                    <Button
                        onClick={handleChemistryButtonClick}
                        variant="contained"
                        className="block--with-padding block--with-margin block--with-margin--large"
                    >
                        {strings.navigateToChemistryButton}
                    </Button>
                </m.div>
            </LazyDomAnimation>
        </div>
    );
}
export default ResultContent;