// /* React */
// import { useCallback, useEffect, useRef, useState } from "react";

// /* Externals */
// import { Close, ExpandMore, NavigateNext, RamenDining } from "@mui/icons-material";
// import { Alert, Box, Button, ButtonBase, Card, CardActions, CardContent, CardMedia, Divider, Grow, IconButton, List, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, Modal, Stack } from "@mui/material";
// import { m } from "framer-motion";
// 
// import LazyDomAnimation from "../motion/LazyDomAnimation";

// /* Swiper */
// import 'swiper/css';
// import 'swiper/css/effect-coverflow'; /* Food Carousel */
// import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

// /* App */
// import { CITIES, LINK, NATION, SLIDERPROPS_TEST_BUDGET_FOOD, TEST, TEST_SECTIONS } from "../common/app-const";
// import TestSection from "../components/Block/TestSection";
// import FoodImageCard from "../components/Card/FoodImageCard";
// import ImageCard from "../components/Card/ImageCard";
// import OptionCard from "../components/Card/OptionCard";
// import Flag from "../components/Flag";

// /* GoogleMap */
// import InfoWindowContext from "~/components/GoogleMap/common/InfoWindowContext";
// import GoogleMapMarker from "~/components/GoogleMap/ui/GoogleMapMarker";
// import GoogleMapContext from "../components/GoogleMap/common/GoogleMapContext";
// import { OPTIONS_TEST_SCHEDULE } from "../components/GoogleMap/common/options";
// import GoogleMap from "../components/GoogleMap/ui/GoogleMap";

// import { EffectCoverflow } from "swiper/modules";
// import { SwiperOptions } from "swiper/types";
// import Logo from "../components/Logo";
// import PngIcon from "../components/PngIcon";
// import ScrollPageContainer from "../components/ScrollPage/ScrollPageContainer";
// import ScrollPageItem from "../components/ScrollPage/ScrollPageItem";
// import StepCheckpointContext, { IdToIndex } from "../components/Step/StepCheckpointContext";
// import StepContext from "../components/Step/StepContext";
// import SectionButton from "../components/Step/components/SectionButton";
// import Stepper from "../components/Step/components/Stepper";
// import withReducer from "../hocs/withReducer";
// import useNavigateWithGuestContext from "../hooks/useNavigateWithGuestContext";
// import { ITestKey } from "../interfaces/ITestAnswer";
// import { FADEIN } from "../motion/props";
// import { useGetProfile } from "../reducers/authReducer";
// import testAnswerReducer, { INumericTestKey, IHashTagTestKey, useIsAllTestAnswered, useSubmitAnswer, useTestAnswerStatus } from "../reducers/testAnswerReducer";
// 
// import { SWIPERPROPS_CAROUSEL } from "../swiper/props";
// import { useStrings } from "../texts";
// import getImgSrc, { FORMATSVG } from "../utils/getImgSrc";
// import { priceText } from "../utils/priceText";
// import LoadRequiredContent, { AuthLoadRequiredContent } from "../content/LoadRequiredContent";
// import AnswerButtonGroup from "../content/test/component/AnswerButtonGroup";
// import AnswerSlider from "../content/test/component/AnswerSlider";
// import TagSetTestAnswerChip from "../content/test/component/TagSetTestAnswerChip";
// import TestAnswerBadge from "../content/test/component/TestAnswerBadge";
// import TestInstruction from "../content/test/component/TestInstruction";
// import UnAnsweredTestAlertButton from "../content/test/component/UnAnsweredTestAlertButton";

// function TestMockupContent() {

//     const navigate = useNavigateWithGuestContext();

//     /* Strings */
//     const contentstrings = useStrings().public.contents.test;
//     const commonStrings = useStrings().public.common;

//     /* Reducers */
//     const leadershipAnswer = useAppSelector((state) => state.testAnswer.data.leadership);
//     const scheduleAnswer = useAppSelector((state) => state.testAnswer.data.schedule) as number;
//     const restaurantAnswer = useAppSelector((state) => state.testAnswer.data.restaurant) as number;

