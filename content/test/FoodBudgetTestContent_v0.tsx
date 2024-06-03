// /* React */
// import { useEffect, useRef } from "react";

// /* Externals */
// import { RamenDining } from "@mui/icons-material";
// import { Box, List, ListItemAvatar, ListItemButton, ListItemText, ListSubheader } from "@mui/material";
// import { m } from "framer-motion";
// import { useSelector } from "react-redux";

// /* Swiper */
// import 'swiper/css';
// import 'swiper/css/effect-coverflow'; /* Food Carousel */
// import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

// /* App */
// import { EffectCoverflow } from "swiper/modules";
// import { SwiperOptions } from "swiper/types";
// import { LINK, TEST } from "../../common/app-const";
// import FoodImageCard from "../../components/Card/FoodImageCard";
// import Logo from "../../components/Logo";
// import withReducer from "../../hocs/withReducer";
// import testAnswerReducer from "../../reducers/testAnswerReducer";
// import { RootState } from "../../store";
// import { useStrings } from "../../texts";
// import { priceText } from "../../utils/priceText";
// import AnswerSlider from "./component/AnswerSlider";
// import TestInstruction from "./component/TestInstruction";

// function TestContent() {

//     /* Strings */
//     const contentstrings = useStrings().public.contents.test;
//     const commonStrings = useStrings().public.common;


//     const SLIDERPROPS_TEST_BUDGET_FOOD = {
//         step: 5000,
//         min: 5000,
//         max: 50000,
//         "aria-label": "budget"
//     };

//     /* Reducers */
//     const restaurantAnswer = useSelector((state: RootState) => state.testAnswer.data.restaurant) as number;
//     /* States */
//     const restaurantCarouselSwiperRef = useRef<SwiperRef>(null);

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

//     return (
//         <>
//             {/* https://codesandbox.io/p/sandbox/6gw7p4?file=/src/App.jsx */}
//             <div className="flex-grow block--centered">
//                 <Swiper {...SWIPERPROPS_FOODCARDCAROUSEL} className="carousel__swiper modal__container" ref={restaurantCarouselSwiperRef}>
//                     <TestInstruction testName="dailyRestaurantBudget" showBackdrop={true} className="block--centered" />
//                     {
//                         Object.values(TEST.restaurant.examples).map((id, index) => (
//                             // <SwiperSlide key={id} className="carousel__swiper-slide--coverflow" style={{ width: "196px", height: "196px", borderRadius: "12px" }}>
//                             <SwiperSlide key={id} className="carousel__swiper-slide--coverflow" style={{ width: "fit-content" }}>
//                                 {({ isActive }) => {
//                                     return (
//                                         id === "more"
//                                             ? (
//                                                 isActive ?
//                                                     <m.div style={{ width: isActive ? "100vw" : "auto" }} layout layoutId="box" >
//                                                         <Box sx={{ borderRadius: "12px", bgcolor: 'gray.light', ...isActive ? {} : { width: "196px", height: "196px" } }} className={`block--centered ${isActive ? "block--with-margin-x" : ""}`}>
//                                                             {/* <AnimatePresence mode={"wait"} initial={false}> */}
//                                                             <List>
//                                                                 <ListSubheader sx={{ textAlign: "start", bgcolor: 'transparent' }} className="block--with-margin-x">더 많은 식당 찾아보기</ListSubheader>
//                                                                 {
//                                                                     TEST.restaurant.more.map((source) => (
//                                                                         <ListItemButton href={LINK[source as keyof typeof LINK].link} key={source} className="block--with-padding-x">
//                                                                             <ListItemAvatar>
//                                                                                 <Logo id={source} size="large" />
//                                                                             </ListItemAvatar>
//                                                                             <ListItemText
//                                                                                 primary={
//                                                                                     <h3 className="typography-label">{commonStrings.linkType[source as keyof typeof commonStrings.linkType].name}</h3>
//                                                                                 }
//                                                                                 secondary={
//                                                                                     <p className="">{commonStrings.linkType[source as keyof typeof commonStrings.linkType].body}</p>
//                                                                                 }
//                                                                             />
//                                                                         </ListItemButton>
//                                                                     ))
//                                                                 }
//                                                             </List>
//                                                             {/* </AnimatePresence> */}
//                                                         </Box>
//                                                     </m.div>
//                                                     :
//                                                     <m.div layout layoutId="box">
//                                                         <Box sx={{ borderRadius: "12px", bgcolor: 'gray.light', width: "196px", height: "196px" }} className={`block--centered`} >
//                                                             <RamenDining />
//                                                         </Box>
//                                                     </m.div>
//                                             )
//                                             : <FoodImageCard id={id} isActive={isActive} />
//                                     )
//                                 }}
//                             </SwiperSlide>
//                         ))
//                     }
//                 </Swiper>
//             </div>
//             <div className="block block__body">
//                 <div className="test__title">
//                     <h2 className="test__title__heading typography-heading">{contentstrings.subTest.restaurant.title}</h2>
//                 </div>
//                 {
//                     restaurantAnswer !== undefined
//                         ? <h4 className='typography-test-answer'>
//                             {priceText(restaurantAnswer)} {(restaurantAnswer === SLIDERPROPS_TEST_BUDGET_FOOD.max) ? '이상' : ''}
//                         </h4>
//                         // : <h4 className='typography-test-answer'>? 원</h4>
//                         : <></>
//                 }
//                 {/* <div className="container--center" style={{ marginTop: 0 }}> */}
//                 <AnswerSlider testName="dailyRestaurantBudget" {...SLIDERPROPS_TEST_BUDGET_FOOD} />
//                 {/* </div> */}
//                 <div />
//             </div>
//         </>
//     );
// }
// export default withReducer(TestContent)({ testAnswer: testAnswerReducer })