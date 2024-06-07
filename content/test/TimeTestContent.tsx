/* React */
import { SyntheticEvent, useEffect, useState } from "react";

/* Externals */
import { Edit, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, createTheme, FormControlLabel, Stack, Switch, ThemeProvider } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { TimeClock } from "@mui/x-date-pickers";
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

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    // /* Reducers */
    const [scheduleStartTimeAnswer, setScheduleStartTimeAnswer] = useTestAnswer("scheduleStartTime")
    const [scheduleEndTimeAnswer, setScheduleEndTimeAnswer] = useTestAnswer("scheduleEndTime")

    return (
        <div className="block__body">
            <h2 className="typography-heading">시간</h2>
            <div>
                {
                    [
                        {
                            id: "start",
                            answer: (scheduleStartTimeAnswer === undefined) ? 8 :scheduleStartTimeAnswer,
                            setAnswer: setScheduleStartTimeAnswer,
                            summaryTitle: "시작 시간",
                            detailTitle: "숙소를 나서서 일정을 시작하려고 해.\n몇시가 좋을까?",
                        },
                        {
                            id: "end",
                            answer: (scheduleEndTimeAnswer === undefined) ? 20 :scheduleEndTimeAnswer,
                            setAnswer: setScheduleEndTimeAnswer,
                            summaryTitle: "끝나는 시간",
                            detailTitle: "일정을 마치고 숙소에 들어가 쉬려고 해.\n몇시가 좋을까?",
                        }
                    ].map(({ id, answer, setAnswer, summaryTitle, detailTitle }) => {
                        const dayjsObject = dayjs('2024-06-05 00:00').set("hour", answer)
                        const isExpanded = expanded === id
                        const isPm = answer >= 12;
                        const color = isPm ? pmPalette[Math.floor(answer / 3)-4] : amPalette[Math.floor(answer / 3)]

                        return (
                            <Accordion key={id} expanded={isExpanded} onChange={handleChange(id)}>
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
                                                    <p className="typography-body"><b>{isPm ? "오후" : "오전"} {dayjsObject.format('h시')}</b></p>
                                                    :
                                                    <Edit fontSize="small" />
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
                                                        onChange={() => setAnswer((answer+12) % 24)}
                                                    />
                                                }
                                                label={<p className="typography-label">{isPm ? "오후" : "오전"}</p>}
                                                labelPlacement="bottom"                                                
                                            />
                                            <p className="typography-label">{dayjsObject.format('h시')}</p>
                                        </Stack>
                                        <ThemeProvider
                                            theme={(createTheme({
                                                palette:{
                                                    primary:{
                                                        main: color
                                                    }
                                                }
                                            }))}>
                                        <TimeClock value={dayjsObject} onChange={(newValue) => setAnswer(newValue.get("hour"))} views={['hours']} timezone="system"
                                            sx={{
                                                '& .MuiClock-clock': {
                                                    backgroundColor: "transparent",
                                                    // backgroundColor: color,
                                                },
                                            }} />
                                            </ThemeProvider>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </div>
        </div >
    );
}
export default TimeTestContent