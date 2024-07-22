/* React */
import { Fragment, SyntheticEvent, useEffect, useState } from "react";

/* Externals */
import { AnimatePresence, m } from "framer-motion";

/* App */
import { Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Tab, Tabs } from "@mui/material";
import { useAppSelector } from "../store";
import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import { FADEIN, FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { dailyRestaurantSliderProps } from "../test/DailyRestaurantTestContent";
import GroupAnswerSlider from "./component/GroupAnswerSlider";


import { Restaurant } from "@mui/icons-material";
import useTripMemberNicknames from "../hooks/useTripMemberNicknames";
import { IProfile } from "../interfaces/IProfile";
import { createSelector } from "@reduxjs/toolkit";

function RestaurantChemistryContent() {

    const [section, setSection] = useState<string>("daily");

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };

    const lowDailyBudgetMemberNicknames = useTripMemberNicknames("lowDailyRestaurantBudget")
    const highDailyBudgetMemberNicknames = useTripMemberNicknames("highDailyRestaurantBudget")

    /* Reducers */
    const dailyBudgetAnswerToProfiles = useValueToProfileIdList('restaurant', 'dailyBudget');
    const specialRestaurantAnswerList = useAppSelector(
        createSelector(
            state => state.chemistry.data.profiles,
            (profiles: IProfile[]) =>
                Object.values(profiles).map((profile) =>
                ({
                    nickname: profile.nickname,
                    ...profile.testAnswer ? { specialCount: profile.testAnswer.restaurant.specialCount, specialBudget: profile.testAnswer.restaurant.specialBudget } : { specialCount: -1, specialBudget: -1 }
                })
                ).sort((a, b) => ((b.specialCount - a.specialCount) === 0) ? b.specialBudget - a.specialBudget : b.specialCount - a.specialCount)
        )
    )

    useEffect(() => {
        console.log(`[RestaurantChemistryContent] specialBudgetAnswerToProfiles=${JSON.stringify(dailyBudgetAnswerToProfiles)}`)

    }, [dailyBudgetAnswerToProfiles]);

    return (
        <>
            <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="section-header">
                <h2 className="section-title">먹는데에는 얼마나 쓸까?</h2>
            </m.div>
            <Tabs
                value={section}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="restaurant chemistry section"
            >
                <Tab label="식사 예산" value={"daily"} />
                <Tab label="특별한 맛집 예산" value={"special"} />
            </Tabs>
            <AnimatePresence mode={"wait"} initial={false}>
                {
                    section === "daily" &&
                    <m.div key={"daily"}  {...{ ...FADEIN, exit: "hidden" }} className="content">
                        <GroupAnswerSlider answerToProfiles={dailyBudgetAnswerToProfiles} {...dailyRestaurantSliderProps} />
                        <div className="content">
                            {
                                (highDailyBudgetMemberNicknames.length > 0) &&
                                <p className="typography-article">
                                    {
                                        highDailyBudgetMemberNicknames.map((nickname, index) =>
                                            <Fragment key={nickname}>
                                                <b>{nickname}</b>
                                                {" 님, "}
                                            </Fragment>
                                        )
                                    }
                                    {"친구들은 더 적은 식비를 생각하고 있어요. 부담이 되지 않도록 꼭 먹고 싶은 것들을 추리거나 합리적인 가격대의 식당을 함께 찾아보세요.\n친구들도 특별한 맛집이라면 돈을 더 쓰고 싶을 수 있답니다. \"특별한 한끼\" 탭을 눌러 지금 확인해보세요."}
                                </p>
                            }
                            {
                                (lowDailyBudgetMemberNicknames.length > 0) &&
                                <p className="typography-article">
                                    {
                                        lowDailyBudgetMemberNicknames.map((nickname, index) =>
                                            <Fragment key={nickname}>
                                                <b>{nickname}</b>
                                                {" 님, "}
                                            </Fragment>
                                        )
                                    }
                                    {"친구들은 더 많은 식비를 생각하고 있어요. 여행지의 맛있는 음식들에 대해 친구들의 이야기를 들어보고, 예산을 조정해 함께해보세요."}
                                </p>
                            }
                        </div>
                    </m.div>
                }
                {
                    section === "special" &&
                    <m.div key={"special"}  {...{ ...FADEIN, exit: "hidden" }} className="content">
                        <div>
                            <List>
                                <ListItem
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
                                </ListItem>
                                {
                                    specialRestaurantAnswerList.map(({ nickname, specialCount, specialBudget }) =>
                                        <ListItem
                                            key={nickname}
                                            disabled={(specialCount < 0)}
                                            {...FADEIN_FROMBOTTOM_VIEWPORT}
                                        >
                                            <ListItemAvatar className="block--centered">
                                                <p>{nickname}</p>
                                            </ListItemAvatar>
                                            <ListItemText primary={
                                                <Grid container>
                                                    <Grid item xs={8} className="block--centered">
                                                        {
                                                            (specialCount < 0)
                                                                ?
                                                                <p>?</p>
                                                                :
                                                                (specialCount === 0)
                                                                    ?
                                                                    <p>관심 없어</p>
                                                                    :
                                                                    <Stack>
                                                                        {
                                                                            Array.from({ length: specialCount }, (value, index) => value).map((value, index) =>
                                                                                <Restaurant
                                                                                    key={index}
                                                                                    color="primary"
                                                                                    sx={{
                                                                                        fontSize: "18px",
                                                                                        opacity: 0.2 + Math.floor((specialBudget - 1) / 40000) * 0.4
                                                                                    }}
                                                                                />
                                                                            )
                                                                        }
                                                                    </Stack>
                                                        }
                                                    </Grid>
                                                    <Grid item xs={4} className="block--centered">
                                                        {
                                                            (specialCount > 0) ?
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
                    </m.div>
                }
            </AnimatePresence>
        </>
    );
}
export default RestaurantChemistryContent;