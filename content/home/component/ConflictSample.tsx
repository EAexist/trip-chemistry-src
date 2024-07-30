import { useRef } from "react";
import { Alert, Container, Slider, SliderProps, Stack } from "@mui/material";
import { m, useScroll } from "framer-motion";
import ProfileAvatar from "../../../components/Avatar/ProfileAvatar";
import { VARIANTS_FADEIN_FROMBOTTOM } from "../../../motion/props";

function ConflictSample() {
    const sliderProps: SliderProps = {
        step : 4000,
        min : 4000,
        max : 24000,
        getAriaLabel: () => "daily restaurant budget",
        marks: [
            {
                value: 4000,
                label: 4000
            },
            {
                value: 8000,
            },
            {
                value: 12000,
                label: 12000
            },
            {
                value: 16000,
            },
            {
                value: 20000,
                label: 20000
            },
            {
                value: 24000,
            },
        ]
    };
    
    const answerToProfiles = {
        8000:
            [
                {
                    
                    characterId: "racoon",
                    nickname: "민지"
                },
                {
                    characterId: "bee",
                    nickname: "해린"
                }
            ],
        16000:
            [
                {
                    characterId: "sloth",
                    nickname: "혜인"
                },
                {
                    characterId: "sloth",
                    nickname: "다니엘"
                }
            ],
        20000:
            [
                {
                    characterId: "panda",
                    nickname: "하니"
                }
            ],
    }

    const lowDailyBudgetMemberNicknames = ["민지", "해린"]

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });

    return (
        <>
            <Container ref={ref} sx={{ marginBottom: "16px" }}>
                <m.div variants={VARIANTS_FADEIN_FROMBOTTOM} viewport={{ once: false }}>
                    <Alert severity="info" sx={{ textAlign: "start", paddingLeft: "16px", paddingRight: "16px" }} className="typography-note--lg">
                        <b>{lowDailyBudgetMemberNicknames[0]}</b>
                        {" 님, 여행지의 맛집에 대해 친구들의 이야기를 듣고 예산을 조정해 함께해보세요."}
                    </Alert>
                </m.div>
            </Container>
            <Container className="gutter-2xl block--centered content" ref={ref}>
                <Slider
                    {...sliderProps}
                    size="small"
                    valueLabelDisplay="on"
                    valueLabelFormat={(value, index) => (
                        Object.keys(answerToProfiles).includes(value.toString())
                        &&
                        <Stack spacing={-0.5}>
                            {
                                answerToProfiles[value].map(({ characterId, nickname }) =>
                                    <ProfileAvatar key={nickname} avatarId={characterId} nickname={nickname} sx={(nickname===lowDailyBudgetMemberNicknames[0]) ? { backgroundColor: "rgb(229, 246, 253)", outline: "2px solid", outlineColor: "info.main", zIndex: 2 } : {}} />
                                )
                            }
                        </Stack>
                    )}
                    track={false}
                    sx={{
                        '& .MuiSlider-valueLabel': {
                            background: 'unset',
                        },
                        '& .MuiSlider-markLabel': {
                            fontSize: 12,
                            width: "48px",
                            whiteSpace: "pre-line",
                            textAlign: "center"
                        },
                        '& .Mui-disabled': {
                            color: "primary.main"
                        },
                        marginTop: "64px",
                        marginBottom: "32px",
                    }}
                    value={Object.keys(answerToProfiles).map(value => Number(value))}
                    marks={Object.keys(answerToProfiles).map(value => ({
                        value: Number(value),
                        label: value
                    }))}
                    min={8000}
                    max={20000}
                />
            </Container>
        </>
    );
}
export default ConflictSample;