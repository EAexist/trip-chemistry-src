/* React */

/* Externals */
import { Accordion, AccordionDetails, AccordionSummary, Chip, Divider, SliderProps, Stack } from "@mui/material";
import { useSelector } from "react-redux";

/* Swiper */
import 'swiper/css';
import 'swiper/css/effect-coverflow'; /* Food Carousel */

/* App */
import { RootState } from "../../store";
import { priceText } from "../../utils/priceText";
import AnswerSlider from "./component/AnswerSlider";
import { Edit, ExpandMore } from "@mui/icons-material";
import { SyntheticEvent, useState } from "react";
import { useTestAnswer } from "~/reducers/testAnswerReducer";

function SpecialRestaurantTestContent() {

    /* Strings */
    const specialFoodBudgetSliderProps: SliderProps = {
        step: 10000,
        min: 10000,
        max: 110000,
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

    /* Reducers */
    const [specialRestaurantBudgetAnswer] = useTestAnswer("specialRestaurantBudget");
    const [specialRestaurantCountAnswer, setSpecialRestaurantCountAnswer] = useTestAnswer("specialRestaurantCount");

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
        <div className="block__body">
            <h2 className="test__title__heading typography-heading">유명 맛집에서의 특별한 한끼</h2>
            <h3 className="typography-body">얼마나 많이 갈까?</h3>
            <div className="block__body block--with-margin--large">
                <p className="body__head typography-center">3박 4일 동안</p>
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
            <h3 className="typography-body">얼마까지 쓸 수 있어?</h3>
            <AnswerSlider
                testName="specialRestaurantBudget"
                {...specialFoodBudgetSliderProps}
            />
        </div>
    );
}
export default SpecialRestaurantTestContent