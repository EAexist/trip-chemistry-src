/* React */

/* Externals */
import { Card, CardActionArea, CardContent, CardMedia, Stack, useTheme } from "@mui/material";

/* Swiper */
import 'swiper/css';
import 'swiper/css/effect-coverflow'; /* Food Carousel */

/* App */

/* GoogleMap */
import { Check } from "@mui/icons-material";
import { TEST_SECTIONS } from "~/common/app-const";
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
                                            backgroundColor: isActive ? "white" : theme.palette.secondary.dark,
                                            borderRadius: "12px",
                                            // flexBasis: isActive ? "50%" : "25%",
                                            flexBasis: "144px",
                                            // flexGrow: isActive ? 1 : 0
                                            flexShrink: isActive ? 0 : 1
                                        }}
                                    >
                                        <CardActionArea onClick={() => setAnswer(Number(value))} className="flex-end">
                                            <CardContent className="content content--full" sx={{ textAlign: 'center' }}>
                                                {
                                                    isActive && <Check color="primary"/>
                                                }
                                                <p className={ isActive ? "typography-label" : "typography-note"}><b>{ optionStrings[value].label }</b></p>
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
    );
}

export default LeadershipTestContent;