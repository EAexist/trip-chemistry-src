/* React */
import { useState } from "react";

/* Externals */
import { QuestionMark } from "@mui/icons-material";
import { AnimatePresence, m } from "framer-motion";

/* App */
import { IProfileId } from "~/interfaces/IProfile";
import { FADEIN, FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { useProfileIdList } from "../../reducers/chemistryReducer";
import TestResultBlock from "~/components/Profile/TestResultBlock";
import withFriendProfile from "~/hocs/withFriendProfile";
import { useAppSelector } from "~/store";
import ProfileToggleButtonGroup from "./component/ProfileToggleButtonGroup";

const FriendTestResultBlock = withFriendProfile(TestResultBlock);

function CharacterChemistryContent() {

    /* States */
    const profileIds = useProfileIdList(false);
    const [activeProfileId, setActiveProfileId] = useState<IProfileId | undefined>(profileIds[0]);

    const isAnswered = useAppSelector((state) =>
        state.chemistry.data.profiles[activeProfileId]?.testAnswer !== null
    );

    const nickname= useAppSelector((state) => (
        state.chemistry.data.profiles[activeProfileId]?.nickname
    ));

    return (
        <div className="content">
            <m.h2 {...FADEIN_FROMBOTTOM_VIEWPORT} className="typography-heading">여행 타입</m.h2>
            <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} >
                <ProfileToggleButtonGroup
                    activeProfileId={activeProfileId}
                    setActiveProfileId={setActiveProfileId}
                />
            </m.div>
            <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} >
                <AnimatePresence mode={"wait"} initial={false}>
                    <m.div key={activeProfileId} {...{ ...FADEIN, exit: "hidden" }} className="content content--sparse">
                        {
                            isAnswered
                                ?
                                <FriendTestResultBlock id={activeProfileId} />
                                :
                                <div className="content">
                                    <div className="">
                                        <QuestionMark sx={{ fontSize: "24px" }} />
                                    </div>
                                    <p><b>{nickname}</b> 님은 어떤 타입일까요?</p>
                                    <p>궁금하다면 <b>{nickname}</b> 님이 테스트를 완료할 수 있게 도와주세요.</p>
                                </div>
                        }
                    </m.div>
                </AnimatePresence>
            </m.div>
        </div>
    );
}
export default CharacterChemistryContent;