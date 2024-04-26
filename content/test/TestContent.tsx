/* React */
import { useEffect, useRef, useState } from "react";

/* Externals */
import { ExpandMore, RamenDining } from "@mui/icons-material";
import { Box, Button, ButtonBase, Card, CardContent, CardMedia, Divider, List, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, Stack } from "@mui/material";
import { m, useMotionValueEvent, useScroll } from "framer-motion";
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
import GoogleMapContext from "../../components/GoogleMap/common/GoogleMapContext";
import { OPTIONS_TEST_SCHEDULE } from "../../components/GoogleMap/common/options";
import GoogleMap from "../../components/GoogleMap/ui/GoogleMap";
// import GoogleMapMarker from "../../components/GoogleMap/ui/Marker";
import InfoWindowContext from "~/components/GoogleMap/common/InfoWindowContext";
import GoogleMapMarker from "~/components/GoogleMap/ui/GoogleMapMarker";
import Logo from "../../components/Logo";
import PngIcon from "../../components/PngIcon";
import ScrollPageContainer from "../../components/ScrollPage/ScrollPageContainer";
import ScrollPageItem from "../../components/ScrollPage/ScrollPageItem";
import { StepCheckpointContextProvider } from "../../components/Step/StepCheckpointContext";
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
import { SWIPERPROPS_CAROUSEL, SWIPERPROPS_FOODCARDCAROUSEL } from "../../swiper/props";
import { useStrings } from "../../texts";
import getImgSrc from "../../utils/getImgSrc";
import { priceText } from "../../utils/priceText";
import LoadRequiredContent, { AuthLoadRequiredContent } from "../LoadRequiredContent";
import AnswerButtonGroup from "./component/AnswerButtonGroup";
import AnswerSlider from "./component/AnswerSlider";
import TagSetTestAnswerChip from "./component/TagSetTestAnswerChip";
import TestAnswerBadge from "./component/TestAnswerBadge";
import TestInstruction from "./component/TestInstruction";
import UnAnsweredTestAlertButton from "./component/UnAnsweredTestAlertButton";

