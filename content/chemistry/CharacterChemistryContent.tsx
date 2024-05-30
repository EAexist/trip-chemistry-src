/* React */
import { useState } from "react";

/* Externals */
import { AnimatePresence, m } from "framer-motion";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";

/* App */
import { useStrings } from "../../texts";

import FriendAvatar from "../../components/Avatar/FriendAvatar";
import NavigationButton from "../../components/Button/NavigationButton";
import ToggleButton from "../../components/Button/ToggleButton";
import TestResultBlock from "../../components/Profile/TestResultBlock";
import { FADEIN, FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { useProfileIdList } from "../../reducers/chemistryReducer";
import { RootState } from "../../store";

function CharacterChemistryContent() {

    /* Constants */
    const strings = useStrings().public.contents.chemistry;

    /* States */
    const [characterSectionActiveUserIndex, setCharacterSectionActiveUserIndex] = useState<number>(0);

    /* Reducers */
    const answeredProfileIdList = useProfileIdList();

    const characterSectionCharacter = useSelector((state: RootState) =>
        state.chemistry.data.profileList[answeredProfileIdList[characterSectionActiveUserIndex]]?.testResult.tripCharacter
    );

    return (
        <>
            <m.h2 {...FADEIN_FROMBOTTOM_VIEWPORT} className="typography-heading">{strings.sections.tripCharacter.title}</m.h2>
            <div className="block__body">
                <CharacterChemistryContent />
                <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} >
                    <Stack spacing={-0.25} justifyContent={'center'} alignItems={'start'}>
                        {
                            answeredProfileIdList.map((id, index) => (
                                <ToggleButton
                                    key={id}
                                    value={index}
                                    onChange={(_, value) => setCharacterSectionActiveUserIndex(value)}
                                    selected={characterSectionActiveUserIndex === index}
                                    className="toggle-button--button-base"
                                >
                                    <FriendAvatar key={id} id={id} labelSize="large" />
                                </ToggleButton>
                            ))
                        }
                    </Stack>
                </m.div>
                <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} >
                    <AnimatePresence mode={"wait"} initial={false}>
                        <m.div key={characterSectionActiveUserIndex} {...{ ...FADEIN, exit: "hidden" }} className="navigation-button__container">
                            <TestResultBlock key={characterSectionActiveUserIndex} id={answeredProfileIdList[characterSectionActiveUserIndex]} />
                            {
                                (characterSectionActiveUserIndex > 0) &&
                                <NavigationButton navigateTo="prev" onClick={() => setCharacterSectionActiveUserIndex((prev) => prev > 0 ? prev - 1 : prev)} />
                            }
                            {
                                (characterSectionActiveUserIndex < answeredProfileIdList.length - 1) &&
                                <NavigationButton navigateTo="next" onClick={() => setCharacterSectionActiveUserIndex((prev) => prev < answeredProfileIdList.length - 1 ? prev + 1 : prev)} />
                            }
                        </m.div>
                    </AnimatePresence>
                </m.div>
                <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} >
                    <AnimatePresence mode={"wait"} initial={false}>
                        <m.p key={characterSectionActiveUserIndex} {...{ ...FADEIN, exit: "hidden" }} custom={0.5}>
                            {characterSectionCharacter?.body}
                        </m.p>
                    </AnimatePresence>
                </m.div>
            </div>
        </>
    );
}
export default CharacterChemistryContent;