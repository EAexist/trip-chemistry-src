/* React */
import { Fragment } from "react";

/* Externals */
import { m } from "framer-motion";


/* App */
import { SLIDERPROPS_CHEMISTRY_BUDGET_FOOD } from "../../common/app-const";
import { useStrings } from "../../texts";

import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import { FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { useChemistry } from "../../reducers/chemistryReducer";
import ChemistrySlider from "./component/ChemistrySlider";

function FoodBudgetChemistryContent() {

    /* Constants */
    const strings = useStrings().public.contents.chemistry;

    /* Reducers */

    const chemistry = useChemistry();

    const budgetAnswerToProfiles = useValueToProfileIdList('food');

    return (
        <>
            <m.h2 {...FADEIN_FROMBOTTOM_VIEWPORT} className="typography-heading">{strings.sections.budget.title}</m.h2>
            <div className="block__body">
                <div className="block--centered">
                    <ChemistrySlider {...SLIDERPROPS_CHEMISTRY_BUDGET_FOOD} testName="food" getAriaLabel={() => (`friends' restaurant budget preference`)} value={Object.keys(budgetAnswerToProfiles).map((answer) => Number(answer))} />
                </div>
                <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="block__body">
                    {
                        chemistry?.budgetChemistryText?.map((body, index) => {
                            const list = body.split(/(%\S*%)/)
                            return (
                                <p key={index}>
                                    {
                                        list.map((t, index) =>
                                            t[0] === "%"
                                                ? <b key={index}>{t.replaceAll('%', '')}</b>
                                                : <Fragment key={index}>{t}</Fragment>
                                        )
                                    }
                                </p>
                            )
                        })
                    }
                </m.div>
            </div>
        </>
    );
}
export default FoodBudgetChemistryContent;