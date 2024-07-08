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

function LeadershipTestContent() {

    const navigate = useNavigateWithGuestContext();

    /* Strings */
    const contentstrings = useStrings().public.contents.test;
    const optionStrings = Object(useStrings().public.contents.test.test.leadership.options);

    /* Reducers */
    const [answer, setAnswer] = useTestAnswer("leadership");

    const theme= useTheme();

    return (
            <div className="content">
                <div className="modal__container flex-grow">
                    <Stack display={'flex'} width={"100%"} alignItems={"end"}>
                        {
                            Object.entries(contentstrings.subTest.leadership.options).map(([value, { detail }]) => {

                                const isActive = Number(value) === answer

                                return (
                                    <m.div
                                        layoutId={value}
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
                                        <CardActionArea onClick={() => setAnswer(isActive ? undefined : Number(value))} className="flex-end">
                                            <CardContent className="content content--full block--centered">
                                                {
                                                    isActive && <Check color="primary"/>
                                                }
                                                <h3 className={ isActive ? "typography-highlight" : "typography-note"}>{ optionStrings[value].label }</h3>
                                                {/* {
                                                    isActive &&
                                                    <Fade in={isActive} style={{ transitionDelay: isActive ? '500ms' : '0ms' }} >
                                                        <p>{detail}</p>
                                                    </Fade>
                                                } */}
                                            </CardContent>
                                            <CardMedia
                                                component="img"
                                                alt={value}
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
                    <AnimatePresence>
                    <m.p>

                    </m.p>
                    </AnimatePresence>
                </div>
                <div />
            </div >
    );
}

export default LeadershipTestContent;