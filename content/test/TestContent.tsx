/* React */
import { useEffect, useRef, useState } from "react";

/* Externals */
import { Close, ExpandMore } from "@mui/icons-material";
import { Alert, Button, Divider, IconButton, Modal } from "@mui/material";
import { m } from "framer-motion";
import LazyDomAnimation from "../../motion/LazyDomAnimation";

/* Swiper */
import 'swiper/css';
import 'swiper/css/effect-coverflow'; /* Food Carousel */
import { SwiperSlide } from 'swiper/react';

/* App */
import { TEST, TEST_SECTIONS } from "../../common/app-const";
import TestSection from "../../components/Block/TestSection";

/* GoogleMap */

import PngIcon from "../../components/PngIcon";
import ScrollPageContainer from "../../components/ScrollPage/ScrollPageContainer";
import ScrollPageItem from "../../components/ScrollPage/ScrollPageItem";
import SectionButton from "../../components/Step/components/SectionButton";
import Stepper from "../../components/Step/components/Stepper";
import StepCheckpointContext, { IdToIndex } from "../../components/Step/StepCheckpointContext";
import StepContext from "../../components/Step/StepContext";
import withReducer from "../../hocs/withReducer";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { ITestName } from "../../interfaces/ITestAnswer";
import { FADEIN } from "../../motion/props";
import { useGetProfile } from "../../reducers/authReducer";
import testAnswerReducer, { SetTestName, useIsAllTestAnswered, useSubmitAnswer, useTestAnswerStatus } from "../../reducers/testAnswerReducer";
import { useStrings } from "../../texts";
import LoadRequiredContent, { AuthLoadRequiredContent } from "../LoadRequiredContent";
import CityTestContent from "./CityTestContent";
import TestAnswerBadge from "./component/TestAnswerBadge";
import UnAnsweredTestAlertButton from "./component/UnAnsweredTestAlertButton";
import FoodBudgetTestContent from "./FoodBudgetTestContent";
import HashTagTestContent from "./HashTagTestContent";
import LeadershipTestContent from "./LeadershipTestContent";
import ScheduleTestContent from "./ScheduleTestContent";

function TestContent() {

    const navigate = useNavigateWithGuestContext();

    /* Strings */
    const contentstrings = useStrings().public.contents.test;

    const isAllTestAnswered = useIsAllTestAnswered();

    const getProfile = useGetProfile();
    const submitAnswer = useSubmitAnswer();
    const [submitStatus, setSubmitStatus] = useTestAnswerStatus();

    /* States */
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

    /* 첫 렌더 후 Scroll Resotration 중에 Top Nav 가 슬라이드 되는 모션을 방지함. */
    const [preventInitialSwipe, setPreventInitialSwipe] = useState(true);

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
                            <StepCheckpointContext.Provider value={{ idToIndex: idToIndex, setIdToIndex: setIdToIndex, stepCheckpointList: stepCheckpointList }}>
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
                                        (["expectation", "activity"] as SetTestName[]).map((testName, index) =>
                                            <ScrollPageItem key={testName} page={index} className="flex">
                                                <TestSection>
                                                    <HashTagTestContent testName={testName} />
                                                </TestSection>
                                            </ScrollPageItem>
                                        )
                                    }
                                    <ScrollPageItem key={"leadership"} page={2} className="flex">
                                        <TestSection>
                                            <LeadershipTestContent />
                                        </TestSection>
                                    </ScrollPageItem>
                                    <ScrollPageItem key={"schedule"} page={3} className="flex">
                                        <TestSection>
                                            <ScheduleTestContent />
                                        </TestSection>
                                    </ScrollPageItem>
                                    <ScrollPageItem key={"budget"} page={4} className="flex">
                                        <TestSection>
                                            <FoodBudgetTestContent />
                                        </TestSection>
                                    </ScrollPageItem>
                                    {
                                        Object.keys(TEST.city.subTests).map((id, index) => (
                                            <ScrollPageItem key={id} page={5 + index} className="flex">
                                                <TestSection >
                                                    <CityTestContent id={id} />
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
                                <div className="flex">
                                    <Button
                                        onClick={handleConfirmButtonClick}
                                        disabled={!isAllTestAnswered}
                                        variant="contained"
                                        className="block--with-padding block--with-margin block--with-margin--large"
                                        style={{ marginTop: 0 }}
                                    >
                                        {contentstrings.main.confirmButton}
                                    </Button>
                                </div>
                            </StepCheckpointContext.Provider>
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
                                style={{ marginBottom: "2rem" }}
                            >
                                <IconButton onClick={handleScrollDownButtonClick}>
                                    <ExpandMore className="typography-gray" sx={{ fontSize: "40px" }} />
                                </IconButton>
                            </m.div>
                        }
                        {
                            <Modal
                                open={showScrollDownAlert}
                                onClose={() => setShowScrollDownAlert(false)}
                                hideBackdrop={true}
                                disableScrollLock
                            >
                                <div className="floating--bottom">
                                    <Alert
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    setShowScrollDownAlert(false);
                                                }}
                                            >
                                                <Close fontSize="inherit" />
                                            </IconButton>
                                        }
                                        severity="info"
                                        className="block--with-margin block--with-margin--large block--with-padding"
                                    >
                                        아래로 스크롤해보세요.
                                    </Alert>
                                </div>
                            </Modal>
                        }
                    </LazyDomAnimation>
                </div >
            </AuthLoadRequiredContent>
        </LoadRequiredContent >
    );
}
export default withReducer(TestContent)({ testAnswer: testAnswerReducer })