//     const isAllTestAnswered = useIsAllTestAnswered();

//     const getProfile = useGetProfile();
//     const submitAnswer = useSubmitAnswer();
//     const [submitStatus, setSubmitStatus] = useTestAnswerStatus();

//     /* States */
//     const restaurantCarouselSwiperRef = useRef<SwiperRef>(null);
//     const [scheduleExampleMap, setScheduleExampleMap] = useState<google.maps.Map | null>();
//     const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

//     /* Step */
//     const [step, setStep] = useState(0);

//     /* StepCheckpoint */
//     const [idToIndex, setIdToIndex] = useState<IdToIndex>({} as IdToIndex)
//     const stepCheckpointList = useRef<HTMLDivElement[]>([]);


//     /* Scroll Down */   
//     const showScrollDownIcon = step < 1;
//     const [showScrollDownAlert, setShowScrollDownAlert] = useState(false);
//     const alertTimeout = 2000;

//     const handleScrollDownButtonClick = () =>{
//         setShowScrollDownAlert(true);
//     }
//     useEffect(() => {
//         if (showScrollDownAlert) {
//             let timer = setTimeout(() => { setShowScrollDownAlert(false) }, alertTimeout );
//         }
//     }, [showScrollDownAlert])

//     /* 구글맵 */
//     const { zoom: googleMapZoom, center: googleMapCenter } = TEST.schedule.subTests.schedule.examples[scheduleAnswer as keyof typeof TEST.schedule.subTests.schedule.examples];

//     /** 실제 오픈되어 있어야 하는 Info Window. Context 에 적용. */
//     const [selectedInfoWindow, setSelectedInfoWindow] = useState<google.maps.InfoWindow>();
//     /**
//      * DOM 에서 오픈되어 있는 Info Window. 
//      * Active Info Window 가 변경 될 경우 기존 Active Info Window 의 close() 함수를 호출해 닫기 위해 참조. 
//      * [Deprecated] InfoWindow 및 Marker View 변화 로직은 모두 GoogleMapMarker 로 이동.
//      * 부모 컴포넌트(TestMockupContent)에서는 activeGoogleMarker 를 참조하는 state 하나와 activeGoogleMarker 가 없을 경우 지도 초기화 로직만 관리.   
//      * */
//     // const [prevActiveInfoWindow, setPrevActiveInfoWindow] = useState<google.maps.InfoWindow>();

//     const [showMapTitle, setShowMapTitle] = useState(false);

//     useEffect(() => {
//         console.log(`selectedInfoWindow.content=${selectedInfoWindow?.getContent().toString()}`)

//         /**
//          * 새로운 Info Window 가 열릴 경우 기존의 Active Info Window를 닫음. Close 버튼을 눌러 Info Window를 닫을 경우 상태를 undefined 로 설정. Context의 Active Info Window 와 DOM 에서 오픈되어있는 Info Window 를 동기화. 
//          * [ Deprecated ] prevActiveInfoWindow 참고.       
//          *  */
//         // if ( selectedInfoWindow !== prevActiveInfoWindow ){
//         //     prevActiveInfoWindow?.close()
//         //     setPrevActiveInfoWindow( selectedInfoWindow )
//         // }

//         // Close 버튼을 눌러 Info Window를 닫을 경우 Info Window로 인해 이동한 지도의 center를 기본값으로 초기화.
//         if (selectedInfoWindow === undefined) {
//             scheduleExampleMap?.panTo(googleMapCenter);
//         }

//     }, [selectedInfoWindow, scheduleExampleMap])

//     /** Schedule 테스트 결과에 따라 
//      * 1. 구글맵 zoom 변경
//      * 2. 구글맵 center 이동
//      * */
//     useEffect(() => {
//         if (scheduleAnswer !== undefined) {
//             scheduleExampleMap?.setZoom(googleMapZoom);
//             setSelectedInfoWindow(undefined);
//             scheduleExampleMap?.panTo(googleMapCenter);
//         }
//     }, [scheduleAnswer, scheduleExampleMap]);


