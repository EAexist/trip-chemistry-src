/* React */

/* Externals */
import { Card, CardActionArea, CardContent, CardMedia, Fade, Stack, useTheme } from "@mui/material";
import { AnimatePresence, m } from "framer-motion";

/* App */

/* GoogleMap */
import { Check } from "@mui/icons-material";
import { useTestAnswer } from "~/reducers/testAnswerReducer";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { useStrings } from "../../texts";
import getImgSrc from "../../utils/getImgSrc";
import { FADEIN } from "~/motion/props";

function LeadershipTestContent() {

    const navigate = useNavigateWithGuestContext();

    /* Strings */
    const contentstrings = useStrings().public.contents.test;
    const optionStrings = Object(useStrings().public.contents.test.test.leadership.options);

    /* Reducers */
    const [answer, setAnswer] = useTestAnswer("leadership");

    const theme = useTheme();
    const options = [
        {
            value: 1,
            label: "잘 따르는 팀원",
            detail: "여행... 좋지... 하지만 실행력이 없는걸.\n누군가 나서서 나를 여행지로 끌고가줘",

        },
        {
            value: 2,
            label: "적극적인 팀원",
            detail: "어딜 갈지 뭘 할지 이것저것 찾아볼거야.\n하지만 결정하고 정리하는 건 누군가 해주면 좋겠어.",

        },
        {
            value: 3,
            label: "믿음직한 리더",
            detail: "나는 꼼꼼하고 계획하는 걸 좋아해.\n내가 주도해서 여행을 준비하는게 마음 편해.",
        },
    ]

    return (
        <div className="content">
            <div className="modal__container flex-grow">
                <Stack display={'flex'} width={"100%"} alignItems={"center"} height={(answer !== undefined) ? "256px" : "auto"}>
                    {
                        options.map(({ value, label, detail }) => {

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
                                        flexBasis: "128px",
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
                                                <h3 className={isActive ? "typography-highlight" : "typography-note"}>{label}</h3>
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
                                                image={getImgSrc("/test", `leadership_${value}`)}
                                                srcSet={`${getImgSrc("/test", `leadership_${value}`)} 128w`}
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
                            {options[answer - 1].detail}
                        </m.p>
                    }
                </AnimatePresence>
            </div>
            <div />
        </div >
    );
}

export default LeadershipTestContent;