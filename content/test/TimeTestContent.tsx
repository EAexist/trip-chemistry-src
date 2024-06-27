/* React */
import { SyntheticEvent, useEffect, useState } from "react";

/* Externals */
import { Error, ExpandMore, NavigateNext } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import { TimeClock } from "@mui/x-date-pickers";
import dayjs from "dayjs";
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

    /* Reducers */
    const [startTimeAnswer, setStartTimeAnswer] = useTestAnswer("schedule", "startTime")
    const [endTimeAnswer, setEndTimeAnswer] = useTestAnswer("schedule", "endTime")
    const [startTimeDayJs, setStartTimeDayJs] = useState(dayjs('2024-06-05 00:00').set("hour", (startTimeAnswer !== undefined) ? startTimeAnswer : 8))
    const [endTimeDayJs, setEndTimeDayJs] = useState(dayjs('2024-06-05 00:00').set("hour", (endTimeAnswer !== undefined) ? endTimeAnswer : 20))
    const [isAnswered, setIsAnswerd] = useState({
        start: false,
        end: false
    })

    useEffect(()=>{
        if(isAnswered.start){            
            setStartTimeAnswer( startTimeDayJs.get("hour") )
        }
    }, [ startTimeDayJs, isAnswered ])

    useEffect(()=>{
        if(isAnswered.end){            
            setEndTimeAnswer( endTimeDayJs.get("hour") )
        }
    }, [ endTimeDayJs, isAnswered ])

    return (
        <div className="content">
            {/* <h2 className="typography-heading">시간</h2> */}
            {
                [
                    {
                        id: "start",
                        answer: startTimeAnswer,
                        summaryTitle: "여행 일정을 시작하는 시간",
                        detailTitle: "숙소를 나서서 일정을 시작하려고 해.\n몇시가 좋을까?",
                        defaultAnswer: 8
                    },
                    {
                        id: "end",
                        answer: endTimeAnswer,
                        summaryTitle: "여행 일정이 끝나는 시간",
                        detailTitle: "일정을 마치고 숙소에 들어가 쉬려고 해.\n몇시가 좋을까?", 
                        defaultAnswer: 20
                    }
                ].map(({ id, answer, summaryTitle, detailTitle, defaultAnswer }) => {
                    const isExpanded = expanded === id
                    const dayjsObject = id === "start" ? startTimeDayJs : endTimeDayJs
                    const setDayjsObject = id === "start" ? setStartTimeDayJs : setEndTimeDayJs
                    const hour = dayjsObject.get("hour");
                    const isPm = hour > 11
                    const color = hour > 11 ? pmPalette[Math.floor((hour-12) / 3)] : amPalette[Math.floor(hour / 3)]

                    return (
                        <Accordion key={id} expanded={isExpanded} onChange={(event: SyntheticEvent, isExpanded: boolean) => {
                            setIsAnswerd((prev) => ({ ...prev, [id] : true }))
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
                                                <p><b>{ hour === 0 ? "자정" : `${isPm ? "오후" : "오전"} ${dayjsObject?.format('h시')}` }</b></p>
                                                :
                                                <NavigateNext />
                                        )
                                    }
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails sx={{ overflowX: "visible", display: "flex", position: "relative"}} >
                                    {/* <Stack direction={"column"}>
                                        <FormControlLabel
                                            control={
                                                <MaterialUISwitch
                                                    checked={isPm}
                                                    color="primary"
                                                    // onChange={() => setAnswer((((answer !== undefined) ? answer : displayAnswer) + 12) % 24)}
                                                    onChange={() => setIsPm((prev) =>({[id]: !prev[id], ...prev}))}
                                                />
                                            }
                                            label={<p className="typography-label">{isPm ? "오후" : "오전"}</p>}
                                            labelPlacement="bottom"
                                        />
                                        <p className="">{dayjsObject?.format('h시')}</p>
                                    </Stack> */}
                                    <ThemeProvider
                                        theme={(createTheme({
                                            palette: {
                                                primary: {
                                                    main: color
                                                }
                                            }
                                        }))}>
                                        <Box sx={{ position: "absolute", top: "32px", left: "50%", transform: "translateX(-50%)", ...(hour % 12 === 0) && { color: "primary.contrastText", zIndex: 1 } }}>
                                            <p className="" style={{ color: "inherit" }}>{ isPm ? "정오" : "자정" }</p>
                                        </Box>
                                        <TimeClock
                                            maxTime={(id === "start") && (endTimeAnswer !== undefined) && endTimeDayJs.subtract(1, "hour")}
                                            minTime={(id === "end") && (startTimeAnswer !== undefined) && startTimeDayJs.add(1, "hour")}
                                            value={dayjsObject}
                                            onChange={(newValue) => setDayjsObject(newValue)}
                                            ampmInClock={true}
                                            views={['hours']}
                                            timezone="system"
                                            sx={{
                                                '& .MuiClock-clock': {
                                                    backgroundColor: "transparent",
                                                },
                                                '& .MuiClockNumber-root:last-child': {
                                                    display: "none"
                                                }
                                            }}
                                            className="testcontent-swiper-no-swiping"
                                        />
                                    </ThemeProvider>
                                {/* {
                                    <Zoom in={openInvalidTimeAlert[id]} mountOnEnter unmountOnExit>
                                        <Alert
                                            action={
                                                <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        setWarningState(false);
                                                    }}
                                                >
                                                    <Close fontSize="inherit" />
                                                </IconButton>
                                            }
                                            severity="warning"
                                            className=""
                                            // sx={{
                                            //     whiteSpace: "pre-line"
                                            // }}
                                        >
                                            {
                                                (warningState === "start") ?
                                                    `일정을 마치는 시간( ${endTimeAnswer < 12 ? "오전" : "오후"} ${endTimeAnswer % 12}시 )보다 빨라야 해요.`
                                                    :
                                                    `일정을 시작하는 시간( ${startTimeAnswer < 12 ? "오전" : "오후"} ${startTimeAnswer % 12}시 )보다 늦어야 해요.`
                                            }
                                        </Alert>
                                    </Zoom>
                                } */}
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
                                <p>일정을 끝낼 시간을 정해주세요.</p>
                            </Stack>
                        : <Stack>
                            <Error />
                            <p>일정을 시작할 시간을 정해주세요.</p>
                        </Stack>
                }>
                </AccordionSummary>
            </Accordion>
        </div >
    );
}
export default TimeTestContent