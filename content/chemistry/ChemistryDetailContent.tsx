/* React */

/* Externals */

/* App */
import { Box, Container, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useAppSelector } from "~/store";
import SectionPaper from "../../components/Paper/SectionPaper";
import LeadershipChemistryContent from "./LeadershipChemistryContent";
import MemberTestResultContent from "./MemberTestResultContent";
import RestaurantChemistryContent from "./RestaurantChemistryContent";
import ScheduleChemistryContent from "./ScheduleChemistryContent";

function ChemistryDetailContent() {

    /* Constants */
    const cityTypeRecommendationScoreThreshold = 4;

    const cityTypesSortedByScore = Object.entries(
        useAppSelector(state => state.chemistry.data.city)
    ).sort(([k1, v1], [k2, v2]) => (v2 - v1))

    const recommendedCityTypeEntries = cityTypesSortedByScore.filter(([k, v]) => v >= cityTypeRecommendationScoreThreshold)
    const notRecommendedCityTypeEntries = cityTypesSortedByScore.filter(([k, v]) => v < cityTypeRecommendationScoreThreshold)

    const [section, setSection] = useState<string>("type");

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };

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
                    <MemberTestResultContent />
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