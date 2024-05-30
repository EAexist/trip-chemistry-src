/* React */

/* Externals */
import { m } from "framer-motion";

/* App */
import { TEST } from "../../common/app-const";
import SectionPaper from "../../components/Paper/SectionPaper";
import { useStrings } from "../../texts";

import { FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { useSortedCityList } from "../../reducers/chemistryReducer";
import CharacterChemistryContent from "./CharacterChemistryContent";
import CityChemistryContent from "./CityChemistryContent";
import FoodBudgetChemistryContent from "./FoodBudgetChemistryContent";
import LeadershipChemistryContent from "./LeadershipChemistryContent";
import ScheduleChemistryContent from "./ScheduleChemistryContent";

function ChemistryDetailContent() {

    /* Constants */
    const strings = useStrings().public.contents.chemistry;

    /* Reducers */
    const sortedCityList = useSortedCityList();

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
                <FoodBudgetChemistryContent />
            </SectionPaper>
            <SectionPaper>
                <m.h2 {...FADEIN_FROMBOTTOM_VIEWPORT} className="typography-heading">{strings.sections.city.title}</m.h2>
                <ul className="block__body">
                    {
                        sortedCityList && sortedCityList.map((cityClass) => (
                            <m.li key={cityClass} {...FADEIN_FROMBOTTOM_VIEWPORT}>
                                <CityChemistryContent cityClass={cityClass as keyof typeof TEST.city.subTests} />
                            </m.li>
                        ))
                    }
                </ul>
            </SectionPaper>
        </>
    );
}
export default ChemistryDetailContent;