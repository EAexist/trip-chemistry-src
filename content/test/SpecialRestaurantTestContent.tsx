/* React */

/* Externals */
import { Accordion, AccordionDetails, AccordionSummary, Chip, SliderProps, Stack, Zoom } from "@mui/material";

/* App */
import { Edit, ExpandMore, NavigateNext } from "@mui/icons-material";
import { SyntheticEvent, useState } from "react";
import { useTestAnswer } from "~/reducers/testAnswerReducer";
import { priceText } from "../../utils/priceText";
import AnswerSlider from "./component/AnswerSlider";

function SpecialRestaurantTestContent() {

    /* Strings */
    const specialFoodBudgetSliderProps: SliderProps = {
        step: 20000,
        min: 20000,
        max: 120000,
        "aria-label": "special restaurant budget",
        marks: [
            {
                value: 20000,
                label: "2만원"
            },
            {
                value: 40000,
            },
            {
                value: 60000,
                label: "6만원"
            },
            {
                value: 80000,
            },
            {
                value: 100000,
                label: "10만원"
            },
            {
                value: 120000,
            },
        ]
    };

    /* Reducers */
    const [specialRestaurantBudgetAnswer, setSpecialRestaurantBudgetAnswer] = useTestAnswer("restaurant", "specialBudget");
    const [specialRestaurantCountAnswer, setSpecialRestaurantCountAnswer] = useTestAnswer("restaurant", "specialCount");
    const isSpecialBudgetTestDisabled = specialRestaurantCountAnswer < 1

    const [expanded, setExpanded] = useState<string | false>("count");

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const handleCountChipClick = (option) => () => {
        if (option !== specialRestaurantCountAnswer) {
            setSpecialRestaurantCountAnswer(option)
        }
        if (option === 0) {
            setSpecialRestaurantBudgetAnswer(0)
        }
    }

    return (
        <div className="content">
            {/* <h2 className="test__title__heading section-title">유명 맛집에서의 특별한 한끼</h2> */}
            <Accordion expanded={expanded === "count"} onChange={handleChange("count")}>
                <AccordionSummary
                    expandIcon={(expanded === "count") && <ExpandMore />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Stack direction="row" justifyContent="space-between" width="100%">
                        <h3>얼마나 많이 갈까?</h3>
                        {
                            (expanded !== "count") &&
                            (
                                (specialRestaurantCountAnswer !== undefined) ?
                                    <p>3박 4일 동안 <b>{`${specialRestaurantCountAnswer}번${(specialRestaurantCountAnswer === 6) ? ' 이상' : ''}`}</b></p>
                                    :
                                    <NavigateNext />
                            )
                        }
                    </Stack>
                </AccordionSummary>
                <AccordionDetails className="content block--centered">
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
                </AccordionDetails>
            </Accordion>
            <Zoom in={!isSpecialBudgetTestDisabled}>
                <Accordion expanded={expanded === "budget"} onChange={handleChange("budget")} >
                    <AccordionSummary
                        expandIcon={(expanded === "budget") && <ExpandMore />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Stack direction="row" justifyContent="space-between" width="100%">
                            <h3>식사 한 번에 얼마까지 쓸 수 있어?</h3>
                            {
                                (expanded !== "budget") &&
                                (
                                    (specialRestaurantBudgetAnswer !== undefined) ?
                                        <p><b>{priceText(specialRestaurantBudgetAnswer)}</b></p>
                                        :
                                        <NavigateNext />
                                )
                            }
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AnswerSlider
                            testKey="restaurant"
                            subKey="specialBudget"
                            {...specialFoodBudgetSliderProps}
                        />
                    </AccordionDetails>
                </Accordion>
            </Zoom>
        </div>
    );
}
export default SpecialRestaurantTestContent