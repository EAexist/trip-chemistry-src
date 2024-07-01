/* React */

/* Externals */
import { Accordion, AccordionDetails, AccordionSummary, Chip, List, ListItem, ListItemAvatar, ListItemText, SliderProps, Stack, Zoom } from "@mui/material";

/* App */
import { Edit, ExpandMore, NavigateNext } from "@mui/icons-material";
import { SyntheticEvent, useState } from "react";
import { useTestAnswer } from "~/reducers/testAnswerReducer";
import { priceText } from "../../utils/priceText";
import AnswerSlider from "./component/AnswerSlider";

function RestaurantTestContent() {

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

    const criteriaAnswerOptions = {
        0:
        {
            value: 0,
            label: "상관 없어"
        },
        1:
        {
            value: 1,
            label: "중요해"
        },
        2:
        {
            value: 2,
            label: "매우 중요해"
        },
        // 3:
        // {
        //     value: 2,
        //     label: "매우 중요해"
        // },
    }

    const [expanded, setExpanded] = useState<string | false>("가성비");

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    /* Reducers */
    const [priceAnswer, setPriceAnswer] = useTestAnswer("restaurant", "price");
    const [uniquenessAnswer, setUniquenessAnswer] = useTestAnswer("restaurant", "uniqueness");
    const [tasteAnswer, setTasteAnswer] = useTestAnswer("restaurant", "taste");
    const [popularityAnswer, setFameAnswer] = useTestAnswer("restaurant", "popularity");

    return (
        <div className="content">
            {/* <h2 className="test__title__heading section-title">유명 맛집에서의 특별한 한끼</h2> */}
            {
                [
                    {
                        label: "가성비",
                        body: "식비를 아끼자",
                        answer: priceAnswer,
                        setAnswer: setPriceAnswer
                    },
                    {
                        label: "특별함",
                        body: "평범한 음식 말고 여행지의 특별한 음식만 먹자",
                        answer: uniquenessAnswer,
                        setAnswer: setUniquenessAnswer
                    },
                    {
                        label: "맛",
                        body: "특별하든 평범하든 맛있는 식사면 상관 없어",
                        answer: tasteAnswer,
                        setAnswer: setTasteAnswer
                    },
                    {
                        label: "인기",
                        body: "잘 알려진 유명한 식당들만 다녀보고 싶어",
                        answer: popularityAnswer,
                        setAnswer: setFameAnswer
                    },
                ].map(({ label, body, answer, setAnswer }) => (
                    <Accordion expanded={expanded === label} onChange={handleChange(label)}>
                        <AccordionSummary
                            expandIcon={(expanded === label) && <ExpandMore />}
                            aria-controls={`${label} answer panel`}
                            id={`${label} answer panel header`}
                        >
                            <Stack direction="row" justifyContent="space-between" width="100%">
                                <div>
                                <h3 className="section-title section-title--sm">{label}</h3>
                                {
                                    (expanded === label) &&
                                    <p className="typography-note">{body}</p>
                                }
                                </div>
                                {
                                    (expanded !== label) &&
                                    (
                                        (answer !== undefined) ?
                                            <Chip
                                                label={criteriaAnswerOptions[answer].label}
                                                variant={"filled"}
                                                color={"primary"}
                                                size="small"
                                                sx={{
                                                    '.MuiChip-label': {
                                                        fontSize: 12
                                                    }
                                                }}
                                            />
                                            :
                                            <NavigateNext />
                                    )
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack>
                                {
                                    Object.values(criteriaAnswerOptions).map(({ value, label }) => (
                                        <Chip
                                            key={label}
                                            label={label}
                                            onClick={() => setAnswer(value)}
                                            variant={(value === answer) ? "filled" : "outlined"}
                                            color={"primary"}
                                        />
                                    ))
                                }
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </div>
    );
}
export default RestaurantTestContent