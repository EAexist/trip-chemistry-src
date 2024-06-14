/* React */

/* Externals */
import { m } from "framer-motion";

/* App */
import { TEST } from "../../common/app-const";
import SectionPaper from "../../components/Paper/SectionPaper";
import { useStrings } from "../../texts";



import { FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { useAppSelector } from "~/store";

import CharacterChemistryContent from "./CharacterChemistryContent";
import CityChemistryContent from "./CityChemistryContent";
import LeadershipChemistryContent from "./LeadershipChemistryContent";
import RestaurantChemistryContent from "./RestaurantChemistryContent";
import ScheduleChemistryContent from "./ScheduleChemistryContent";

function ChemistryDetailContent() {

    /* Constants */
    const strings = useStrings().public.contents.chemistry;

    /* Reducers */
    const scoreSortedCityList =
        useAppSelector((state) =>
            Object.entries(state.chemistry.data.city)
                .sort(([k1, v1], [k2, v2]) => (v2 - v1))
                .map(([k, v])=> k )
        )

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
            <SectionPaper>
                <div className="content">
                <m.h2 {...FADEIN_FROMBOTTOM_VIEWPORT} className="typography-heading">어디로 떠나볼까?</m.h2>
                <ul className="content">
                    {
                        scoreSortedCityList && scoreSortedCityList.map((cityClass) => (
                            <m.li key={cityClass} {...FADEIN_FROMBOTTOM_VIEWPORT}>
                                <CityChemistryContent cityClass={cityClass as keyof typeof TEST.city.subTests} />
                            </m.li>
                        ))
                    }
                </ul>
                </div>
            </SectionPaper>
        </>
    );
}
export default ChemistryDetailContent;