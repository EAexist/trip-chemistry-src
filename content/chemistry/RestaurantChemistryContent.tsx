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
import { useAppSelector } from "~/store";


import { BrunchDining, DinnerDining, Icecream, RamenDining } from "@mui/icons-material";
import useTripMemberNicknames from "~/hooks/useTripMemberNicknames";

function RestaurantChemistryContent() {

    /* Constants */
    const strings = useStrings().public.contents.chemistry;

    /* Reducers */

    const lowDailyBudgetMemberNicknames = useTripMemberNicknames("lowDailyRestaurantBudget")
    const highDailyBudgetMemberNicknames = useTripMemberNicknames("highDailyRestaurantBudget")

    /* Reducers */
    const dailyBudgetAnswerToProfiles = useValueToProfileIdList('restaurant', 'dailyBudget');
    const specialRestaurantAnswerList = useAppSelector((state) =>
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
            <p>
                {
                    highDailyBudgetMemberNicknames.map(( nickname, index ) =>
                        <Fragment>
                        <b>{nickname}</b>
                        {" 님, "}
                        </Fragment>
                    )
                }
                {"친구가 더 적은 식비를 생각하고 있어요. 부담이 되지 않도록 꼭 먹고 싶은 것들을 추리거나 합리적인 가격대의 식당을 함께 찾아보세요.\n친구들도 특별한 맛집이라면 돈을 더 쓰고 싶을 수 있답니다. \"특별한 한끼\" 탭을 눌러 지금 확인해보세요."}
            </p>
            <p>
                {
                    lowDailyBudgetMemberNicknames.map(( nickname, index ) =>
                        <Fragment>
                        <b>{nickname}</b>
                        {" 님, "}
                        </Fragment>
                    )
                } 
                {"친구가 더 많은 식비를 생각하고 있어요. 여행지의 맛있는 음식들에 대해 친구들의 이야기를 들어보고, 예산을 조정해 함께해보세요."}
            </p>
            </m.div>
        </div>
    );
}
export default RestaurantChemistryContent;