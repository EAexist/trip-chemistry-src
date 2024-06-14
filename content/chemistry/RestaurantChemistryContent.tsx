/* React */
import { Fragment, useEffect } from "react";

/* Externals */
import { m } from "framer-motion";


/* App */
import { useStrings } from "../../texts";

import { AvatarGroup, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Slider, Stack } from "@mui/material";
import FriendAvatar from "~/components/Avatar/FriendAvatar";
import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import { FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { useChemistry } from "../../reducers/chemistryReducer";
import { dailyRestaurantSliderProps } from "../test/DailyRestaurantTestContent";
import GroupAnswerSlider from "./component/GroupAnswerSlider";
import { specialFoodBudgetSliderProps } from "../test/SpecialRestaurantTestContent";
import { MotionListItem } from "~/motion/components/MotionListItem";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { BrunchDining, DinnerDining, Icecream, RamenDining } from "@mui/icons-material";

function RestaurantChemistryContent() {

    /* Constants */
    const strings = useStrings().public.contents.chemistry;

    /* Reducers */

    const chemistry = useChemistry();

    /* Reducers */
    const dailyBudgetAnswerToProfiles = useValueToProfileIdList('restaurant', 'dailyBudget');
    const specialRestaurantAnswerList = useSelector((state: RootState) =>
        Object.values(state.chemistry.data.profileList).map((profile) =>
        ({
            nickname: profile.nickname,
            ...profile.testAnswer ? { specialCount: profile.testAnswer.restaurant.specialCount, specialBudget: profile.testAnswer.restaurant.specialBudget } : { specialCount: -1, specialBudget: -1 }
        })
        )
    ).sort((a, b) => (( b.specialCount - a.specialCount ) === 0) ? b.specialBudget - a.specialBudget : b.specialCount - a.specialCount )

    useEffect(() => {
        console.log(`[RestaurantChemistryContent] specialBudgetAnswerToProfiles=${JSON.stringify(dailyBudgetAnswerToProfiles)}`)

    }, [dailyBudgetAnswerToProfiles]);

    return (
        <div className="content content--large">
            <m.h2 {...FADEIN_FROMBOTTOM_VIEWPORT} className="typography-heading">먹는데에는 얼마나 쓸까?</m.h2>
            <m.h3 className="typography-label">여행 중 평범한 식사 한끼</m.h3>
            <GroupAnswerSlider answerToProfiles={dailyBudgetAnswerToProfiles} {...dailyRestaurantSliderProps} className="block--with-padding-x--small" />
            <div>
                <Divider variant="middle" />
            </div>
            <m.h3 className="typography-label">유명 맛집에서의 특별한 한끼</m.h3>
            <div>
            <List>
                <MotionListItem
                    {...FADEIN_FROMBOTTOM_VIEWPORT}
                    key={"grid"}
                    disablePadding
                >
                    <ListItemAvatar />
                    <ListItemText primary={
                        <Grid container>
                        <Grid item xs={8} className="block--centered">
                            <p className="typography-note">방문 횟수 (3박 4일)</p>
                        </Grid>
                        <Grid item xs={4} className="block--centered">
                            <p className="typography-note">가격대</p>
                        </Grid>
                        </Grid>
                    } />
                </MotionListItem>
                {
                    specialRestaurantAnswerList.map(({ nickname, specialCount, specialBudget }) =>
                        <ListItem
                            {...FADEIN_FROMBOTTOM_VIEWPORT}
                            key={nickname}
                            // sx={{
                            //     opacity: 0.4
                            // }}
                            className={ ( specialCount < 0 ) && "disabled" }                            
                        >
                            <ListItemAvatar className="block--centered">
                                <p className="">{nickname}</p>
                            </ListItemAvatar>
                            <ListItemText primary={
                                <Grid container>
                                    <Grid item xs={8} className="block--centered">
                                        {
                                            ( specialCount < 0 ) 
                                            ?
                                            <p>?</p>
                                            :
                                            ( specialCount === 0 ) 
                                            ?
                                            <p>관심 없어</p>
                                            :
                                            <Stack>
                                                {
                                                    Array.from({ length: specialCount }, (value, index) => value).map(() =>
                                                        ( specialBudget < 60000 ) ?
                                                            <Icecream />
                                                            :
                                                            ( specialBudget < 100000 ) ?
                                                                <RamenDining />
                                                                :
                                                                <BrunchDining />
                                                    )
                                                }
                                            </Stack>
                                        }
                                    </Grid>
                                    <Grid item xs={4} className="block--centered">
                                        {
                                            ( specialCount > 0 ) ?
                                            <p>{`${specialBudget / 10000}만원`}</p>
                                            : <p>-</p>
                                        }
                                    </Grid>
                                </Grid>
                            } />
                        </ListItem>
                    )
                }
            </List>
            </div>
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