//     /* 첫 렌더 후 Scroll Resotration 중에 Top Nav 가 슬라이드 되는 모션을 방지함. */
//     const [preventInitialSwipe, setPreventInitialSwipe] = useState(true);

//     /* Food */
//     const SWIPERPROPS_FOODCARDCAROUSEL: SwiperOptions = {
//         modules: [EffectCoverflow],
//         effect: 'coverflow',
//         coverflowEffect: {
//             rotate: 0,
//             scale: 0.8,
//             slideShadows: false,
//             // depth: 350,
//             // stretch: -16,
//         },
//         speed: 800,
//         slidesPerView: 'auto',
//         allowTouchMove: false,
//         centeredSlides: true,
//     }

//     useEffect(() => {
//         if (restaurantAnswer !== undefined) {
//             restaurantCarouselSwiperRef.current?.swiper.slideTo(Object.keys(TEST.restaurant.examples).indexOf(String(restaurantAnswer)));
//         }
//     }, [restaurantAnswer])

//     /* Event Handlers */
//     const handleCityCardClick = (key: string, cityIndex: number) => {
//         navigate(`city/${key}`, { state: { initialIndex: cityIndex, navigateDirection: 'next' } });
//     };
    
//     // useCallback(() => {
//     //     if (stepCheckpointList.current.length > 1) {
//     //         stepCheckpointList.current[1].scrollIntoView();
//     //     }
//     // }, [stepCheckpointList])

//     const handleConfirmButtonClick = () => {
//         submitAnswer();
//     }

//     const handleSubmitSuccess = () => {
//         setIsAnswerSubmitted(true);
//         getProfile();
//     };
//     const handleLoadSuccess = () => {
//         navigate('../result');
//     }

//     /* 첫 렌더 후 100ms 동안 Top Nav의 애니메이션 비활성화 */
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setPreventInitialSwipe(false);
//         }, 100);
//     }, []);

//     return (
//         <LoadRequiredContent {...{
//             status: submitStatus,
//             setStatus: setSubmitStatus,
//             handleSuccess: handleSubmitSuccess,
//         }}>
//             <AuthLoadRequiredContent {...{
//                 handleSuccess: handleLoadSuccess,
//                 isEnabled: isAnswerSubmitted,
//             }}>
//                 <div className="page">
//                     <LazyDomAnimation>
//                         <StepContext.Provider value={{ step, setStep }}>
//                             <StepCheckpointContext.Provider value={{ idToIndex: idToIndex, setIdToIndex: setIdToIndex, stepCheckpointList: stepCheckpointList }}>
//                                 {/* <div className="top-nav">
//                                     <m.div {...FADEIN} custom={0.2}>
//                                         <Stepper className="block--with-padding-x top-nav__swiper" speed={preventInitialSwipe ? 0 : 500}>
//                                             {
//                                                 Object.entries(TEST_SECTIONS).map(([testKey, { icon }], index) =>
//                                                     <SwiperSlide key={testKey} className="top-nav__swiper">
//                                                         <SectionButton
//                                                             labelSize={"large"}
//                                                             value={index}
//                                                             index={index}
//                                                             label={contentstrings.subTest[testKey as keyof typeof contentstrings.subTest].label}
//                                                             sx={{ height: "100%", display: 'flex', alignItems: 'start', paddingTop: '8px' }}
//                                                             elevation={0}
//                                                         >
//                                                             <TestAnswerBadge testKey={testKey as ITestKey} sx={{ height: 'fit-content', padding: "4px" }}>
//                                                                 <PngIcon name={testKey} size={"large"} />
//                                                             </TestAnswerBadge>
//                                                         </SectionButton>
//                                                     </SwiperSlide>
//                                                 )
//                                             }
//                                         </Stepper>
//                                     </m.div>
//                                     <Divider />
//                                 </div> */}
//                                 <ScrollPageContainer onPageChange={(page) => setStep(page)} pages={Object.keys(TEST_SECTIONS).length}>
//                                     {
//                                         (["expectation", "activity"] as IHashTagTestKey[]).map((testKey, index) => {
//                                             return (
//                                                 <ScrollPageItem key={testKey} page={index} className="flex">
//                                                     <TestSection>
//                                                         {/* https://codesandbox.io/p/sandbox/6gw7p4?file=/src/App.jsx */}
//                                                         <div className="flex-grow block--centered">
//                                                             <div className="block--with-margin-x content content--large">
//                                                                 <TestInstruction testKey={testKey as ITestKey} />
//                                                                 <Stack flexWrap={"wrap"} justifyContent={"center"} rowGap={1}>
//                                                                     <TagSetTestAnswerChip testKey={testKey} />
//                                                                     <TagSetTestAnswerChip testKey={testKey} selected={false} />
//                                                                 </Stack>
//                                                             </div>
//                                                         </div>
//                                                         <div className="block">
//                                                             <div className="test__title">
//                                                                 <h2 className="test__title__heading typography-heading">{contentstrings.subTest[testKey].title}</h2>
//                                                             </div>
//                                                             <div className="test__input">
//                                                             </div>
//                                                         </div>
//                                                     </TestSection>
//                                                 </ScrollPageItem>
//                                             )
//                                         })
//                                     }
//                                     <ScrollPageItem key={"leadership"} page={2} className="flex">
//                                         <TestSection>
//                                             <div className="modal__container flex-grow">
//                                                 {/* <TestInstructionModal testKey="leadership" /> */}
//                                                 <Stack spacing={-4}>
//                                                     {
//                                                         Object.entries(contentstrings.subTest.leadership.options).map(([value, { detail }]) => (
//                                                             <OptionCard key={value} isActive={Number(value) === leadershipAnswer}>

