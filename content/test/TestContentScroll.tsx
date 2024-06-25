// /* React */
// import { useEffect, useRef, useState } from "react";

// /* Externals */
// import { Close, ExpandMore } from "@mui/icons-material";
// import { Alert, Button, Divider, IconButton, Modal, Toolbar } from "@mui/material";
// import { m } from "framer-motion";

// /* Swiper */
// import 'swiper/css';
// import 'swiper/css/effect-coverflow'; /* Food Carousel */
// import { SwiperSlide } from 'swiper/react';

// /* App */

// /* Contents */

// import TestSection from "../../components/Block/TestSection";

// import LazyImage from "~/components/LazyImage";
// import getImgSrc from "~/utils/getImgSrc";
// import PngIcon from "../../components/PngIcon";
// import ScrollPageContainer from "../../components/ScrollPage/ScrollPageContainer";
// import ScrollPageItem from "../../components/ScrollPage/ScrollPageItem";
// import SectionButton from "../../components/Step/components/SectionButton";
// import Stepper from "../../components/Step/components/Stepper";
// import StepCheckpointContext, { IdToIndex } from "../../components/Step/StepCheckpointContext";
// import StepContext from "../../components/Step/StepContext";
// import withReducer from "../../hocs/withReducer";
// import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
// import { FADEIN } from "../../motion/props";
// import { useGetProfile } from "../../reducers/authReducer";
// import testAnswerReducer, { ITestIndex, useIsAllTestAnswered, useSubmitAnswer, useTestAnswerStatus } from "../../reducers/testAnswerReducer";
// import { useStrings } from "../../texts";
// import LoadRequiredContent, { AuthLoadRequiredContent } from "../LoadRequiredContent";
// import TestAnswerBadge from "./component/TestAnswerBadge";
// import UnAnsweredTestAlertButton from "./component/UnAnsweredTestAlertButton";
// import { TEST_SECTIONS } from "./TestContent";

// const TEST_SECTIONS_WITH_CONFIRM = {
//     ...TEST_SECTIONS,
//     type: "confirm",
//     icon: "confirm",
//     label: "결과 확인",
//     tests: [],
//     contentComponent: undefined
// }

// function TestContent() {

//     const navigate = useNavigateWithGuestContext();

//     /* Strings */
//     const contentstrings = useStrings().public.contents.test;

//     const isAllTestAnswered = useIsAllTestAnswered();

//     const getProfile = useGetProfile();
//     const submitAnswer = useSubmitAnswer();
//     const [submitStatus, setSubmitStatus] = useTestAnswerStatus();

//     /* States */
//     const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

//     /* Step */
//     const [ page, setPage ] = useState(0);
//     const [step, setStep] = useState(0);

//     /* StepCheckpoint */
//     const [idToIndex, setIdToIndex] = useState<IdToIndex>({} as IdToIndex)
//     const stepCheckpointList = useRef<HTMLDivElement[]>([]);

//     /* Scroll Down */
//     const showScrollDownIcon = step < 1;
//     const [showScrollDownAlert, setShowScrollDownAlert] = useState(false);
//     const alertTimeout = 2000;

//     const handleScrollDownButtonClick = () => {
//         setShowScrollDownAlert(true);
//     }
//     useEffect(() => {
//         if (showScrollDownAlert) {
//             let timer = setTimeout(() => { setShowScrollDownAlert(false) }, alertTimeout);
//         }
//     }, [showScrollDownAlert])

//     /* 첫 렌더 후 Scroll Resotration 중에 Top Nav 가 슬라이드 되는 모션을 방지함. */
//     const [preventInitialSwipe, setPreventInitialSwipe] = useState(true);

//     const handleConfirmButtonClick = () => {
//         submitAnswer();
//     }

