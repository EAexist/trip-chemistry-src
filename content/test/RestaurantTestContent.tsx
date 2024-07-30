/* React */

/* Externals */
import { Accordion, AccordionDetails, AccordionSummary, Chip, Stack } from "@mui/material";

/* App */
import { ExpandMore, NavigateNext } from "@mui/icons-material";
import { SyntheticEvent, useState } from "react";
import { useTestAnswer } from "../../reducers/testAnswerReducer";
import { criteriaAnswerOptions } from "~/src/constants/options";

function RestaurantTestContent() {

    /* Strings */


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
        <div className="content content--dense">
            {/* <h2 className="test__title__heading section-title">유명 맛집에서의 특별한 한끼</h2> */}
            {
                [
                    {
                        label: "가성비",
                        body: "식비를 아껴야해",
                        answer: priceAnswer,
                        setAnswer: setPriceAnswer
                    },
                    {
                        label: "특별함",
                        body: "평범한 음식보다는\n여행지에서만 먹을 수 있는 특별한 음식 위주로 먹어야 해",
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
                        body: "미슐랭, 타베로그, 또는 인스타그램에서 잘 알려진\n 유명한 식당 위주로 가봐야 해",
                        answer: popularityAnswer,
                        setAnswer: setFameAnswer
                    },
                ].map(({ label, body, answer, setAnswer }, index ) => (
                    <Accordion key={label} expanded={expanded === label} onChange={handleChange(label)}>
                        <AccordionSummary
                            expandIcon={(expanded === label) && <ExpandMore />}
                            id={`panel${index}-header`}
                            aria-controls={`panel${index}-content`}
                        >
                            <Stack direction="row" justifyContent="space-between" width="100%">
                                <div>
                                    <h3 className={(expanded === label) ? "section-title section-title--sm" : "" }>{label}</h3>
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
                                            onClick={() => setAnswer((value === answer) ? undefined : value)}
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