/* React */
import { useEffect, useRef } from "react";

/* Externals */
import { RamenDining } from "@mui/icons-material";
import { Box, List, ListItemAvatar, ListItemButton, ListItemText, ListSubheader } from "@mui/material";
import { m } from "framer-motion";
import { useSelector } from "react-redux";

/* Swiper */
import 'swiper/css';
import 'swiper/css/effect-coverflow'; /* Food Carousel */
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

/* App */
import { LINK, SLIDERPROPS_TEST_BUDGET_FOOD, TEST } from "../../common/app-const";
import FoodImageCard from "../../components/Card/FoodImageCard";
import { EffectCoverflow } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import Logo from "../../components/Logo";
import withReducer from "../../hocs/withReducer";
import testAnswerReducer from "../../reducers/testAnswerReducer";
import { RootState } from "../../store";
import { useStrings } from "../../texts";
import { priceText } from "../../utils/priceText";
import AnswerSlider from "./component/AnswerSlider";
import TestInstruction from "./component/TestInstruction";

function TestContent() {

    /* Strings */
    const contentstrings = useStrings().public.contents.test;
    const commonStrings = useStrings().public.common;

    /* Reducers */
    const foodAnswer = useSelector((state: RootState) => state.testAnswer.data.food) as number;
    /* States */
    const foodCarouselSwiperRef = useRef<SwiperRef>(null);

    /* Food */
    const SWIPERPROPS_FOODCARDCAROUSEL: SwiperOptions = {
        modules: [EffectCoverflow],
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            scale: 0.8,
            slideShadows: false,
            // depth: 350,
            // stretch: -16,
        },
        speed: 800,
        slidesPerView: 'auto',
        allowTouchMove: false,
        centeredSlides: true,
    }

    useEffect(() => {
        if (foodAnswer !== undefined) {
            foodCarouselSwiperRef.current?.swiper.slideTo(Object.keys(TEST.food.examples).indexOf(String(foodAnswer)));
        }
    }, [foodAnswer])

    return (
        <>
            <div className="block block__body">
                <div className="test__title">
                    <h2 className="test__title__heading typography-heading">{contentstrings.subTest.food.title}</h2>
                </div>
                <h3 className="typography-body"> 여행지의 비싸지만 특별한 유명 레스토랑 </h3>
                {
                    foodAnswer !== undefined
                        ? <h4 className='typography-test-answer'>
                            {priceText(foodAnswer)} {(foodAnswer === SLIDERPROPS_TEST_BUDGET_FOOD.max) ? '이상' : ''}
                        </h4>
                        // : <h4 className='typography-test-answer'>? 원</h4>
                        : <></>
                }
                <AnswerSlider testName="food" {...SLIDERPROPS_TEST_BUDGET_FOOD} />
                <div />
            </div>
        </>
    );
}
export default withReducer(TestContent)({ testAnswer: testAnswerReducer })