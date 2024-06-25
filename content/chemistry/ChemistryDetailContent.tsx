/* React */

/* Externals */
import { m } from "framer-motion";

/* App */
import { TEST } from "../../common/app-const";
import SectionPaper from "../../components/Paper/SectionPaper";
import { useStrings } from "../../texts";



import { useAppSelector } from "~/store";
import { FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";

import { QuestionMark } from "@mui/icons-material";
import CharacterChemistryContent from "./CharacterChemistryContent";
import CityChemistryContent from "./CityChemistryContent";
import LeadershipChemistryContent from "./LeadershipChemistryContent";
import RestaurantChemistryContent from "./RestaurantChemistryContent";
import ScheduleChemistryContent from "./ScheduleChemistryContent";

function ChemistryDetailContent() {

    /* Constants */
    const strings = useStrings().public.contents.chemistry;

    const cityTypeRecommendationScoreThreshold = 4;

    /* Reducers */
    const sortedCityTypes = useAppSelector((state) =>
        Object.entries(state.chemistry.data.city)
            .sort(([k1, v1], [k2, v2]) => (v2 - v1))
    )

    const recommendedCityTypeEntries = sortedCityTypes.filter(([k, v]) => v >= cityTypeRecommendationScoreThreshold)
    const notRecommendedCityTypeEntries = sortedCityTypes.filter(([k, v]) => v < cityTypeRecommendationScoreThreshold)

    return (
        <>
            <SectionPaper>
                <CharacterChemistryContent />
            </SectionPaper>
            <SectionPaper>
                <LeadershipChemistryContent />
            </SectionPaper>
            <SectionPaper>
                <ScheduleChemistryContent />
            </SectionPaper>
            <SectionPaper>
                <RestaurantChemistryContent />
            </SectionPaper>
            <section className="wrapper content">
                <m.h2 {...FADEIN_FROMBOTTOM_VIEWPORT} className="typography-heading">추천 여행지</m.h2>
                {
                    recommendedCityTypeEntries.length > 0 ?
                        <ul className="content">
                            {
                                sortedCityTypes.filter(([k, v]) => v >= cityTypeRecommendationScoreThreshold).map(([cityType]) => (
                                    <m.li key={cityType} {...FADEIN_FROMBOTTOM_VIEWPORT}>
                                        <CityChemistryContent cityType={cityType as keyof typeof TEST.city.subTests} />
                                    </m.li>
                                ))
                            }
                        </ul>
                        :
                        <>
                            <div className="block--centered">
                                <QuestionMark />
                            </div>
                            <p>{"모두가 만족하는 여행지를 찾지 못했어요."}</p>
                            <p>{"다음 <이런 곳도 있어>에서 여행지에 대한 친구들의 선호도를 확인할 수 있어요. 참고해서 여행지에 대해 이야기를 나눠보세요."}</p>
                        </>
                }
            </section>
            <section className="wrapper content">
                {
                    notRecommendedCityTypeEntries.length > 0 &&
                    <>
                        <m.h2 {...FADEIN_FROMBOTTOM_VIEWPORT} className="typography-heading">이런 곳도 있어</m.h2>
                        <ul className="content">
                            {
                                sortedCityTypes.filter(([k, v]) => v < cityTypeRecommendationScoreThreshold).map(([cityType]) => (
                                    <m.li key={cityType} {...FADEIN_FROMBOTTOM_VIEWPORT}>
                                        <CityChemistryContent cityType={cityType as keyof typeof TEST.city.subTests} />
                                    </m.li>
                                ))
                            }
                        </ul>
                    </>
                }
            </section>
        </>
    );
}
export default ChemistryDetailContent;