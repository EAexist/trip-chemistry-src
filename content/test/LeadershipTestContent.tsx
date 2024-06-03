/* React */

/* Externals */
import { Card, CardActionArea, CardContent, CardMedia, Stack, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

/* Swiper */
import 'swiper/css';
import 'swiper/css/effect-coverflow'; /* Food Carousel */

/* App */
import OptionCard from "../../components/Card/OptionCard";

/* GoogleMap */

import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { RootState } from "../../store";
import { useStrings } from "../../texts";
import getImgSrc from "../../utils/getImgSrc";
import AnswerButtonGroup from "./component/AnswerButtonGroup";
import { useTestAnswer } from "~/reducers/testAnswerReducer";
import { TEST_SECTIONS } from "~/common/app-const";
import { Check } from "@mui/icons-material";

function LeadershipTestContent() {

    const navigate = useNavigateWithGuestContext();

    /* Strings */
    const contentstrings = useStrings().public.contents.test;
    const strings = Object(useStrings().public.contents.test.test)[TEST_SECTIONS.leadership.type];

    /* Reducers */
    const [answer, setAnswer] = useTestAnswer("leadership");

    const theme= useTheme();

    return (
        <>
            <div className="block block__body--large">
                <div className="test__title">
                    <h2 className="test__title__heading typography-heading">{contentstrings.test.leadership.title}</h2>
                </div>
                <div className="modal__container flex-grow">
                    <Stack display={'flex'} width={"100%"}>
                        {
                            Object.entries(contentstrings.subTest.leadership.options).map(([value, { detail }]) => {

                                const isActive = Number(value) === answer

                                return (
                                    <Card
                                        key={value}
                                        elevation={isActive ? 3 : 1}                                
                                        // elevation={1}
                                        sx={{
                                            zIndex: isActive ? "2" : "1",
                                            // opacity: isActive ? "1" : "0.5",
                                            backgroundColor: isActive ? "white" : theme.palette.secondary.dark,
                                            // scale: isActive ? "1" : "0.8",
                                            borderRadius: "12px",
                                            transformOrigin: "top center",
                                            flexBasis: isActive ? "50%" : "25%",
                                        }}
                                    >
                                        <CardActionArea onClick={() => setAnswer(Number(value))} className="flex-end">
                                            <CardContent className="block__body" sx={{ textAlign: 'center' }}>
                                                {
                                                    isActive && <Check color="primary"/>
                                                }
                                                <p className={ isActive ? "typography-label" : "typography-note"}><b>{ strings.answers[value].label }</b></p>
                                                {
                                                    isActive &&
                                                    <>
                                                        <p>{detail}</p>
                                                    </>
                                                }
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
                                )
                            })
                        }
                    </Stack>
                </div>
                <div />
            </div >
        </>
    );
}

export default LeadershipTestContent;