//                                                                 {(Number(value) === leadershipAnswer) &&
//                                                                     <CardContent sx={{ textAlign: 'center' }}>
//                                                                         <div className="text">
//                                                                             <p>{detail}</p>
//                                                                         </div>
//                                                                     </CardContent>}

//                                                                 <CardMedia
//                                                                     component="img"
//                                                                     alt={value}
//                                                                     height={"100%"}
//                                                                     image={getImgSrc("/test", `leadership_${value}`)}
//                                                                     srcSet={`${getImgSrc("/test", `leadership_${value}`)} 128w`}
//                                                                     sizes={'30vw'}
//                                                                 />
//                                                             </OptionCard>
//                                                         ))
//                                                     }
//                                                 </Stack>
//                                             </div>
//                                             <div className="block content content--large">
//                                                 <div className="test__title">
//                                                     <h2 className="test__title__heading typography-heading">{contentstrings.test.leadership.title}</h2>
//                                                 </div>
//                                                 <AnswerButtonGroup testKey="leadership" />
//                                                 <div />
//                                             </div>
//                                         </TestSection>
//                                     </ScrollPageItem>
//                                     <ScrollPageItem key={"schedule"} page={3} className="flex">
//                                         <TestSection>
//                                             <div className="flex-grow block--centered">
//                                                 <div className="test__google-map-container modal__container block--round block--round--large" style={{ overflow: "hidden" }}>
//                                                     <div style={{ position: "absolute", top: 8, left: 8, zIndex: 1 }}>
//                                                         {
//                                                             showMapTitle ?
//                                                                 <Grow in={showMapTitle}>
//                                                                     <Card sx={{ borderRadius: '16px' }}>
//                                                                         <IconButton onClick={() => setShowMapTitle(false)} sx={{ position: "absolute", top: 0, right: 0 }} size="small">
//                                                                             <Close fontSize="small" />
//                                                                         </IconButton>
//                                                                         <CardContent>
//                                                                             <h2 className="typography-note">Based On</h2>
//                                                                             <p className="typography-label">{"재하 님의\n후쿠오카 여행"}</p>
//                                                                         </CardContent>
//                                                                         <CardActions>
//                                                                             <Button href={"https://blog.naver.com/jcjw1234"} startIcon={<Logo id={"naver-blog"} format={FORMATSVG} size="small" />} endIcon={<NavigateNext />} size="small" className="typography-note">
//                                                                                 블로그에서 더 보기
//                                                                             </Button>
//                                                                         </CardActions>
//                                                                     </Card>
//                                                                 </Grow>
//                                                                 :
//                                                                 <Button onClick={() => setShowMapTitle(true)} startIcon={<Logo id={"naver-blog"} format={FORMATSVG} size="small" />} endIcon={<NavigateNext fontSize="inherit" sx={{ marginLeft: "-4px" }} />} size="small" className="typography-label" sx={{ textTransform: 'none' }}>
//                                                                     Based On 재하 님의 후쿠오카 여행

