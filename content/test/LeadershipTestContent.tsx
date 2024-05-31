/* React */
import { useCallback, useEffect, useRef, useState } from "react";

/* Externals */
import { Close, ExpandMore, NavigateNext, RamenDining } from "@mui/icons-material";
import { Alert, Box, Button, ButtonBase, Card, CardActions, CardContent, CardMedia, Divider, Grow, IconButton, List, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, Modal, Stack } from "@mui/material";
import { m } from "framer-motion";
import { useSelector } from "react-redux";
import LazyDomAnimation from "../../motion/LazyDomAnimation";

/* Swiper */
import 'swiper/css';
import 'swiper/css/effect-coverflow'; /* Food Carousel */
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

/* App */
import { CITY, LINK, NATION, SLIDERPROPS_TEST_BUDGET_FOOD, TEST, TEST_SECTIONS } from "../../common/app-const";
import TestSection from "../../components/Block/TestSection";
import FoodImageCard from "../../components/Card/FoodImageCard";
import ImageCard from "../../components/Card/ImageCard";
import OptionCard from "../../components/Card/OptionCard";
import Flag from "../../components/Flag";

/* GoogleMap */
import InfoWindowContext from "~/components/GoogleMap/common/InfoWindowContext";
import GoogleMapMarker from "~/components/GoogleMap/ui/GoogleMapMarker";
import GoogleMapContext from "../../components/GoogleMap/common/GoogleMapContext";
import { OPTIONS_TEST_SCHEDULE } from "../../components/GoogleMap/common/options";
import GoogleMap from "../../components/GoogleMap/ui/GoogleMap";

import { EffectCoverflow } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import Logo from "../../components/Logo";
import PngIcon from "../../components/PngIcon";
import ScrollPageContainer from "../../components/ScrollPage/ScrollPageContainer";
import ScrollPageItem from "../../components/ScrollPage/ScrollPageItem";
import StepCheckpointContext, { IdToIndex } from "../../components/Step/StepCheckpointContext";
import StepContext from "../../components/Step/StepContext";
import SectionButton from "../../components/Step/components/SectionButton";
import Stepper from "../../components/Step/components/Stepper";
import withReducer from "../../hocs/withReducer";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { ITestName } from "../../interfaces/ITestAnswer";
import { FADEIN } from "../../motion/props";
import { useGetProfile } from "../../reducers/authReducer";
import testAnswerReducer, { NumericTestName, SetTestName, useIsAllTestAnswered, useSubmitAnswer, useTestAnswerStatus } from "../../reducers/testAnswerReducer";
import { RootState } from "../../store";
import { SWIPERPROPS_CAROUSEL } from "../../swiper/props";
import { useStrings } from "../../texts";
import getImgSrc, { FORMATSVG } from "../../utils/getImgSrc";
import { priceText } from "../../utils/priceText";
import LoadRequiredContent, { AuthLoadRequiredContent } from "../LoadRequiredContent";
import AnswerButtonGroup from "./component/AnswerButtonGroup";
import AnswerSlider from "./component/AnswerSlider";
import TagSetTestAnswerChip from "./component/TagSetTestAnswerChip";
import TestAnswerBadge from "./component/TestAnswerBadge";
import TestInstruction from "./component/TestInstruction";
import UnAnsweredTestAlertButton from "./component/UnAnsweredTestAlertButton";

