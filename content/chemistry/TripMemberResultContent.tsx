/* React */
import { SyntheticEvent, useState } from "react";

/* Externals */
import { AppBar, Chip, Container, Icon, Stack } from "@mui/material";
import { AnimatePresence, m } from "framer-motion";

/* App */
import { Height, QuestionMark } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import CharacterResultContent from "~/components/Profile/CharacterResultContent";
import HashTagResultContent from "~/components/Profile/HashTagResultContent";
import RecommendedCityList from "~/components/Profile/RecommendedCityList";
import withFriendProfile from "~/hocs/withFriendProfile";
import { IProfileId } from "~/interfaces/IProfile";
import { useAppSelector } from "~/store";
import { FADEIN, FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { useProfileIdList } from "../../reducers/chemistryReducer";
import ProfileToggleButtonGroup from "./component/ProfileToggleButtonGroup";
import ElevationScroll from "~/components/ElevationScroll";
import AnimatedIcon from "~/components/AnimatedIcon";

const FriendCharacterResultContent = withFriendProfile(CharacterResultContent);
const FriendHashTagResultContent = withFriendProfile(HashTagResultContent);
const FriendRecommendedCityList = withFriendProfile(RecommendedCityList);

function TripMemberResultContent() {

    /* CityDetailPage 에서 navigate 시 Restoration  */
    const { state } = useLocation();

    const profileIds = useProfileIdList(false);
    const [activeProfileId, setActiveProfileId] = useState<IProfileId | undefined>(state?.activeProfileId || profileIds[0]);

    const isAnswered = useAppSelector((state) =>
        state.chemistry.data.profiles[activeProfileId]?.testResult !== null
    );

    const nickname = useAppSelector((state) => (
        state.chemistry.data.profiles[activeProfileId]?.nickname
    ));

    /* Section */
    const [activeSection, setActiveSection] = useState(state?.activeSection || "type");

    return (
        <>
            <ElevationScroll>
                <AppBar sx={{ top: "96px", height: "fit-content" }}>
                    <Container className="column-padding-sm content content--dense" >
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
                                        variant={isAnswered && (activeSection === id) ? "filled" : "outlined"}
                                        onClick={() => setActiveSection(id)}
                                        disabled={!isAnswered}
                                    />
                                ))
                            }
                        </Stack>
                    </Container>
                </AppBar>
            </ElevationScroll>
            <div style={{ height: "132px" }} />
            <AnimatePresence mode={"wait"} initial={false}>
                <m.div key={`${activeProfileId}-${activeSection}`} {...{ ...FADEIN, exit: "hidden" }}>
                    <Container>
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
                                        <Container className="column-padding-sm">
                                            <FriendHashTagResultContent id={activeProfileId} />
                                        </Container>
                                    }
                                    {
                                        (activeSection === "city")
                                        &&
                                        <FriendRecommendedCityList id={activeProfileId} navigateState={{ activeProfileId, activeSection }} />
                                    }
                                </>
                                :
                                <div className="content block--centered" style={{ marginTop: "96px" }}>
                                    <AnimatedIcon
                                        name="question"
                                        width="64px"
                                        height="64px"
                                    />
                                    <p><b>{nickname}</b> 님은 아직 테스트를 완료하지 않았어요.</p>
                                </div>

                        }
                    </Container>
                </m.div>
            </AnimatePresence>
        </>
    );
}
export default TripMemberResultContent;