//                                                                 </Button>
//                                                         }
//                                                     </div>
//                                                     <GoogleMapContext.Provider value={{ map: scheduleExampleMap as google.maps.Map, setMap: setScheduleExampleMap }}>
//                                                         <GoogleMap opts={OPTIONS_TEST_SCHEDULE}>
//                                                             <InfoWindowContext.Provider value={{ selectedInfoWindow, setSelectedInfoWindow }}>
//                                                                 <GoogleMapMarker {...TEST.schedule.subTests.schedule.airportPlace} />
//                                                                 {
//                                                                     (scheduleAnswer !== undefined) &&
//                                                                     Object.entries(TEST.schedule.subTests.schedule.examples).map(([value, { places }]) => (
//                                                                         places.map((place) => (
//                                                                             <GoogleMapMarker key={place.label} {...place} isActive={Number(value) <= scheduleAnswer} />
//                                                                         ))
//                                                                     ))
//                                                                 }
//                                                             </InfoWindowContext.Provider>
//                                                         </GoogleMap>
//                                                     </GoogleMapContext.Provider>
//                                                 </div>
//                                             </div>
//                                             <div className="block content content--large">
//                                                 <div className="test__title">
//                                                     <h2 className="test__title__heading typography-heading">{contentstrings.test.schedule.title}</h2>
//                                                 </div>
//                                                 <AnswerButtonGroup testKey="schedule" />
//                                                 <div />
//                                             </div>
//                                         </TestSection>
//                                     </ScrollPageItem>
//                                     <ScrollPageItem key={"budget"} page={4} className="flex">
//                                         <TestSection >
//                                             {/* https://codesandbox.io/p/sandbox/6gw7p4?file=/src/App.jsx */}
//                                             <div className="flex-grow block--centered">
//                                                 <Swiper {...SWIPERPROPS_FOODCARDCAROUSEL} className="carousel__swiper modal__container" ref={restaurantCarouselSwiperRef}>
//                                                     <TestInstruction testKey="dailyRestaurantBudget" showBackdrop={true} className="block--centered" />
//                                                     {
//                                                         Object.values(TEST.restaurant.examples).map((id, index) => (
//                                                             // <SwiperSlide key={id} className="carousel__swiper-slide--coverflow" style={{ width: "196px", height: "196px", borderRadius: "12px" }}>
//                                                             <SwiperSlide key={id} className="carousel__swiper-slide--coverflow" style={{ width: "fit-content" }}>
//                                                                 {({ isActive }) => {
//                                                                     return (
//                                                                         id === "more"
//                                                                             ? (
//                                                                                 isActive ?
//                                                                                     <m.div style={{ width: isActive ? "100vw" : "auto" }} layout layoutId="box" >
//                                                                                         <Box sx={{ borderRadius: "12px", bgcolor: 'gray.light', ...isActive ? {} : { width: "196px", height: "196px" } }} className={`block--centered ${isActive ? "block--with-margin-x" : ""}`}>
//                                                                                             {/* <AnimatePresence mode={"wait"} initial={false}> */}
//                                                                                             <List>
//                                                                                                 <ListSubheader sx={{ textAlign: "start", bgcolor: 'transparent' }} className="block--with-margin-x">더 많은 식당 찾아보기</ListSubheader>
//                                                                                                 {
//                                                                                                     TEST.restaurant.more.map((source) => (
//                                                                                                         <ListItemButton href={LINK[source as keyof typeof LINK].link} key={source} className="block--with-padding-x">
//                                                                                                             <ListItemAvatar>
//                                                                                                                 <Logo id={source} size="large" />
//                                                                                                             </ListItemAvatar>
//                                                                                                             <ListItemText
//                                                                                                                 primary={
//                                                                                                                     <h3 className="typography-label">{commonStrings.linkType[source as keyof typeof commonStrings.linkType].name}</h3>
//                                                                                                                 }
//                                                                                                                 secondary={
//                                                                                                                     <p className="">{commonStrings.linkType[source as keyof typeof commonStrings.linkType].body}</p>
//                                                                                                                 }
//                                                                                                             />
//                                                                                                         </ListItemButton>
//                                                                                                     ))
//                                                                                                 }
//                                                                                             </List>
//                                                                                             {/* </AnimatePresence> */}
//                                                                                         </Box>
//                                                                                     </m.div>
//                                                                                     :
//                                                                                     <m.div layout layoutId="box">
//                                                                                         <Box sx={{ borderRadius: "12px", bgcolor: 'gray.light', width: "196px", height: "196px" }} className={`block--centered`} >
//                                                                                             <RamenDining />
//                                                                                         </Box>
//                                                                                     </m.div>
//                                                                             )
//                                                                             : <FoodImageCard id={id} isActive={isActive} />
//                                                                     )
//                                                                 }}
//                                                             </SwiperSlide>
//                                                         ))
//                                                     }
//                                                 </Swiper>
//                                             </div>
//                                             <div className="block content">
//                                                 <div className="test__title">
//                                                     <h2 className="test__title__heading typography-heading">{contentstrings.subTest.restaurant.title}</h2>
//                                                 </div>
//                                                 {
//                                                     restaurantAnswer !== undefined
//                                                         ? <h4 className='typography-test-answer'>
//                                                             {priceText(restaurantAnswer)} {(restaurantAnswer === SLIDERPROPS_TEST_BUDGET_FOOD.max) ? '이상' : ''}
//                                                         </h4>
//                                                         // : <h4 className='typography-test-answer'>? 원</h4>
//                                                         : <></>
//                                                 }
//                                                 {/* <div className="container--center" style={{ marginTop: 0 }}> */}
//                                                 <AnswerSlider testKey="dailyRestaurantBudget" {...SLIDERPROPS_TEST_BUDGET_FOOD} />
//                                                 {/* </div> */}
//                                                 <div />
//                                             </div>
//                                         </TestSection>
//                                     </ScrollPageItem>
//                                     {/* </SectionPaperWithStep> */}
//                                     {
//                                         Object.entries(TEST.city.subTests).map(([key, { examples }], index) => (
//                                             // <SectionPaperWithStep key={key} index={0e="section">
//                                             <ScrollPageItem key={key} page={5 + index} className="flex">
//                                                 <TestSection >
//                                                     <div className="flex-grow block--centered">
//                                                         {/* <h4 className='carousel__title'>{contentstrings.subTest[key as keyof typeof contentstrings.subTest].title}</h4> */}
//                                                         <Swiper {...SWIPERPROPS_CAROUSEL} className="carousel__swiper">
//                                                             {
//                                                                 examples.map((cityId, index) => (
//                                                                     <SwiperSlide key={cityId} className="carousel__swiper-slide--auto">
//                                                                         <ButtonBase onClick={() => handleCityCardClick(key, index)} className="block--full">
//                                                                             <div className="content">
//                                                                                 <ImageCard
//                                                                                     src={getImgSrc("/city", cityId)}
//                                                                                     title={cityId}
//                                                                                     sx={{ width: "196px", height: "196px" }}
//                                                                                    
//                                                                                 />
//                                                                                 <Stack>
//                                                                                     <h3 className="typography-label">{commonStrings.city[cityId as keyof typeof commonStrings.city].name}</h3>
//                                                                                     {
//                                                                                         NATION[CITIES[cityId as keyof typeof CITIES].nation as keyof typeof NATION].flag
//                                                                                         && <Flag id={CITIES[cityId as keyof typeof CITIES].nation} />
//                                                                                     }
//                                                                                 </Stack>
//                                                                             </div>
//                                                                         </ButtonBase>
//                                                                     </SwiperSlide>
//                                                                 ))
//                                                             }
//                                                         </Swiper>
//                                                     </div>
//                                                     <div className="block content content--large">
//                                                         <div className="test__title">
//                                                             <h2 className="test__title__heading typography-heading">{contentstrings.test.city.titleTextList.map((text) => (
//                                                                 text === "/testKey"
//                                                                     ? contentstrings.subTest[key as keyof typeof contentstrings.subTest].title
//                                                                     : (
//                                                                         text === "/particle"
//                                                                             ? contentstrings.subTest[key as keyof typeof contentstrings.subTest].particle
//                                                                             : text
//                                                                     )
//                                                             ))}</h2>
//                                                         </div>
//                                                         <AnswerButtonGroup testKey={key as INumericTestKey} />
//                                                         <div />
//                                                     </div>
//                                                 </TestSection>
//                                             </ScrollPageItem>
//                                         ))
//                                     }
//                                 </ScrollPageContainer>
//                                 {
//                                     !isAllTestAnswered &&
//                                     <div className="flex block--with-margin" style={{ marginTop: 0 }}>
//                                         <UnAnsweredTestAlertButton />
//                                     </div>
//                                 }
//                                 <div className="flex">
//                                     <Button
//                                         onClick={handleConfirmButtonClick}
//                                         disabled={!isAllTestAnswered}
//                                         variant="contained"
//                                         className="block--with-padding block--with-margin block--with-margin--large"
//                                         style={{ marginTop: 0 }}
//                                     >
//                                         {contentstrings.main.confirmButton}
//                                     </Button>
//                                 </div>
//                             </StepCheckpointContext.Provider>
//                         </StepContext.Provider>
//                         {
//                             showScrollDownIcon
//                             &&
//                             <m.div
//                                 animate={{ opacity: [1, 0.2, 1] }}
//                                 transition={{
//                                     duration: 2.5,
//                                     times: [0, 0.5, 1],
//                                     ease: "easeInOut",
//                                     repeat: Infinity,
//                                 }}
//                                 className="floating--bottom block--centered"
//                                 style={{ marginBottom: "2rem" }}
//                             >
//                                 <IconButton onClick={handleScrollDownButtonClick}>
//                                     <ExpandMore className="typography-gray" sx={{ fontSize: "40px" }} />
//                                 </IconButton>
//                             </m.div>
//                         }
//                         {
//                             <Modal
//                                 open={showScrollDownAlert}
//                                 onClose={() => setShowScrollDownAlert(false)}
//                                 hideBackdrop={true}
//                                 disableScrollLock
//                             >
//                                 <div className="floating--bottom">
//                                 <Alert
//                                     action={
//                                         <IconButton
//                                             aria-label="close"
//                                             color="inherit"
//                                             size="small"
//                                             onClick={() => {
//                                                 setShowScrollDownAlert(false);
//                                             }}
//                                         >
//                                             <Close fontSize="inherit" />
//                                         </IconButton>
//                                     }
//                                     severity="info"
//                                     className="block--with-margin block--with-margin--large block--with-padding"
//                                 >
//                                     아래로 스크롤해보세요.
//                                 </Alert>
//                                 </div>
//                             </Modal>
//                         }
//                     </LazyDomAnimation>
//                 </div >
//             </AuthLoadRequiredContent>
//         </LoadRequiredContent >
//     );
// }
// export default withReducer(TestMockupContent)({ testAnswer: testAnswerReducer })