/* React */

/* Externals */
import { Chip, Divider, SliderProps, Stack } from "@mui/material";

/* Swiper */
import 'swiper/css';
import 'swiper/css/effect-coverflow'; /* Food Carousel */

/* App */
import { SyntheticEvent, useState } from "react";
import { useTestAnswer } from "../reducers/testAnswerReducer";
import AnswerSlider from "./component/AnswerSlider";

/* Strings */
export const specialFoodBudgetSliderProps: SliderProps = {
    step: 20000,
    min: 20000,
    max: 120000,
    "aria-label": "special restaurant budget",
    marks: [
        {
            value: 10000,
            label: "만원"
        },
        {
            value: 50000,
            label: "5만원"
        },
        {
            value: 100000,
            label: "10만원"
        },
    ]
};
function SpecialRestaurantTestContent() {


    /* Reducers */
    const [specialRestaurantBudgetAnswer] = useTestAnswer("restaurant", "specialBudget");
    const [specialRestaurantCountAnswer, setSpecialRestaurantCountAnswer] = useTestAnswer("restaurant", "specialCount");

    const [expanded, setExpanded] = useState<string | false>("count");

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const handleCountChipClick = (option) => () => {
        if (option !== specialRestaurantCountAnswer) {
            setSpecialRestaurantCountAnswer(option)
        }
    }

    return (
        <div className="content">
            {/* <h2 className="test__title__heading section-title">유명 맛집에서의 특별한 한끼</h2> */}
            <h3>얼마나 많이 갈까?</h3>
            <div className="content block--centered block--with-margin--large">
                <p>3박 4일 동안</p>
                <Stack flexWrap={"wrap"} justifyContent={"center"} rowGap={1}>
                    {
                        <>
                            {
                                [1, 2, 3, 4, 5, 6, 0].map((option) => (
                                    <Chip
                                        key={option}
                                        label={`${option}번${(option === 6) ? ' 이상' : ''}${(option === 0) ? ' (관심 없어)' : ''}`}
                                        onClick={handleCountChipClick(option)}
                                        variant={(option === specialRestaurantCountAnswer) ? "filled" : "outlined"}
                                        color={"primary"}
                                    />
                                ))
                            }
                        </>
                    }
                </Stack>
            </div>
            <Divider />
            <h3>얼마까지 쓸 수 있어?</h3>
            <AnswerSlider
                testKey="restaurant"
                subKey="specialBudget"
                // disabled={}
                {...specialFoodBudgetSliderProps}
            />
        </div>
    );
}
export default SpecialRestaurantTestContent