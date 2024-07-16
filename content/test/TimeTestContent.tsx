/* React */
import { ChangeEvent, useEffect, useState } from "react";

/* Externals */
import { Check } from "@mui/icons-material";
import { ButtonBase, Container, FormControlLabel, Grid, Paper, Radio, RadioGroup, Step, StepButton, StepButtonProps, StepContent, StepLabel, Stepper } from "@mui/material";
import { MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import ImageIcon from "~/components/ImageIcon";
import { useTestAnswer } from "~/reducers/testAnswerReducer";

export const scheduleTestOptions = [
    {
        value: 0,
        label: "아무래도\n상관없어"
    },
    {
        value: 1,
        label: "아주\n널널하게"
    },
    {
        value: 2,
        label: "널널하게"
    },
    {
        value: 3,
        label: "알차게"
    },
    {
        value: 4,
        label: "매우\n알차게"
    },
]

export const nightPlanTestOptions = [
    {
        value: 0,
        label: "숙소에서 푹 쉬기",
        icon: "rest",
        materialIcon: "hotel"
    },
    {
        value: 1,
        label: "야식이나 술 먹으러 나가기",
        icon: "bar",
        materialIcon: "tapas"
    },
    {
        value: 2,
        label: "밤에도 새로운 곳 돌아다니기",
        icon: "travel",
        materialIcon: "tour"
    },
]

// const amPalette = [
//     "rgb(37, 49, 109)",
//     "rgb(95, 111, 148)",
//     "rgb(151, 210, 236)",
//     "rgb(254, 245, 172)",
// ]
// const pmPalette = [
//     "rgb(255, 218, 120)",
//     "rgb(255, 127, 62)",
//     "rgb(42, 98, 154)",
//     "rgb(0, 50, 133)",
// ]

const CheckStepButton = ({ isChecked = false, isActive = false, children, ...props }: StepButtonProps & { isChecked?: boolean, isActive?: boolean }) => (
    <StepButton {...props}>
        {children}
        {
            isChecked
            && <Check sx={isActive ? { color: "primary.main" } : {}} />
        }
    </StepButton>
)

const TimeAnswerStepLabel = (({ testKey, index, summaryTitle, handleStep, label = "몇시가 좋을까?", isActive }) => {

    const [timeAnswer, setTimeAnswer] = useTestAnswer("schedule", testKey)
    const [theOtherTimeAnswer] = useTestAnswer("schedule", testKey === "startTime" ? "endTime" : "startTime")
    const [timeDayJs, setTimeDayJs] = useState((timeAnswer !== undefined) ? dayjs('2024-06-05 00:00').set("hour", timeAnswer) : undefined)
    const theOtherTimeDayJs = (theOtherTimeAnswer !== undefined) ? dayjs('2024-06-05 00:00').set("hour",  theOtherTimeAnswer) : undefined
    // const [theOtherTimeDayJs] = useState(dayjs('2024-06-05 00:00').set("hour", (theOtherTimeAnswer !== undefined) ? theOtherTimeAnswer : 20))
    const hour = timeDayJs?.get("hour");
    const isPm = hour > 11

    useEffect(() => {
        if (timeDayJs)
            setTimeAnswer(timeDayJs.get("hour"))
    }, [timeDayJs])

    return (
        <Step key={0} index={index}>
            <CheckStepButton
                onClick={handleStep(index)}
                isChecked={timeAnswer !== undefined}
                isActive={isActive}
                optional={
                    !isActive &&
                    (timeAnswer !== undefined) &&
                    <p><b>{hour === 0 ? "자정" : `${isPm ? "오후" : "오전"} ${timeDayJs?.format('h시')}`}</b></p>
                }
            >
                {summaryTitle}
            </CheckStepButton>
            <StepContent>
                <MobileTimePicker
                    value={timeDayJs}
                    maxTime={((testKey === "startTime") && (theOtherTimeAnswer !== undefined)) ? theOtherTimeDayJs.subtract(1, "hour") : undefined}
                    minTime={((testKey === "endTime") && (theOtherTimeAnswer !== undefined)) ? theOtherTimeDayJs.add(1, "hour") : undefined}
                    onChange={(newValue) => setTimeDayJs(newValue)}
                    label={label}
                    views={['hours']}
                />
            </StepContent>
        </Step>
    )
})

function TimeTestContent() {

    /* States */
    const [activeStep, setActiveStep] = useState(0);
    const handleStep = (step: number) => () => {
        setActiveStep((activeStep === step) ? -2: step);
    };
    const [scheduleAnswer, setScheduleAnswer] = useTestAnswer("schedule", "schedule");
    const [nightPlanAnswer, setNightPlanAnswer] = useTestAnswer("schedule", "nightPlan");

    const handleScheduleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
        setScheduleAnswer(Number(event.target.value));
    }
    return (
        <div className="content">
            {/* <h2 className="section-title">시간</h2> */}
            <Stepper nonLinear activeStep={activeStep} orientation="vertical">
                <TimeAnswerStepLabel testKey={"startTime"} index={0} summaryTitle={"숙소를 나서서 일정 시작"} handleStep={handleStep} isActive={activeStep === 0} />
                <Step index={1}>
                    <CheckStepButton
                        onClick={handleStep(1)}
                        optional={
                            (activeStep !== 1) && (scheduleAnswer !== undefined) && scheduleTestOptions[scheduleAnswer].label
                        }
                        isChecked={scheduleAnswer !== undefined}
                        isActive={activeStep === 1}
                    >
                        여행지 돌아다니기
                    </CheckStepButton>
                    <StepContent>
                        <Container className="column-padding content">
                            <p>얼마나 알차게 돌아다닐까?</p>
                            <RadioGroup
                                name="controlled-radio-buttons-group"
                                value={(scheduleAnswer !== undefined) ? scheduleAnswer : null}
                                onChange={handleScheduleAnswerChange}
                                row={true}
                                sx={{ justifyContent: "space-between" }}
                            >
                                {
                                    scheduleTestOptions.map(({ value, label }) => (
                                        <FormControlLabel
                                            key={label}
                                            value={value}
                                            control={
                                                <Radio
                                                    size="small"
                                                    color="default"
                                                    sx={{
                                                        color: (scheduleAnswer === value) ? "primary.main" : "gray.dark"
                                                    }}
                                                />
                                            }
                                            label={<p className="block--centered typography-note" style={(scheduleAnswer === value) ? { fontWeight: 700 } : {}}>{label}</p>}
                                            labelPlacement="bottom"
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </Container>
                    </StepContent>
                </Step>
                <TimeAnswerStepLabel testKey={"endTime"} index={2} summaryTitle={"숙소로 돌아와 쉬기"} handleStep={handleStep} isActive={activeStep === 2} />
                <Step index={3}>
                    <CheckStepButton
                        onClick={handleStep(3)}
                        isChecked={nightPlanAnswer !== undefined}
                        isActive={activeStep === 3}
                        optional={
                            (activeStep !== 3) && (nightPlanAnswer !== undefined) && nightPlanTestOptions[nightPlanAnswer].label
                        }
                    >
                        밤에는 뭘 할까
                    </CheckStepButton>
                    <StepContent>
                        <Grid container>
                            {
                                nightPlanTestOptions.map(({ value, label, icon }) => (
                                    <Grid key={icon} item xs={4} sx={{ padding: "4px", display: "flex" }}>
                                        <Paper elevation={(nightPlanAnswer === value) ? 2: 0} sx={{ backgroundColor: (nightPlanAnswer === value) ? "white" : "gray.main" }}>
                                            <ButtonBase onClick={() => setNightPlanAnswer((value === nightPlanAnswer) ? undefined : value)}>
                                                <Container className="column-padding-sm gutter-xs">
                                                    <div>
                                                        <Check color="primary" sx={(nightPlanAnswer === value) ? {} : { visibility: "hidden" }}/>
                                                    </div>                                                    
                                                    <ImageIcon name={icon} size="large" />
                                                    <p className="typography-note" style={(nightPlanAnswer === value) ? { fontWeight: 700 } : {}}>{label}</p>
                                                </Container>
                                            </ButtonBase>
                                        </Paper>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </StepContent>
                </Step>
                <Step index={-1}>
                    <StepLabel>
                        일정 끝
                    </StepLabel>
                </Step>
            </Stepper>
        </div >
    );
}
export default TimeTestContent