/* React */
import { SyntheticEvent, useState } from "react";

/* Externals */
import { Box, Container, Tab, Tabs, Chip,Icon, Stack } from "@mui/material";
import { AnimatePresence, m } from "framer-motion";

/* App */
import { useAppSelector } from "~/store";
import SectionPaper from "../../components/Paper/SectionPaper";
import LeadershipChemistryContent from "./LeadershipChemistryContent";
import MemberTestResultContent from "./MemberTestResultContent";
import RestaurantChemistryContent from "./RestaurantChemistryContent";
import ScheduleChemistryContent from "./ScheduleChemistryContent";
import CharacterResultContent from "~/components/Profile/CharacterResultContent";
import HashTagResultContent from "~/components/Profile/HashTagResultContent";
import RecommendedCityList from "~/components/Profile/RecommendedCityList";
import withFriendProfile from "~/hocs/withFriendProfile";
import { IProfileId } from "~/interfaces/IProfile";
import { FADEIN, FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { useProfileIdList } from "../../reducers/chemistryReducer";
import ProfileToggleButtonGroup from "./component/ProfileToggleButtonGroup";
import { QuestionMark } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const FriendCharacterResultContent = withFriendProfile(CharacterResultContent);
const FriendHashTagResultContent = withFriendProfile(HashTagResultContent);
const FriendRecommendedCityList = withFriendProfile(RecommendedCityList);

function ChemistryDetailContent() {

    /* CityDetailPage 에서 navigate 시 Restoration  */
    const { state } = useLocation();

    const [section, setSection] = useState<string>( state?.section || "type");

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };

    const profileIds = useProfileIdList(false);
    const [activeProfileId, setActiveProfileId] = useState<IProfileId | undefined>( state?.activeProfileId || profileIds[0]);

    const isAnswered = useAppSelector((state) =>
        state.chemistry.data.profiles[activeProfileId]?.testAnswer !== null
    );

    const nickname = useAppSelector((state) => (
        state.chemistry.data.profiles[activeProfileId]?.nickname
    ));

    /* Section */
    const [activeSection, setActiveSection] = useState( state?.activeSection || "type");

    return (
        <div className="fill-body">
            <Container sx={{ position: "sticky", top: "48px", backgroundColor: "white", zIndex: 100 }}>
                <Tabs
                    value={section}
                    onChange={handleChange}
                    variant="fullWidth"
                    aria-label="restaurant chemistry section"
                >
                    <Tab label="여행 타입" value={"type"} />
                    <Tab label="함께 여행하기" value={"chemistry"} />
                </Tabs>
            </Container>
            {
                (section === "type")
                &&
                // <Container className="column-padding">
                <>
            <Container className="column-padding column-padding-sm" sx={{ position: "sticky", top: "96px", zIndex: 100, backgroundColor: "white" }} style={{ paddingBottom: 0 }}>
            <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} initial={state?.activeProfileId ? "visible" :"hidden"} className="content">
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
                            />
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
                                    <FriendRecommendedCityList id={activeProfileId} navigateState={{ activeProfileId, activeSection }}/>
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
                    // <MemberTestResultContent />
                // </Container>
            }
            {
                (section === "chemistry")
                &&
                <Box className="content" sx={{ backgroundColor: "gray.main"}}>
                    <SectionPaper>
                        <LeadershipChemistryContent />
                    </SectionPaper>
                    <SectionPaper>
                        <ScheduleChemistryContent />
                    </SectionPaper>
                    <SectionPaper>
                        <RestaurantChemistryContent />
                    </SectionPaper>
                </Box>
            }
            {/* <Modal  
                open={openCityPageModal}
                onClose={() => setOpenCityPageModal(false)}
            >
                <Outlet />
            </Modal> */}
            {/* <Container component={"section"} className="column-padding content">
                    <div className="section-header">
                        <h2 className="section-title">추천 여행지</h2>
                    </div>
                    {
                        recommendedCityTypeEntries.length > 0 ?
                            <div className="content">
                                {
                                    cityTypesSortedByScore.filter(([k, v]) => v >= cityTypeRecommendationScoreThreshold).map(([cityType]) => (
                                        <m.section key={cityType} {...FADEIN_FROMBOTTOM_VIEWPORT}>
                                            <CityChemistryContent cityType={cityType as keyof typeof TEST.city.subTests} />
                                        </m.section>
                                    ))
                                }
                            </div>
                            :
                            <>
                                <div className="block--centered">
                                    <QuestionMark />
                                </div>
                                <p>{"모두가 만족하는 여행지를 찾지 못했어요."}</p>
                                <p>{"다음 <이런 곳도 있어>에서 다른 여행지들에 대한 친구들의 선호도를 확인할 수 있어요."}</p>
                            </>
                    }
                </Container>
                {
                    notRecommendedCityTypeEntries.length > 0 &&
                    <Container component={"section"} className="column-padding content">
                        <div className="section-header">
                            <h2 className="section-title">이런 곳도 있어</h2>
                        </div>
                        <div className="content content--sparse">
                            {
                                cityTypesSortedByScore.filter(([k, v]) => v < cityTypeRecommendationScoreThreshold).map(([cityType]) => (
                                    <m.section key={cityType} {...FADEIN_FROMBOTTOM_VIEWPORT}>
                                        <CityChemistryContent cityType={cityType as keyof typeof TEST.city.subTests} />
                                    </m.section>
                                ))
                            }
                        </div>
                    </Container>
                }*/}
        </div>
    );
}
export default ChemistryDetailContent;