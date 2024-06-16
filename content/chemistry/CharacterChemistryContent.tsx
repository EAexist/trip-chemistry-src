/* React */
import { useState } from "react";

/* Externals */
import { AnimatePresence, m } from "framer-motion";


/* App */
import { CHARACTERS } from "~/common/app-const";
import CharacterBody from "~/components/Profile/CharacterBody";
import TripTags from "~/components/Profile/TripTags";
import { IProfileId } from "~/interfaces/IProfile";
import { FADEIN, FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { useProfileIdList } from "../../reducers/chemistryReducer";

import ProfileToggleButtonGroup from "./component/ProfileToggleButtonGroup";
import { QuestionMark } from "@mui/icons-material";
import { useAppSelector } from "~/store";

function CharacterChemistryContent() {

    /* States */
    const profileIds = useProfileIdList(false);
    const [activeProfileId, setActiveProfileId] = useState<IProfileId | undefined>(profileIds[0]);

    const isAnswered = useAppSelector((state) =>
        state.chemistry.data.profiles[activeProfileId]?.testAnswer !== null
    );
    const { characterId, nickname } = useAppSelector((state) => ({
        characterId: state.chemistry.data.profiles[activeProfileId]?.testResult?.characterId,
        nickname: state.chemistry.data.profiles[activeProfileId]?.nickname
    }));

    const character = CHARACTERS[characterId]

    return (
        <>
            <div className="content">
                <m.h2 {...FADEIN_FROMBOTTOM_VIEWPORT} className="typography-heading">여행 타입</m.h2>
                <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} >
                    <ProfileToggleButtonGroup
                        activeProfileId={activeProfileId}
                        setActiveProfileId={setActiveProfileId}
                    />
                    {/* <Stack spacing={-0.25} justifyContent={'center'} alignItems={'start'}>
                        {
                            profileIds.map((id, index) => (
                                <ToggleButton
                                    key={id}
                                    value={index}
                                    onChange={(_, value) => setCharacterSectionActiveUserIndex(value)}
                                    selected={characterSectionActiveUserIndex === index}
                                    className="toggle-button--button-base"
                                >
                                    <FriendAvatar key={id} id={id} labelSize="large" sx={(characterSectionActiveUserIndex === index) ? { width: 56, height: 56 } : {}} />
                                </ToggleButton>
                            ))
                        }
                    </Stack> */}
                </m.div>
                <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} >
                    <AnimatePresence mode={"wait"} initial={false}>
                        <m.div key={activeProfileId} {...{ ...FADEIN, exit: "hidden" }} className="content content--large">
                            {
                                isAnswered
                                    ?
                                    <>
                                        <div className="content">
                                            <h2 className="typography-label">{character.prefix} {character.name}</h2>
                                            <CharacterBody id={activeProfileId} />
                                        </div>
                                        <div className="content">
                                            <h2 className="typography-label"># 여행 태그</h2>
                                            <TripTags id={activeProfileId} />
                                        </div>
                                    </>
                                    :
                                    <div className="content">
                                        <div className="block--centered">
                                            <QuestionMark />
                                        </div>
                                        <p><b>{nickname}</b> 님은 어떤 타입일까요?</p>
                                        <p>궁금하다면 <b>{nickname}</b> 님이 테스트를 완료할 수 있게 도와주세요.</p>
                                    </div>
                            }
                        </m.div>
                    </AnimatePresence>
                </m.div>
            </div>
        </>
    );
}
export default CharacterChemistryContent;