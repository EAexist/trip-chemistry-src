/* React */
import { useState } from "react";

/* Externals */
import { AnimatePresence, m } from "framer-motion";

/* App */
import { Chip, Container, Icon, Stack } from "@mui/material";
import CharacterResultContent from "~/components/Profile/CharacterResultContent";
import HashTagResultContent from "~/components/Profile/HashTagResultContent";
import RecommendedCityList from "~/components/Profile/RecommendedCityList";
import withFriendProfile from "~/hocs/withFriendProfile";
import { IProfileId } from "~/interfaces/IProfile";
import { useAppSelector } from "~/store";
import { FADEIN, FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { useProfileIdList } from "../../reducers/chemistryReducer";
import ProfileToggleButtonGroup from "./component/ProfileToggleButtonGroup";
import { QuestionMark } from "@mui/icons-material";

const FriendCharacterResultContent = withFriendProfile(CharacterResultContent);
const FriendHashTagResultContent = withFriendProfile(HashTagResultContent);
const FriendRecommendedCityList = withFriendProfile(RecommendedCityList);

function MemberTestResultContent() {

    /* States */
    const profileIds = useProfileIdList(false);
    const [activeProfileId, setActiveProfileId] = useState<IProfileId | undefined>(profileIds[0]);

    const isAnswered = useAppSelector((state) =>
        state.chemistry.data.profiles[activeProfileId]?.testAnswer !== null
    );

    const nickname = useAppSelector((state) => (
        state.chemistry.data.profiles[activeProfileId]?.nickname
    ));

    /* Section */
    const [activeSection, setActiveSection] = useState("type");

    return (
        <>
            <Container className="column-padding column-padding-sm" sx={{ position: "sticky", top: "96px", zIndex: 100, backgroundColor: "white" }} style={{ paddingBottom: 0 }}>
                <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="content">
                    <ProfileToggleButtonGroup
                        activeProfileId={activeProfileId}
                        setActiveProfileId={setActiveProfileId}
                    />
                    <Stack>
                        {
                            [
                                {
                                    id: "type",
                                    label: "여행 타입",
                                    icon: "pets"
                                },
                                {
                                    id: "tag",
                                    label: "여행 태그",
                                    icon: "tag"
                                },
                                {
                                    id: "city",
                                    label: "추천 여행지",
                                    icon: "location_on"
                                },
                            ].map(({ id, label, icon }) => (
                                <Chip
                                    key={id}
                                    icon={<Icon>{icon}</Icon>}
                                    label={label}
                                    variant={(activeSection === id) ? "filled" : "outlined"}
                                    onClick={() => setActiveSection(id)}
                                    disabled={!isAnswered}
                                // color={(activeSection === id) ? "primary" : "default"}
                                />
                                // <Button
                                //     startIcon={<Icon>{icon}</Icon>}
                                //     variant={(activeSection === id) ? "contained" : "outlined"}
                                //     onClick={() => setActiveSection(id)}
                                //     sx={{ opacity: (activeSection === id) ? 1: 0.5, padding: "4px 12px" }}
                                // >
                                //     {label}
                                // </Button>
                            ))
                        }
                    </Stack>
                </m.div>
            </Container>
            <AnimatePresence mode={"wait"} initial={false}>
                <m.div key={`${activeProfileId}-${activeSection}`} {...{ ...FADEIN, exit: "hidden" }}>
                    <Container className="column-padding">
                        {
                            isAnswered ?
                                <>
                                    {
                                        (activeSection === "type")
                                        &&
                                        <FriendCharacterResultContent id={activeProfileId} />
                                    }
                                    {
                                        (activeSection === "tag")
                                        &&
                                        <Container sx={{ outline: "1px solid", borderRadius: "16px", outlineColor: "gray.dark" }} className="column-padding">
                                            <FriendHashTagResultContent id={activeProfileId} />
                                        </Container>
                                    }
                                    {
                                        (activeSection === "city")
                                        &&
                                        <FriendRecommendedCityList id={activeProfileId} />
                                    }
                                </>
                                :
                                <div className="content block--centered" style={{ marginTop: "24px" }}>
                                    <QuestionMark sx={{ fontSize: "24px" }} />
                                    <p><b>{nickname}</b> 님은 아직 테스틀 완료하지 않았어요.</p>
                                </div>

                        }
                    </Container>
                </m.div>
            </AnimatePresence>
        </>
    );
}
export default MemberTestResultContent;