function TestContent() {

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
    const [isConfirmTooltipOpen, setIsConfirmTooltipOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [showScrollDownIcon, setShowScrollDownIcon] = useState(true);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

    const { zoom: googleMapZoom, center: googleMapCenter } = TEST.schedule.subTests.schedule.examples[scheduleAnswer as keyof typeof TEST.schedule.subTests.schedule.examples];
    
    /* 구글맵 */

    /** 실제 오픈되어 있어야 하는 Info Window. Context 에 적용. */
    const [ activeInfoWindow, setActiveInfoWindow ] = useState<google.maps.InfoWindow>(); 
    /**
     * DOM 에서 오픈되어 있는 Info Window. 
     * Active Info Window 가 변경 될 경우 기존 Active Info Window 의 close() 함수를 호출해 닫기 위해 참조. 
     * */
    const [ prevActiveInfoWindow, setPrevActiveInfoWindow ] = useState<google.maps.InfoWindow>();   

    useEffect(()=>{
        console.log(`activeInfoWindow.content=${activeInfoWindow?.getContent().toString()}`)

        // 새로운 Info Window 가 열릴 경우 기존의 Active Info Window를 닫음. Close 버튼을 눌러 Info Window를 닫을 경우 상태를 undefined 로 설정. Context의 Active Info Window 와 DOM 에서 오픈되어있는 Info Window 를 동기화.
        if ( activeInfoWindow !== prevActiveInfoWindow ){
            prevActiveInfoWindow?.close()
            setPrevActiveInfoWindow( activeInfoWindow )
        }

        // Close 버튼을 눌러 Info Window를 닫을 경우 Info Window로 인해 이동한 지도의 center를 기본값으로 초기화.
        if ( activeInfoWindow === undefined ){
            scheduleExampleMap?.panTo(googleMapCenter);
        }

    }, [ activeInfoWindow, scheduleExampleMap ])    
    
    /** Schedule 테스트 결과에 따라 
     * 1. 구글맵 zoom 변경
     * 2. 구글맵 center 이동
     * */
    useEffect(() => {
        if (scheduleAnswer !== undefined) {
            scheduleExampleMap?.setZoom(googleMapZoom);
            setActiveInfoWindow(undefined);
            scheduleExampleMap?.panTo(googleMapCenter);
        }
    }, [ scheduleAnswer, scheduleExampleMap ]);


    /* 첫 렌더 후 Scroll Resotration 중에 Top Nav 가 슬라이드 되는 모션을 방지함. */
    const [preventInitialSwipe, setPreventInitialSwipe] = useState(true);

    /* Event Handlers */
    const handleCityCardClick = (key: string, cityIndex: number) => {
        navigate(`city/${key}`, { state: { initialIndex: cityIndex } });
    };

    const handleConfirmTooltipOpen = () => {
        if (!isAllTestAnswered) {
            setIsConfirmTooltipOpen(true);
        }
    };


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

    /* Side Effects */
    /* Test Answer Side Effects */
    useEffect(() => {
        if (foodAnswer !== undefined) {
            foodCarouselSwiperRef.current?.swiper.slideTo(Object.keys(TEST.food.examples).indexOf(String(foodAnswer)));
        }
    }, [foodAnswer])


    /* Motion */
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        console.log(`[TestContent] ScrollY Change ${scrollY.get()}`);
        if (scrollY.get() > window.innerHeight) {
            setShowScrollDownIcon(false);
        }
        else {
            setShowScrollDownIcon(true);
        }
    })

    /* 첫 렌더 후 100ms 동안 Top Nav의 애니메이션 비활성화 */
    useEffect(() => {
        const timer = setTimeout(() => {
            setPreventInitialSwipe(false);
        }, 100);
    }, []);

    return (
        <LoadRequiredContent {...{
            status: submitStatus,
            setStatus: setSubmitStatus,
            handleSuccess: handleSubmitSuccess,
        }}>
            <AuthLoadRequiredContent {...{
                handleSuccess: handleLoadSuccess,
                isEnabled: isAnswerSubmitted,
            }}>
                <div className="page">
                    <LazyDomAnimation>
                        <StepContext.Provider value={{ step, setStep }}>
                            <StepCheckpointContextProvider>
                                <div className="top-nav">
                                    <m.div {...FADEIN} custom={0.2}>
                                        <Stepper className="block--with-padding-x top-nav__swiper" speed={preventInitialSwipe ? 0 : 500}>
                                            {
                                                Object.entries(TEST_SECTIONS).map(([testName, { icon }], index) =>
                                                    <SwiperSlide key={testName} className="top-nav__swiper">
                                                        <SectionButton
                                                            labelSize={"large"}
                                                            value={index}
                                                            index={index}
                                                            label={contentstrings.subTest[testName as keyof typeof contentstrings.subTest].label}
                                                            sx={{ height: "100%", display: 'flex', alignItems: 'start', paddingTop: '8px' }}
                                                            elevation={0}
                                                        >
                                                            <TestAnswerBadge testName={testName as ITestName} sx={{ height: 'fit-content', padding: "4px" }}>
                                                                <PngIcon name={testName} size={"large"} />
                                                            </TestAnswerBadge>
                                                        </SectionButton>
                                                    </SwiperSlide>
                                                )
                                            }
                                        </Stepper>
                                    </m.div>
                                    <Divider />
                                </div>
                                <ScrollPageContainer onPageChange={(page) => setStep(page)} pages={Object.keys(TEST_SECTIONS).length}>
                                    {
                                        (["expectation", "activity"] as SetTestName[]).map((testName, index) => {
                                            return (
                                                <ScrollPageItem key={testName} page={index} className="flex">
                                                    <TestSection>
                                                        {/* https://codesandbox.io/p/sandbox/6gw7p4?file=/src/App.jsx */}
                                                        <div className="flex-grow block--centered">
                                                            <div className="block--with-margin-x block__body--large">
                                                                <TestInstruction testName={testName as ITestName} />
                                                                <Stack flexWrap={"wrap"} justifyContent={"center"} rowGap={1}>
                                                                    <TagSetTestAnswerChip testName={testName} />
                                                                    <TagSetTestAnswerChip testName={testName} selected={false} />
                                                                </Stack>
                                                            </div>
                                                        </div>
                                                        <div className="block">
                                                            <div className="test__title">
                                                                <h2 className="test__title__heading typography-heading">{contentstrings.subTest[testName].title}</h2>
                                                            </div>
                                                            <div className="test__input">
                                                            </div>
                                                        </div>
                                                    </TestSection>
                                                </ScrollPageItem>
                                            )
                                        })
                                    }
                                    <ScrollPageItem key={"leadership"} page={2} className="flex">
                                        <TestSection>
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
                                                                    srcSet={`${getImgSrc("/test", `leadership_${value}` )} 128w`}
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
                                        </TestSection>
                                    </ScrollPageItem>
                                    <ScrollPageItem key={"schedule"} page={3} className="flex">
                                        <TestSection>
                                            <div className="flex-grow block--centered">
                                                <Card className="test__google-map-container modal__container" sx={{ borderRadius: "16px" }}>
                                                    <GoogleMapContext.Provider value={{ map: scheduleExampleMap as google.maps.Map, setMap: setScheduleExampleMap }}>
                                                        <InfoWindowContext.Provider value={{ activeInfoWindow, setActiveInfoWindow }}>
                                                        <GoogleMap opts={OPTIONS_TEST_SCHEDULE}>
                                                            <GoogleMapMarker {...TEST.schedule.subTests.schedule.airportPlace} />
                                                            {
                                                                (scheduleAnswer !== undefined) &&
                                                                Object.entries(TEST.schedule.subTests.schedule.examples).map(([value, { places }]) => (
                                                                    places.map((place) => (
                                                                        // <GoogleMapMarker key={place.label} {...place} isActive={Number(value) <= scheduleAnswer} />
                                                                        <GoogleMapMarker key={place.label} {...place} isActive={Number(value) <= scheduleAnswer} />
                                                                    ))
                                                                ))
                                                            }
                                                        </GoogleMap>
                                                        </InfoWindowContext.Provider>
                                                    </GoogleMapContext.Provider>
                                                </Card>
                                            </div>
                                            <div className="block block__body--large">
                                                <div className="test__title">
                                                    <h2 className="test__title__heading typography-heading">{contentstrings.test.schedule.title}</h2>
                                                </div>
                                                <AnswerButtonGroup testName="schedule" />
                                                <div />
                                            </div>
                                        </TestSection>
                                    </ScrollPageItem>
                                    <ScrollPageItem key={"budget"} page={4} className="flex">
                                        <TestSection >
                                            {/* https://codesandbox.io/p/sandbox/6gw7p4?file=/src/App.jsx */}
                                            <div className="flex-grow block--centered">
                                                <Swiper {...SWIPERPROPS_FOODCARDCAROUSEL} className="carousel__swiper modal__container" ref={foodCarouselSwiperRef}>
                                                    <TestInstruction testName="food" showBackdrop={true} className="block--centered" />
                                                    {
                                                        Object.values(TEST.food.examples).map((id, index) => (
                                                            // <SwiperSlide key={id} className="carousel__swiper-slide--coverflow" style={{ width: "196px", height: "196px", borderRadius: "12px" }}>
                                                            <SwiperSlide key={id} className="carousel__swiper-slide--coverflow" style={{ width: "fit-content" }}>
                                                                {({ isActive }) => {
                                                                    return (
                                                                        id === "more"
                                                                            ? (
                                                                                isActive ?
                                                                                    <m.div style={{ width: isActive ? "100vw" : "auto" }} layout layoutId="box" >
                                                                                        <Box sx={{ borderRadius: "12px", bgcolor: 'gray.light', ...isActive ? {} : { width: "196px", height: "196px" } }} className={`block--centered ${isActive ? "block--with-margin-x" : ""}`}>
                                                                                            {/* <AnimatePresence mode={"wait"} initial={false}> */}
                                                                                            <List>
                                                                                                <ListSubheader sx={{ textAlign: "start", bgcolor: 'transparent' }} className="block--with-margin-x">더 많은 식당 찾아보기</ListSubheader>
                                                                                                {
                                                                                                    TEST.food.more.map((source) => (
                                                                                                        <ListItemButton href={LINK[source as keyof typeof LINK].link} key={source} className="block--with-padding-x">
                                                                                                            <ListItemAvatar>
                                                                                                                <Logo id={source} size="large" />
                                                                                                            </ListItemAvatar>
                                                                                                            <ListItemText
                                                                                                                primary={
                                                                                                                    <h3 className="typography-label">{commonStrings.linkType[source as keyof typeof commonStrings.linkType].name}</h3>
                                                                                                                }
                                                                                                                secondary={
                                                                                                                    <p className="">{commonStrings.linkType[source as keyof typeof commonStrings.linkType].body}</p>
                                                                                                                }
                                                                                                            />
                                                                                                        </ListItemButton>
                                                                                                    ))
                                                                                                }
                                                                                            </List>
                                                                                            {/* </AnimatePresence> */}
                                                                                        </Box>
                                                                                    </m.div>
                                                                                    :
                                                                                    <m.div layout layoutId="box">
                                                                                        <Box sx={{ borderRadius: "12px", bgcolor: 'gray.light', width: "196px", height: "196px" }} className={`block--centered`} >
                                                                                            <RamenDining />
                                                                                        </Box>
                                                                                    </m.div>
                                                                            )
                                                                            : <FoodImageCard id={id} isActive={isActive} />
                                                                    )
                                                                }}
                                                            </SwiperSlide>
                                                        ))
                                                    }
                                                </Swiper>
                                            </div>
                                            <div className="block block__body">
                                                <div className="test__title">
                                                    <h2 className="test__title__heading typography-heading">{contentstrings.subTest.food.title}</h2>
                                                </div>
                                                {
                                                    foodAnswer !== undefined
                                                        ? <h4 className='typography-test-answer'>
                                                            {priceText(foodAnswer)} {(foodAnswer === SLIDERPROPS_TEST_BUDGET_FOOD.max) ? '이상' : ''}
                                                        </h4>
                                                        // : <h4 className='typography-test-answer'>? 원</h4>
                                                        : <></>
                                                }
                                                {/* <div className="container--center" style={{ marginTop: 0 }}> */}
                                                <AnswerSlider testName="food" {...SLIDERPROPS_TEST_BUDGET_FOOD} />
                                                {/* </div> */}
                                                <div />
                                            </div>
                                        </TestSection>
                                    </ScrollPageItem>
                                    {/* </SectionPaperWithStep> */}
                                    {
                                        Object.entries(TEST.city.subTests).map(([key, { examples }], index) => (
                                            // <SectionPaperWithStep key={key} index={0e="section">
                                            <ScrollPageItem key={key} page={5 + index} className="flex">
                                                <TestSection >
                                                    <div className="flex-grow block--centered">
                                                        {/* <h4 className='carousel__title'>{contentstrings.subTest[key as keyof typeof contentstrings.subTest].title}</h4> */}
                                                        <Swiper {...SWIPERPROPS_CAROUSEL} className="carousel__swiper">
                                                            {
                                                                examples.map((cityId, index) => (
                                                                    <SwiperSlide key={cityId} className="carousel__swiper-slide--auto">
                                                                        <ButtonBase onClick={() => handleCityCardClick(key, index)} className="block--full">
                                                                            <div className="block__body">
                                                                                <ImageCard
                                                                                    src={getImgSrc("/city", cityId )}
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
                                                                    ? contentstrings.subTest[key as keyof typeof contentstrings.subTest].title
                                                                    : (
                                                                        text === "/particle"
                                                                            ? contentstrings.subTest[key as keyof typeof contentstrings.subTest].particle
                                                                            : text
                                                                    )
                                                            ))}</h2>
                                                        </div>
                                                        <AnswerButtonGroup testName={key as NumericTestName} />
                                                        <div />
                                                    </div>
                                                </TestSection>
                                            </ScrollPageItem>
                                        ))
                                    }
                                </ScrollPageContainer>
                                {
                                    !isAllTestAnswered &&
                                    <div className="flex block--with-margin" style={{ marginTop: 0 }}>
                                        <UnAnsweredTestAlertButton />
                                    </div>
                                }
                                <div className="flex block--with-margin" style={{ marginTop: 0 }}>
                                    <Button
                                        onClick={handleConfirmButtonClick}
                                        disabled={!isAllTestAnswered}
                                        variant="contained"
                                        className="button--full"
                                    >
                                        {contentstrings.main.confirmButton}
                                    </Button>
                                </div>
                            </StepCheckpointContextProvider>
                        </StepContext.Provider>
                        {
                            showScrollDownIcon
                            &&
                            <m.div
                                animate={{ opacity: [1, 0.2, 1] }}
                                transition={{
                                    duration: 2.5,
                                    times: [0, 0.5, 1],
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                }}
                                className="floating--bottom block--centered"
                            >
                                <ExpandMore className="typography-gray block--with-margin" sx={{ fontSize: "40px" }} />
                            </m.div>
                        }
                    </LazyDomAnimation>
                </div >
            </AuthLoadRequiredContent>
        </LoadRequiredContent >
    );
}
export default withReducer(TestContent)({ testAnswer: testAnswerReducer })