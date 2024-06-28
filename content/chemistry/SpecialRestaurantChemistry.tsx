/* React */
import { useEffect } from "react";

/* Externals */
import { m } from "framer-motion";

/* App */
import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import { FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { specialFoodBudgetSliderProps } from "../test/_SpecialRestaurantTestContent";
import { dailyRestaurantSliderProps } from "../test/DailyRestaurantTestContent";
import GroupAnswerSlider from "./component/GroupAnswerSlider";


function RestaurantChemistryContent() {

    /* Reducers */
    // const chemistry = useSelector((state)=>)
    const dailyBudgetAnswerToProfiles = useValueToProfileIdList('restaurant', 'dailyBudget');
    const specialBudgetAnswerToProfiles = useValueToProfileIdList('restaurant', 'specialBudget');

    useEffect(() => {
        console.log(`[RestaurantChemistryContent] specialBudgetAnswerToProfiles=${JSON.stringify(dailyBudgetAnswerToProfiles)}`)

    }, [dailyBudgetAnswerToProfiles]);

    return (
        <div className="content">
            <m.h2 {...FADEIN_FROMBOTTOM_VIEWPORT} className="section-title">여행 중 평범한 식사는 얼마나 적당할까</m.h2>
            <m.h3>여행 중 평범한 식사 한끼</m.h3>
            <GroupAnswerSlider answerToProfiles={dailyBudgetAnswerToProfiles} {...dailyRestaurantSliderProps} className="block--with-padding--small" />
            <m.h3>유명 맛집에서의 특별한 한끼</m.h3>
            <GroupAnswerSlider answerToProfiles={specialBudgetAnswerToProfiles} {...specialFoodBudgetSliderProps} className="block--with-padding--small" />
        </div>
    );
}
export default RestaurantChemistryContent;