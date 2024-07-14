import { Container, Paper, Slider, Stack, Zoom } from "@mui/material";
import { m, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Fragment, useRef, useState } from "react";
import ProfileAvatar from "~/components/Avatar/ProfileAvatar";
import { dailyRestaurantSliderProps } from "~/content/test/DailyRestaurantTestContent";

function ConflictSample() {

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
    const [show, setShow] = useState({
        avatar0: false,
        avatar1: false,
        avatar2: false,
        comment: false,
    })
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
    const y = useTransform(scrollYProgress, [0, 0.6], [300, 0])

    const showAvatar1 = useTransform(() => scrollYProgress.get() > 0.2).on("change", (latest) =>
        setShow((prev) => ({ ...prev, avatar0: latest }))
    )

    const showAvatar2 = useTransform(() => scrollYProgress.get() > 0.4).on("change", (latest) =>
        setShow((prev) => ({ ...prev, avatar1: latest }))
    )

    const showAvatar3 = useTransform(() => scrollYProgress.get() > 0.6).on("change", (latest) =>
        setShow((prev) => ({ ...prev, avatar2: latest }))
    )

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        console.log(`[ConflictSample] scrollYProgress=${latest} `)
    })

    return (
        <Container className="gutter-2xl block--centered column-padding" ref={ref} >
            <m.div style={{ y }}>
                <Paper sx={{ backgroundColor: "gray.main" }}>
                    <Container className="column-padding">
                        <p>
                            {
                                lowDailyBudgetMemberNicknames.map((nickname, index) =>
                                    <Fragment key={nickname}>
                                        <b>{nickname}</b>
                                        {" 님, "}
                                    </Fragment>
                                )
                            }
                            {"여행지의 맛집들에 대해 친구들의 이야기를 듣고, 예산을 조정해 함께해보세요."}
                        </p>
                    </Container>
                </Paper>
            </m.div>
            <Slider
                {...dailyRestaurantSliderProps}
                size="small"
                valueLabelDisplay="on"
                valueLabelFormat={(value, index) => (
                    Object.keys(answerToProfiles).includes(value.toString())
                    &&
                    <Stack spacing={-0.5}>
                        {
                            answerToProfiles[value].map(({ characterId, nickname }) =>
                                <Zoom key={nickname} in={show[`avatar${index}`]}>
                                    <div>
                                        <ProfileAvatar avatarId={characterId} nickname={nickname} />
                                    </div>
                                </Zoom>
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
    );
}
export default ConflictSample;