//     const handleFabClick = () => {

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
//                         <StepContext.Provider value={{ step, setStep }}>
//                             <StepCheckpointContext.Provider value={{ idToIndex: idToIndex, setIdToIndex: setIdToIndex, stepCheckpointList: stepCheckpointList }}>
//                                 <div className="top-nav">
//                                     <m.div {...FADEIN} custom={0.2}>
//                                         <Stepper className="wrapper top-nav__swiper" speed={preventInitialSwipe ? 0 : 500}>
//                                             {
//                                                 Object.entries(TEST_SECTIONS_WITH_CONFIRM).map(([sectionName, { tests, icon, label }], index) =>
//                                                     <SwiperSlide key={sectionName} className="top-nav__swiper">
//                                                         <SectionButton
//                                                             labelSize={"large"}
//                                                             value={index}
//                                                             index={index}
//                                                             label={label}
//                                                             sx={{ height: "100%", display: 'flex', alignItems: 'start', paddingTop: '8px' }}
//                                                             elevation={0}
//                                                         >{
//                                                                 <TestAnswerBadge invisible={sectionName.length === 0} tests={tests as ITestIndex[]} sx={{ height: 'fit-content', padding: "4px" }}>
//                                                                     <PngIcon name={icon} size={"large"} />
//                                                                 </TestAnswerBadge>
//                                                             }
//                                                         </SectionButton>
//                                                     </SwiperSlide>
//                                                 )
//                                             }
//                                         </Stepper>
//                                     </m.div>
//                                     <Divider />
//                                 </div>
//                                 <ScrollPageContainer page={page} setPage={setPage} onPageChange={(page) => setStep(page)} pages={Object.keys(TEST_SECTIONS_WITH_CONFIRM).length}>
//                                     {
//                                         Object.entries(TEST_SECTIONS_WITH_CONFIRM).map(([id, { contentComponent }], index) => (
//                                             <ScrollPageItem key={id} page={index} className="flex">
//                                                 <div style={{ height: '100%', overflow: 'hidden' }}>
//                                                     <Toolbar />
//                                                     <div className="wrapper" style={{ flexGrow: 1 }}>
//                                                         {contentComponent && contentComponent}
//                                                         {
//                                                             (id === "confirm") &&
//                                                             <>

//                                                                 <LazyImage
//                                                                     alt={"alt"}
//                                                                     src={getImgSrc('/info', "info", { size: "xlarge" })}
//                                                                     width={"256px"}
//                                                                     height={"256px"}
//                                                                     containerClassName="NoticeBlock__image"
//                                                                 />
//                                                                 {
//                                                                     isAllTestAnswered
//                                                                         ?
//                                                                         <Button
//                                                                             onClick={handleConfirmButtonClick}
//                                                                             disabled={!isAllTestAnswered}
//                                                                             variant="contained"
//                                                                             className="block--with-padding"
//                                                                             style={{ marginTop: 0 }}
//                                                                         >
//                                                                             결과 확인하기
//                                                                         </Button>
//                                                                         :
//                                                                         <div>
//                                                                             <UnAnsweredTestAlertButton />
//                                                                         </div>
//                                                                 }
//                                                             </>}
//                                                     </div>
//                                                 </div>
//                                             </ScrollPageItem>
//                                         ))
//                                     }
//                                     <ScrollPageItem key={"confirm"} page={8} className="flex">
//                                         <TestSection className="block--centered content">
//                                         </TestSection>
//                                     </ScrollPageItem>
//                                 </ScrollPageContainer>
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
//                                     <ExpandMore className="typography-gray" sx={{ fontSize: "40px", color: "rgb(107, 118, 132)" }} />
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
//                                     <Alert
//                                         action={
//                                             <IconButton
//                                                 aria-label="close"
//                                                 color="inherit"
//                                                 size="small"
//                                                 onClick={() => {
//                                                     setShowScrollDownAlert(false);
//                                                 }}
//                                             >
//                                                 <Close fontSize="inherit" />
//                                             </IconButton>
//                                         }
//                                         severity="info"
//                                         className="block--with-margin block--with-margin--large block--with-padding"
//                                     >
//                                         아래로 스크롤해보세요.
//                                     </Alert>
//                                 </div>
//                             </Modal>
//                         }
//                 </div >
//             </AuthLoadRequiredContent>
//         </LoadRequiredContent >
//     );
// }
// export default withReducer(TestContent)({ testAnswer: testAnswerReducer })