/* React */

/* Externals */
import { Card, CardActionArea, CardContent, CardMedia, Stack, useTheme } from "@mui/material";
import { AnimatePresence, m } from "framer-motion";

/* App */

/* GoogleMap */
import { Check } from "@mui/icons-material";
import { FADEIN } from "../../motion/props";
import { useTestAnswer } from "../../reducers/testAnswerReducer";
import getImgSrc from "../../utils/getImgSrc";

export const leadershipAnswerOptions = [
    {
        value: 1,
        label: 'passive follower',
        title: "날 끌고가줘",
        detail: "여행... 좋지... 하지만 실행력이 없는걸.\n누군가 나서서 나를 여행지로 끌고가줘",

    },
    {
        value: 2,
        label: 'active follower',
        title: "열심히 찾아볼게",
        detail: "어딜 갈지 뭘 할지 이것저것 찾아볼거야.\n하지만 결정하고 정리하는 건 누군가 해주면 좋겠어.",

    },
    {
        value: 3,
        label: 'leader',
        title: "나만 믿고 따라와",
        detail: "나는 꼼꼼하고 계획하는 걸 좋아해.\n내가 주도해서 여행을 준비하는게 마음 편해.",
    },
]

function LeadershipTestContent() {

    /* Reducers */
    const [answer, setAnswer] = useTestAnswer("leadership");

    const theme = useTheme();

    return (
        <div className="content">
            <Stack display={'flex'} width={"100%"} alignItems={"center"} height={(answer !== undefined) ? "256px" : "auto"}>
                {
                    leadershipAnswerOptions.map(({ value, title, label }) => {

                        const isActive = value === answer

                        return (
                            <m.div
                                layoutId={String(value)}
                                animate={{ flexShrink: isActive ? 0 : 1 }}
                                layout
                                transition={{
                                    duration: 0.25
                                }}
                                style={{
                                    flexBasis: "144px",
                                }}
                            >
                                <Card
                                    key={value}
                                    elevation={isActive ? 3 : 1}
                                    sx={{
                                        backgroundColor: isActive ? "white" : theme.palette.secondary.dark,
                                    }}
                                >
                                    <CardActionArea onClick={() => setAnswer(isActive ? undefined : value)} className="flex-end">
                                        <CardContent className="content content--full block--centered">
                                            {
                                                isActive && <Check color="primary" />
                                            }
                                            <h3 className={isActive ? "typography-highlight" : "typography-note"}>{title}</h3>
                                            {/* {
                                                    isActive &&
                                                    <Fade in={isActive} style={{ transitionDelay: isActive ? '500ms' : '0ms' }} >
                                                        <p>{detail}</p>
                                                    </Fade>
                                                } */}
                                        </CardContent>
                                        <CardMedia
                                            component="img"
                                            alt={label}
                                            height={"100%"}
                                            image={getImgSrc("/test", `leadership_${value}`, { size: "medium" })}
                                            srcSet={`${getImgSrc("/test", `leadership_${value}`, { size: "medium" })} 128w`}
                                            sizes={'30vw'}
                                        />
                                    </CardActionArea>
                                </Card>
                            </m.div>
                        )
                    })
                }
            </Stack>
            <AnimatePresence mode={"wait"} initial={false}>
                {(answer !== undefined) &&
                    <m.p key={answer} {...{ ...FADEIN, exit: "hidden" }} style={{ textAlign: (answer === 1) ? "start" : (answer === 2) ? "center" : "end" }}>
                        {leadershipAnswerOptions[answer - 1].detail}
                    </m.p>
                }
            </AnimatePresence>
        </div >
    );
}

export default LeadershipTestContent;