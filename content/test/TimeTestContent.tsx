/* React */
import { SyntheticEvent, useState } from "react";

/* Externals */
import { Edit, Error, ExpandMore, Help, NavigateNext } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, createTheme, FormControlLabel, Stack, ThemeProvider } from "@mui/material";
import { TimeClock } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import MaterialUISwitch from "~/components/MaterialUISwitch";
import { useTestAnswer } from "~/reducers/testAnswerReducer";

function TimeTestContent() {

    const amPalette = [
        "rgb(37, 49, 109)",
        "rgb(95, 111, 148)",
        "rgb(151, 210, 236)",
        "rgb(254, 245, 172)",
    ]
    const pmPalette = [
        "rgb(255, 218, 120)",
        "rgb(255, 127, 62)",
        "rgb(42, 98, 154)",
        "rgb(0, 50, 133)",
    ]

    /* States */
    const [expanded, setExpanded] = useState<string | false>("start");
    const [showInstruction, setShowInstruction] = useState(true);

    /* Reducers */
    const [startTimeAnswer, setStartTimeAnswer] = useTestAnswer("schedule", "startTime")
    const [endTimeAnswer, setEndTimeAnswer] = useTestAnswer("schedule", "endTime")

    return (
        <div className="content">
            {/* <h2 className="typography-heading">시간</h2> */}
            {
                [
                    {
                        id: "start",
                        // answer: (startTimeAnswer === undefined) ? 8 : startTimeAnswer,
                        answer: startTimeAnswer,
                        setAnswer: setStartTimeAnswer,
                        summaryTitle: "여행 일정을 시작하는 시간",
                        detailTitle: "숙소를 나서서 일정을 시작하려고 해.\n몇시가 좋을까?",
                        defaultAnswer: 8
                    },
                    {
                        id: "end",
                        // answer: (endTimeAnswer === undefined) ? 20 : endTimeAnswer,
                        answer: endTimeAnswer,
                        setAnswer: setEndTimeAnswer,
                        summaryTitle: "여행 일정이 끝나는 시간",
                        detailTitle: "일정을 마치고 숙소에 들어가 쉬려고 해.\n몇시가 좋을까?",
                        defaultAnswer: 20
                    }
                ].map(({ id, answer, setAnswer, summaryTitle, detailTitle, defaultAnswer }) => {
                    const isExpanded = expanded === id
                    const displayAnswer = (answer !== undefined) ? answer : defaultAnswer
                    const dayjsObject = dayjs('2024-06-05 00:00').set("hour", displayAnswer)
                    const isPm = displayAnswer >= 12
                    const color = isPm ? pmPalette[Math.floor((displayAnswer-12) / 3)] : amPalette[Math.floor(displayAnswer / 3)]

                    console.log(`displayAnswer=${displayAnswer}`)

                    return (
                        <Accordion key={id} expanded={isExpanded} onChange={(event: SyntheticEvent, isExpanded: boolean) => {
                            if (answer === undefined) {
                                setAnswer(displayAnswer)
                            }
                            setExpanded(isExpanded ? id : false)
                        }}>
                            <AccordionSummary
                                expandIcon={(isExpanded) && <ExpandMore />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Stack direction="row" justifyContent="space-between" width="100%">
                                    {
                                        (isExpanded) ?
                                            <p>{detailTitle}</p>
                                            :
                                            <p>{summaryTitle}</p>
                                    }
                                    {
                                        (!isExpanded) &&
                                        (
                                            (answer !== undefined) ?
                                                <p><b>{isPm ? "오후" : "오전"} {dayjsObject.format('h시')}</b></p>
                                                :
                                                <NavigateNext />
                                        )
                                    }
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails sx={{ overflowX: "visible" }}>
                                <Stack direction={"row-reverse"}>
                                    <Stack direction={"column"}>
                                        <FormControlLabel
                                            control={
                                                <MaterialUISwitch
                                                    checked={isPm}
                                                    color="primary"
                                                    onChange={() => setAnswer((((answer !== undefined) ? answer : displayAnswer) + 12) % 24)}
                                                />
                                            }
                                            label={<p className="typography-label">{isPm ? "오후" : "오전"}</p>}
                                            labelPlacement="bottom"
                                        />
                                        <p className="">{dayjsObject.format('h시')}</p>
                                    </Stack>
                                    <ThemeProvider
                                        theme={(createTheme({
                                            palette: {
                                                primary: {
                                                    main: color
                                                }
                                            }
                                        }))}>
                                        <TimeClock
                                            value={dayjsObject}
                                            onChange={
                                                showInstruction
                                                    ? (newValue) => {
                                                        setShowInstruction(false)
                                                        setAnswer(newValue.get("hour"))
                                                    }
                                                    : (newValue) => setAnswer(newValue.get("hour"))
                                            }
                                            views={['hours']}
                                            timezone="system"
                                            sx={{
                                                '& .MuiClock-clock': {
                                                    backgroundColor: "transparent",
                                                },
                                            }}
                                            className="testcontent-swiper-no-swiping" 
                                            />
                                    </ThemeProvider>
                                </Stack>
                                {
                                    showInstruction &&
                                    <Stack className="typography-note">
                                        <Help fontSize="inherit" />
                                        <p >원하는 시각으로 드래그해보세요.</p>
                                    </Stack>
                                }
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }
            <Accordion sx={{ backgroundColor: "transparent" }}>
                <AccordionSummary expandIcon={
                    (startTimeAnswer !== undefined)
                        ? (endTimeAnswer !== undefined)
                            ? <p>하루에 <b>{endTimeAnswer - startTimeAnswer}</b>시간 정도를 돌아다니자!</p>
                            : <Stack>
                                <Error sx={{ fontSize: "15px" }} />
                                <p>일정이 끝나는 시간을 정해주세요.</p>
                            </Stack>
                        : <Stack>
                            <Error />
                            <p>일정을 시작하는 시간을 정해주세요.</p>
                        </Stack>
                }>
                </AccordionSummary>
            </Accordion>
        </div >
    );
}
export default TimeTestContent