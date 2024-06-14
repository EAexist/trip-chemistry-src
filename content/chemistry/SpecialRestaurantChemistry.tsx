/* React */
import { Fragment, useEffect } from "react";

/* Externals */
import { m } from "framer-motion";


/* App */
import { useStrings } from "../../texts";

import { AvatarGroup, Slider } from "@mui/material";
import FriendAvatar from "~/components/Avatar/FriendAvatar";
import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import { FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { useChemistry } from "../../reducers/chemistryReducer";
import { dailyRestaurantSliderProps } from "../test/DailyRestaurantTestContent";
import GroupAnswerSlider from "./component/GroupAnswerSlider";
import { specialFoodBudgetSliderProps } from "../test/SpecialRestaurantTestContent";
import { useSelector } from "react-redux";

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
            <m.h2 {...FADEIN_FROMBOTTOM_VIEWPORT} className="typography-heading">여행 중 평범한 식사는 얼마나 적당할까</m.h2>
            <m.h3>여행 중 평범한 식사 한끼</m.h3>
            <GroupAnswerSlider answerToProfiles={dailyBudgetAnswerToProfiles} {...dailyRestaurantSliderProps} className="block--with-padding--small" />
            <m.h3>유명 맛집에서의 특별한 한끼</m.h3>
            <GroupAnswerSlider answerToProfiles={specialBudgetAnswerToProfiles} {...specialFoodBudgetSliderProps} className="block--with-padding--small" />
            <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="content">
                {/* {
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
                } */}
            </m.div>
        </div>
    );
}
export default RestaurantChemistryContent;