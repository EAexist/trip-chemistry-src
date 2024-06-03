/* React */

/* Externals */
import { CardContent, CardMedia, Stack } from "@mui/material";
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

function LeadershipTestContent() {

    const navigate = useNavigateWithGuestContext();

    /* Strings */
    const contentstrings = useStrings().public.contents.test;

    /* Reducers */
    const leadershipAnswer = useSelector((state: RootState) => state.testAnswer.data.leadership);

    return (
        <>
            <div className="modal__container flex-grow">
                {/* <TestInstructionModal testName="leadership" /> */}
                <Stack spacing={-4}>
                    {
                        Object.entries(contentstrings.subTest.leadership.options).map(([value, { detail }]) => (
                            <OptionCard key={value} isActive={Number(value) === leadershipAnswer}>

                                {(Number(value) === leadershipAnswer) &&
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <div className="text">
                                            <p>{detail}</p>
                                        </div>
                                    </CardContent>}

                                <CardMedia
                                    component="img"
                                    alt={value}
                                    height={"100%"}
                                    image={getImgSrc("/test", `leadership_${value}`)}
                                    srcSet={`${getImgSrc("/test", `leadership_${value}`)} 128w`}
                                    sizes={'30vw'}
                                />
                            </OptionCard>
                        ))
                    }
                </Stack>
            </div>
            <div className="block block__body--large">
                <div className="test__title">
                    <h2 className="test__title__heading typography-heading">{contentstrings.test.leadership.title}</h2>
                </div>
                <AnswerButtonGroup testName="leadership" />
                <div />
            </div>
        </>
    );
}

export default LeadershipTestContent;