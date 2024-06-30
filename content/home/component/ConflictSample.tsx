import { Container, Fade, Paper, Slider, Stack, Zoom } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import ProfileAvatar from "~/components/Avatar/ProfileAvatar";
import { dailyRestaurantSliderProps } from "~/content/test/DailyRestaurantTestContent";

function ConflictSample() {

    const [show, setShow] = useState(true)
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

    const userIndexSwitchInterval = 6000

    // useEffect(() => {
    //     setInterval(() => {
    //         setShow(false)
    //     }, userIndexSwitchInterval)
    // }, [])

    // useEffect(() => {
    //     if (!show)
    //         setTimeout(() =>
    //             setShow(true),
    //             1000
    //         )
    // }, [show])

    return (
        <Container className="gutter-2xl">
            {
                show &&
                <>
                    <Fade in={show} style={{ transitionDelay: show ? `2000ms` : '0ms' }}>
                        <Paper sx={{ backgroundColor: "gray.main", transform: "scale(0.9)" }}>
                            <Container className="column-padding">
                                <p className="article">
                                    {
                                        lowDailyBudgetMemberNicknames.map((nickname, index) =>
                                            <Fragment key={nickname}>
                                                <b>{nickname}</b>
                                                {" 님, "}
                                            </Fragment>
                                        )
                                    }
                                    {"여행지의 맛있는 음식들에 대해 친구들의 이야기를 들어보고, 예산을 조정해 함께해보세요."}
                                </p>
                            </Container>
                        </Paper>
                    </Fade>
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
                                        <Zoom key={nickname} in={show} style={{ transitionDelay: show ? `${400 * index}ms` : '0ms' }}>
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
                            marginTop: "96px",
                            marginBottom: 0,
                        }}
                        value={Object.keys(answerToProfiles).map(value => Number(value))}
                        marks={Object.keys(answerToProfiles).map(value => ({
                            value: Number(value),
                            label: value
                        }))}
                        min={8000}
                        max={20000}
                    />
                </>
            }
        </Container>
    );
}
export default ConflictSample;