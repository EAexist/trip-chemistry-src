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

/* Contents */
import DailyRestaurantTestContent from "./DailyRestaurantTestContent";
import HashTagTestContent from "./HashTagTestContent";
import LeadershipTestContent from "./LeadershipTestContent";
import TimeTestContent from "./TimeTestContent";
import SpecialRestaurantTestContent from "./SpecialRestaurantTestContentAccordion";
import CitiesTestContent from "./CitiesTestContent";

import TestSection from "../../components/Block/TestSection";

import { CITY_TYPE_KEYS } from "~/common/app-const";
import PngIcon from "../../components/PngIcon";
import ScrollPageContainer from "../../components/ScrollPage/ScrollPageContainer";
import ScrollPageItem from "../../components/ScrollPage/ScrollPageItem";
import SectionButton from "../../components/Step/components/SectionButton";
import Stepper from "../../components/Step/components/Stepper";
import StepCheckpointContext, { IdToIndex } from "../../components/Step/StepCheckpointContext";
import StepContext from "../../components/Step/StepContext";
import withReducer from "../../hocs/withReducer";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { FADEIN } from "../../motion/props";
import { useGetProfile } from "../../reducers/authReducer";
import testAnswerReducer, { SetTestName, useIsAllTestAnswered, useSubmitAnswer, useTestAnswerStatus } from "../../reducers/testAnswerReducer";
import { useStrings } from "../../texts";
import LoadRequiredContent, { AuthLoadRequiredContent } from "../LoadRequiredContent";
import TestAnswerBadge from "./component/TestAnswerBadge";
import UnAnsweredTestAlertButton from "./component/UnAnsweredTestAlertButton";
import NoticeBlock from "~/components/Block/NoticeBlock";
import getImgSrc from "~/utils/getImgSrc";
import LazyImage from "~/components/LazyImage";
import ScheduleTestContent from "./ScheduleTestContent";


function TestContent() {

    const navigate = useNavigateWithGuestContext();

    /* Strings */
    const contentstrings = useStrings().public.contents.test;

    const isAllTestAnswered = useIsAllTestAnswered();

    const getProfile = useGetProfile();
    const submitAnswer = useSubmitAnswer();
    const [submitStatus, setSubmitStatus] = useTestAnswerStatus();


    const TEST_SECTIONS = {
        expectation:
        {
            type: "tagSet",
            icon: "expectation",
            label: "# 여행 테마",
            tests: ["expectation"]
        },
        activity:
        {
            type: "tagSet",
            icon: "activity",
            label: "# 액티비티",
            tests: ["activity"]
        },
        leadership:
        {
            type: 'leadership',
            icon: "leadership",
            label: "여행 준비",
            tests: ["leadership"]
        },
        time:
        {
            type: 'time',
            icon: "clock",
            label: "여행 시간",
            tests: ["time"]
        },
        schedule:
        {
            type: 'schedule',
            icon: "path",
            label: "일정",
            tests: ["schedule"]
        },
        dailyRestaurantBudget:
        {
            type: 'budget',
            icon: "restaurant",
            label: "식사 예산",
            tests: ["dailyRestaurantBudget"]
        },
        specialRestaurantBudget:
        {
            type: 'budget',
            icon: "delicious",
            label: "맛집 예산",
            tests: ["specialRestaurantBudget", "specialRestaurantCount"]
        },
        city:
        {
            type: "city",
            icon: "location",
            label: "여행지",
            tests: CITY_TYPE_KEYS
        },
        confirm:
        {
            type: "confrim",
            icon: "check",
            label: "결과 확인",
            tests: []
        },
    };

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

    const handleFabClick = () => {

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
                                                Object.entries(TEST_SECTIONS).map(([sectionName, { tests, icon, label }], index) =>
                                                    <SwiperSlide key={sectionName} className="top-nav__swiper">
                                                        <SectionButton
                                                            labelSize={"large"}
                                                            value={index}
                                                            index={index}
                                                            label={label}
                                                            sx={{ height: "100%", display: 'flex', alignItems: 'start', paddingTop: '8px' }}
                                                            elevation={0}
                                                        >{
                                                                <TestAnswerBadge invisible={sectionName.length === 0} tests={tests} sx={{ height: 'fit-content', padding: "4px" }}>
                                                                    <PngIcon name={icon} size={"large"} />
                                                                </TestAnswerBadge>
                                                            }
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
                                    <ScrollPageItem key={"time"} page={3} className="flex">
                                        <TestSection>
                                            <TimeTestContent />
                                        </TestSection>
                                    </ScrollPageItem>
                                    <ScrollPageItem key={"schedule"} page={4} className="flex">
                                        <TestSection>
                                            <ScheduleTestContent />
                                        </TestSection>
                                    </ScrollPageItem>
                                    <ScrollPageItem key={"dailyRestaurantBudget"} page={5} className="flex">
                                        <TestSection>
                                            <DailyRestaurantTestContent />
                                        </TestSection>
                                    </ScrollPageItem>
                                    <ScrollPageItem key={"specialRestaurantBudget"} page={6} className="flex">
                                        <TestSection>
                                            <SpecialRestaurantTestContent />
                                        </TestSection>
                                    </ScrollPageItem>
                                    <ScrollPageItem key={"city"} page={7} className="flex">
                                        <TestSection>
                                            <CitiesTestContent />
                                        </TestSection>
                                    </ScrollPageItem>
                                    <ScrollPageItem key={"confirm"} page={8} className="flex">
                                        <TestSection className="block--centered block__body">
                                                <LazyImage
                                                    alt={"alt"}
                                                    src={getImgSrc('/info', "info", { size: "xlarge" })}
                                                    width={"256px"}
                                                    height={"256px"}
                                                    containerClassName="NoticeBlock__image"
                                                />
                                                {
                                                    isAllTestAnswered
                                                        ?
                                                        <Button
                                                            onClick={handleConfirmButtonClick}
                                                            disabled={!isAllTestAnswered}
                                                            variant="contained"
                                                            className="block--with-padding"
                                                            style={{ marginTop: 0 }}
                                                        >
                                                            결과 확인하기
                                                        </Button>
                                                        :
                                                        <div>
                                                        <UnAnsweredTestAlertButton />
                                                        </div>
                                                }
                                        </TestSection>
                                    </ScrollPageItem>
                                </ScrollPageContainer>
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