function LeadershipTestContent() {

    const navigate = useNavigateWithGuestContext();

    /* Strings */
    const contentstrings = useStrings().public.contents.test;
    const commonStrings = useStrings().public.common;

    /* Reducers */
    const leadershipAnswer = useSelector((state: RootState) => state.testAnswer.data.leadership);
    const scheduleAnswer = useSelector((state: RootState) => state.testAnswer.data.schedule) as number;
    const foodAnswer = useSelector((state: RootState) => state.testAnswer.data.food) as number;

    const isAllTestAnswered = useIsAllTestAnswered();

    const getProfile = useGetProfile();
    const submitAnswer = useSubmitAnswer();
    const [submitStatus, setSubmitStatus] = useTestAnswerStatus();

    /* States */
    const foodCarouselSwiperRef = useRef<SwiperRef>(null);
    const [scheduleExampleMap, setScheduleExampleMap] = useState<google.maps.Map | null>();
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

    /* Step */
    const [step, setStep] = useState(0);

    /* StepCheckpoint */
    const [idToIndex, setIdToIndex] = useState<IdToIndex>({} as IdToIndex)
    const stepCheckpointList = useRef<HTMLDivElement[]>([]);


    /* Scroll Down */
    const showScrollDownIcon = step < 1;
    const [showScrollDownAlert, setShowScrollDownAlert] = useState(false);
    const alertTimeout = 2000;

    const handleScrollDownButtonClick = () => {
        setShowScrollDownAlert(true);
    }
    useEffect(() => {
        if (showScrollDownAlert) {
            let timer = setTimeout(() => { setShowScrollDownAlert(false) }, alertTimeout);
        }
    }, [showScrollDownAlert])

    /* 구글맵 */
    const { zoom: googleMapZoom, center: googleMapCenter } = TEST.schedule.subTests.schedule.examples[scheduleAnswer as keyof typeof TEST.schedule.subTests.schedule.examples];

    /** 실제 오픈되어 있어야 하는 Info Window. Context 에 적용. */
    const [selectedInfoWindow, setSelectedInfoWindow] = useState<google.maps.InfoWindow>();
    /**
     * DOM 에서 오픈되어 있는 Info Window. 
     * Active Info Window 가 변경 될 경우 기존 Active Info Window 의 close() 함수를 호출해 닫기 위해 참조. 
     * [Deprecated] InfoWindow 및 Marker View 변화 로직은 모두 GoogleMapMarker 로 이동.
     * 부모 컴포넌트(LeadershipTestContent)에서는 activeGoogleMarker 를 참조하는 state 하나와 activeGoogleMarker 가 없을 경우 지도 초기화 로직만 관리.   
     * */
    // const [prevActiveInfoWindow, setPrevActiveInfoWindow] = useState<google.maps.InfoWindow>();

    const [showMapTitle, setShowMapTitle] = useState(false);

    useEffect(() => {
        console.log(`selectedInfoWindow.content=${selectedInfoWindow?.getContent().toString()}`)

        /**
         * 새로운 Info Window 가 열릴 경우 기존의 Active Info Window를 닫음. Close 버튼을 눌러 Info Window를 닫을 경우 상태를 undefined 로 설정. Context의 Active Info Window 와 DOM 에서 오픈되어있는 Info Window 를 동기화. 
         * [ Deprecated ] prevActiveInfoWindow 참고.       
         *  */
        // if ( selectedInfoWindow !== prevActiveInfoWindow ){
        //     prevActiveInfoWindow?.close()
        //     setPrevActiveInfoWindow( selectedInfoWindow )
        // }

        // Close 버튼을 눌러 Info Window를 닫을 경우 Info Window로 인해 이동한 지도의 center를 기본값으로 초기화.
        if (selectedInfoWindow === undefined) {
            scheduleExampleMap?.panTo(googleMapCenter);
        }

    }, [selectedInfoWindow, scheduleExampleMap])

    /** Schedule 테스트 결과에 따라 
     * 1. 구글맵 zoom 변경
     * 2. 구글맵 center 이동
     * */
    useEffect(() => {
        if (scheduleAnswer !== undefined) {
            scheduleExampleMap?.setZoom(googleMapZoom);
            setSelectedInfoWindow(undefined);
            scheduleExampleMap?.panTo(googleMapCenter);
        }
    }, [scheduleAnswer, scheduleExampleMap]);


    /* 첫 렌더 후 Scroll Resotration 중에 Top Nav 가 슬라이드 되는 모션을 방지함. */
    const [preventInitialSwipe, setPreventInitialSwipe] = useState(true);

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

    /* Event Handlers */
    const handleCityCardClick = (key: string, cityIndex: number) => {
        navigate(`city/${key}`, { state: { initialIndex: cityIndex, navigateDirection: 'next' } });
    };

    // useCallback(() => {
    //     if (stepCheckpointList.current.length > 1) {
    //         stepCheckpointList.current[1].scrollIntoView();
    //     }
    // }, [stepCheckpointList])

    const handleConfirmButtonClick = () => {
        submitAnswer();
    }

    const handleSubmitSuccess = () => {
        setIsAnswerSubmitted(true);
        getProfile();
    };
    const handleLoadSuccess = () => {
        navigate('../result');
    }

    /* 첫 렌더 후 100ms 동안 Top Nav의 애니메이션 비활성화 */
    useEffect(() => {
        const timer = setTimeout(() => {
            setPreventInitialSwipe(false);
        }, 100);
    }, []);

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