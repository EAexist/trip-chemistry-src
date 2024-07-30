/* React */
import { useEffect } from "react";

/* Externals */
import { m } from "framer-motion";

/* App */
import { Avatar, Chip, List, ListItem, ListItemAvatar, ListItemText, Stack } from "@mui/material";
import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import { FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { useAppSelector } from "../../store";
import GroupAnswerSlider from "./component/GroupAnswerSlider";


import { Circle } from "@mui/icons-material";
import { createSelector } from "@reduxjs/toolkit";
import ImageIcon from "../../components/ImageIcon";
import { IProfile } from "../../interfaces/IProfile";
import { useUserProfile } from "../../reducers/authReducer";
import { criteriaAnswerOptions, restaurantCriterias } from "../test/RestaurantTestContent";
import { specialRestaurantBudgetSliderProps } from "../../constants/specialRestaurantBudgetSliderProps";

function RestaurantChemistryContent() {

    const { id, nickname } = useUserProfile()

    const lowDailyBudgetMemberIds = useAppSelector(( state ) => state.chemistry?.data.memberLists.lowDailyRestaurantBudget)
    const highDailyBudgetMemberIds = useAppSelector(( state ) => state.chemistry?.data.memberLists.highDailyRestaurantBudget)

    /* Reducers */
    const specialBudgetAnswerToProfiles = useValueToProfileIdList('restaurant', 'specialBudget');

    const restaurantAnswerList = useAppSelector(
        createSelector(
            state => state.chemistry.data.profiles,
            (profiles: IProfile[]) =>
                Object.entries(restaurantCriterias).map(([criteria, v]) => (
                    {
                        answers:
                            (Object.values(profiles).map((profile) => ({
                                nickname: profile.nickname,
                                answer: profile.testAnswer?.restaurant[criteria]
                            })).filter(({ answer }) => answer > 0).sort((v1, v2) => v2.answer - v1.answer)),
                        ...v
                    }
                )).sort((v1, v2) =>
                    v2.answers.map(({ answer }) => answer).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                    - v1.answers.map(({ answer }) => answer).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                )
        )
    )

    useEffect(() => {
        console.log(`[RestaurantChemistryContent] specialBudgetAnswerToProfiles=${JSON.stringify(specialBudgetAnswerToProfiles)}`)
    }, [specialBudgetAnswerToProfiles]);

    return (
        <>
            <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="section-header">
                <h2 className="section-title">함께 갈 식당 고르기</h2>
            </m.div>
            <div className="content content--sparse">
                <m.div {...FADEIN_FROMBOTTOM_VIEWPORT}>
                    {/* <div className="section-header"> */}
                    <h3 className="section-title section-title--sm">어떤 기준으로 고르면 좋을까?</h3>
                    {/* <p>함께 갈 식당을 골라보자. 어떤 것들을 신경써야 할까?</p> */}
                    {/* </div> */}
                    <List>
                    {
                        restaurantAnswerList.map(({ label, body, icon, answers }, index) =>
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    {/* 1. */}
                                    <Avatar>
                                        <ImageIcon name={icon} />
                                    </Avatar>
                                    {/* <h3 className="section-title--sm">{`${index+1}`}</h3> */}
                                </ListItemAvatar>
                                <div>
                                    <ListItemText
                                        primary={<h3 className="list-item-title">{label}</h3>}
                                        secondary={body}
                                    />
                                    <Stack>
                                        {
                                            answers.map(({ nickname, answer }) =>
                                                <Chip
                                                    key={nickname}
                                                    size="small"
                                                    label={nickname}
                                                    color="primary"
                                                    sx={{
                                                        opacity: 0.5 * answer,
                                                        '& .MuiChip-label': {
                                                            fontSize: "12px"
                                                        }
                                                    }}
                                                />
                                            )
                                        }
                                    </Stack>
                                </div>
                            </ListItem>
                        )
                    }
                    </List>
                    <Stack justifyContent={"end"}>
                        {
                            Object.values(criteriaAnswerOptions).sort((v1, v2) => v2.value - v1.value).map(({ value, label }) => (
                                (value > 0) &&
                                <Stack key={value}>
                                    <Circle sx={{ color: "primary.main", opacity: 0.5 * value, fontSize: "12px"  }} />
                                    <p className="typography-note">{label}</p>
                                </Stack>
                            ))
                        }
                    </Stack>
                </m.div>
                <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="content">
                    <h3 className="section-title section-title--sm">어느 가격대에서 찾아볼까?</h3>
                    <GroupAnswerSlider answerToProfiles={specialBudgetAnswerToProfiles} {...specialRestaurantBudgetSliderProps} />
                    <div className="content">
                        {
                            (highDailyBudgetMemberIds?.includes(id)) &&
                            <p className="typography-article">
                                {`${nickname} 님,친구들은 더 적은 최대 예산을 생각하고 있어요. 친구들이 부담을 갖지 않도록 생각한 것보다 합리적인 가격대의 식당을 함께 찾아보세요.`}
                            </p>
                        }
                        {
                            (lowDailyBudgetMemberIds?.includes(id)) &&
                            <p className="typography-article">
                                {`${nickname} 님, 친구들은 더 많은 최대 예산를 생각하고 있어요. 친구들이 가보고 싶어하는 식당에 대해 이야기를 잘 들어보고, 예산을 조정해 함께해보세요.`}
                            </p>
                        }
                    </div>
                </m.div>
            </div>
        </>
    );
}
export default RestaurantChemistryContent;