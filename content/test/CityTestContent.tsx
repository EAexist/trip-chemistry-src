/* React */

/* Externals */
import { ButtonBase, Stack } from "@mui/material";

/* Swiper */
import 'swiper/css';
import 'swiper/css/effect-coverflow'; /* Food Carousel */
import { Swiper, SwiperSlide } from 'swiper/react';

/* App */
import { CITY, NATION, TEST } from "../../common/app-const";
import ImageCard from "../../components/Card/ImageCard";
import Flag from "../../components/Flag";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { NumericTestName } from "../../reducers/testAnswerReducer";
import { SWIPERPROPS_CAROUSEL } from "../../swiper/props";
import { useStrings } from "../../texts";
import getImgSrc from "../../utils/getImgSrc";
import AnswerButtonGroup from "./component/AnswerButtonGroup";

interface CityTestContentProps {
    id: string
}

function CityTestContent({ id } : CityTestContentProps) {

    const navigate = useNavigateWithGuestContext();

    /* Strings */
    const contentstrings = useStrings().public.contents.test;
    const commonStrings = useStrings().public.common;

    /* Constants */
    const examples = TEST.city.subTests[id].examples;

    /* Event Handlers */
    const handleCityCardClick = (key: string, cityIndex: number) => {
        navigate(`city/${key}`, { state: { initialIndex: cityIndex, navigateDirection: 'next' } });
    };

    return (
        <>
            <div className="flex-grow block--centered">
                {/* <h4 className='carousel__title'>{contentstrings.subTest[key as keyof typeof contentstrings.subTest].title}</h4> */}
                <Swiper {...SWIPERPROPS_CAROUSEL} className="carousel__swiper">
                    {
                        examples.map((cityId, index) => (
                            <SwiperSlide key={cityId} className="carousel__swiper-slide--auto">
                                <ButtonBase onClick={() => handleCityCardClick(id, index)} className="block--full">
                                    <div className="block__body">
                                        <ImageCard
                                            src={getImgSrc("/city", cityId)}
                                            title={cityId}
                                            sx={{ width: "196px", height: "196px" }}
                                            className="body__head"
                                        />
                                        <Stack>
                                            <h3 className="typography-label">{commonStrings.city[cityId as keyof typeof commonStrings.city].name}</h3>
                                            {
                                                NATION[CITY[cityId as keyof typeof CITY].nation as keyof typeof NATION].flag
                                                && <Flag id={CITY[cityId as keyof typeof CITY].nation} />
                                            }
                                        </Stack>
                                    </div>
                                </ButtonBase>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <div className="block block__body--large">
                <div className="test__title body__head">
                    <h2 className="test__title__heading typography-heading">{contentstrings.test.city.titleTextList.map((text) => (
                        text === "/testName"
                            ? contentstrings.subTest[id as keyof typeof contentstrings.subTest].title
                            : (
                                text === "/particle"
                                    ? contentstrings.subTest[id as keyof typeof contentstrings.subTest].particle
                                    : text
                            )
                    ))}</h2>
                </div>
                <AnswerButtonGroup testName={id as NumericTestName} />
                <div />
            </div>
        </>
    );
}
export default CityTestContent