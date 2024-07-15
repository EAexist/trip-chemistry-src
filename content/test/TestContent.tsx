/* React */
import { useEffect, useRef, useState } from "react";

/* Externals */
import { ArrowDropDown } from "@mui/icons-material";
import { Button, Container, Grid, Stack, Toolbar } from "@mui/material";


/* Swiper */
import 'swiper/css';
import { HashNavigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

/* App */

/* Contents */
import HashTagTestContent from "./HashTagTestContent";
import LeadershipTestContent from "./LeadershipTestContent";
import RestaurantTestContent from "./RestaurantTestContent";
import TimeTestContent from "./TimeTestContent";

import { createSelector } from "@reduxjs/toolkit";
import { SwiperOptions } from "swiper/types";
import { TEST_TYPE } from "~/common/app-const";
import MainAppBar from "~/components/AppBar/MainAppBar";
import Fab from "~/components/Button/Fab";
import ConfirmDrawer from "~/components/ConfirmDrawer";
import DraggableDialog from "~/components/Paper/DraggableDialog";
import { useAppDispatch, useAppSelector } from "~/store";
import ImageIcon from "../../components/ImageIcon";
import withReducer from "../../hocs/withReducer";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { asyncGetProfile, useGetProfile, useUserId } from "../../reducers/authReducer";
import testAnswerReducer, { asyncGetAnswer, asyncSetAnswer, asyncSubmitAnswer, useSubmitAnswer, useTestAnswerStatus } from "../../reducers/testAnswerReducer";
import LoadRequiredContent, { AuthLoadRequiredContent } from "../LoadRequiredContent";
import RestaurantBudgetTestContent from "./RestaurantBudgetTestContent";

export const TEST_SECTIONS = {
    expectation:
    {
        type: "hashtag",
        icon: "expectation",
        label: "여행 테마",
        subtitle: "이런 여행을 하고 싶어",
        tests: [
            {
                testKey: "hashtag",
                subKey: "expectation"
            }
        ],
        contentComponent: <HashTagTestContent testKey={"expectation"} />
    },
    city:
    {
        type: "hashtag",
        icon: "location",
        label: "여행지",
        subtitle: "여행지는 이런 곳이 좋아",
        tests: [
            {
                testKey: "hashtag",
                subKey: "city"
            }
        ],
        contentComponent: <HashTagTestContent testKey={"city"} />
    },
    activity:
    {
        type: "hashtag",
        icon: "activity",
        label: "액티비티",
        subtitle: "이런 것들을 해보고 싶어",
        tests: [
            {
                testKey: "hashtag",
                subKey: "activity"
            }
        ],
        contentComponent: <HashTagTestContent testKey={"activity"} />
    },
    leadership:
    {
        type: 'leadership',
        icon: "leadership",
        label: "여행 준비",
        subtitle: "일행과 여행을 준비할 때의 나는?",
        tests: [
            {
                testKey: "leadership",
            }
        ],
        contentComponent: <LeadershipTestContent />
    },
    time:
    {
        type: 'time',
        icon: "clock",
        label: "일정 짜기",
        tests: [
            {
                testKey: "schedule",
                subKey: "startTime",
            },
            {
                testKey: "schedule",
                subKey: "endTime"
            },
            {
                testKey: "schedule",
                subKey: "schedule"
            },
            {
                testKey: "schedule",
                subKey: "nightPlan"
            }
        ],
        contentComponent: <TimeTestContent />
    },
    // dailyRestaurantBudget:
    // {
    //     type: 'budget',
    //     icon: "restaurant",
    //     label: "식사 예산",
    //     tests: [
    //         {
    //             testKey: "restaurant",
    //             subKey: "dailyBudget"
    //         }
    //     ],
    //     subtitle: "여행 중 평범한 식사 한끼에는 평균적으로 얼마나 쓸까?",
    //     contentComponent: <DailyRestaurantTestContent />
    // },
    restaurant:
    {
        type: 'budget',
        icon: "restaurant",
        label: "식당 선택",
        subtitle: "함께 갈 식당을 골라보자. 어떤 것들이 중요할까?",
        tests: [
            {
                testKey: "restaurant",
                subKey: "price"
            },
            {
                testKey: "restaurant",
                subKey: "uniqueness"
            },
            {
                testKey: "restaurant",
                subKey: "taste"
            },
            {
                testKey: "restaurant",
                subKey: "popularity"
            }
        ],
        contentComponent: <RestaurantTestContent />
    },
    restaurantBudget:
    {
        type: 'budget',
        icon: "delicious-colored",
        label: "맛집 예산",
        subtitle: "맛집에서의 특별한 한끼를 위해서라면\n최대 얼마까지 쓸 수 있어?",
        tests: [
            {
                testKey: "restaurant",
                subKey: "specialBudget"
            },
        ],
        contentComponent: <RestaurantBudgetTestContent />
    },
    // city:
    // {
    //     type: "city",
    //     icon: "location",
    //     label: "여행지",
    //     tests: CITY_TYPE_KEYS.map(key => ({
    //         testKey: "city",
    //         subKey: key
    //     })),
    //     contentComponent: <CitiesTestContent />
    // },
};

function TestContent() {

    /* States */
    const swiperRef = useRef<SwiperRef>(null)
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
    const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0)

    const navigate = useNavigateWithGuestContext();

    const getProfile = useGetProfile();
    const [submitStatus, setSubmitStatus] = useTestAnswerStatus();

    const IsTestSectionAnsweredList = useAppSelector(createSelector(
        state => state.testAnswer.data,
        testAnswer =>
            Object.values(TEST_SECTIONS).map(({ tests }) => (
                tests.map(({ testKey, subKey }) => {
                    const answer = subKey ? testAnswer[testKey][subKey] : testAnswer[testKey]
                    return (
                        (testKey === "hashtag")
                            ? answer.length >= TEST_TYPE.hashtag.selectedMinLength
                            : (answer !== undefined)
                    )
                }).every(v => v)
            ))
    ))

    const isAllTestAnswered = IsTestSectionAnsweredList.every(v => v)
    const isActiveTestAnswered = IsTestSectionAnsweredList[activeSectionIndex]

    const handleSubmitSuccess = () => {
        setIsAnswerSubmitted(true);
        getProfile();
    };

    const handleLoadSuccess = () => {
        navigate('../result');
    }

    /* Swiper Control */

    const SWIPERPROPS: SwiperOptions = {
        slidesPerView: 1,
        modules: [HashNavigation],
        hashNavigation: {
            watchState: true,
        },
        allowTouchMove: false
    }

    const [speed, setSpeed] = useState(0)

    useEffect(() => {
        setSpeed(500)
    }, [setSpeed])

    useEffect(() => {
        swiperRef.current.swiper.slideTo(activeSectionIndex)
    }, [swiperRef, activeSectionIndex])

    /* Section Dialog */
    const [opensectionlistmodal, setOpenSectionListModal] = useState(false)

    const handleSectionButtonClick = (index: number) => () => {
        setActiveSectionIndex(index)
        let timer = setTimeout(() => { setOpenSectionListModal(false) }, 500);
    }

    const handleSectionListModalClose = () => {
        setOpenSectionListModal(false);
    };

    const highlightAnsweredSections = () => {
    }

    const highlightUnAnsweredSections = () => {

    }

    /* Confirm Dialog */
    const [openConfirmDrawer, setOpenConfirmDrawer] = useState(false);

    const handleCloseConfirmDrawer = () => {
        setOpenConfirmDrawer(false)
        setOpenSectionListModal(true)
    }

    // const handleConfirmSubmit = () => {
    //     submitAnswer();
    // }

    const id = useUserId()
    const { data } = useAppSelector((state) => state.testAnswer);
    const handleConfirmSubmit = async () => {
        try {
          const originalPromiseResult = await dispatch(asyncSubmitAnswer({ id, answer: data })).unwrap()
          const PromiseResult = await dispatch(asyncGetProfile(userId)).unwrap()
          navigate('../result');          
          // handle result here
        } catch (rejectedValueOrSerializedError) {
          // handle error here
        }
      }

    /* Main Action Button */
    const handleFinishTest = () => {
        setOpenConfirmDrawer(true);
    }

    /* Fetch Test Answers */
    const userId = useUserId()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (userId)
            dispatch(asyncGetAnswer(userId))
    }, [userId])


    const handleNextButtonClick = () => {
        console.log(`[handleNextButtonClick] ${JSON.stringify(IsTestSectionAnsweredList.map((isTestAnswered, index) => ({ isTestAnswered, index })).filter(({ isTestAnswered, index }) => !isTestAnswered))}`)
        dispatch( asyncSetAnswer(userId) )
        setActiveSectionIndex((prev) => {
            const nextUnAnsweredTestIndex = IsTestSectionAnsweredList.map((isTestAnswered, index) => ({ isTestAnswered, index })).slice(activeSectionIndex).filter(({ isTestAnswered, index }) => !isTestAnswered)[0]
            if (nextUnAnsweredTestIndex !== undefined) {
                return nextUnAnsweredTestIndex.index
            }
            else {
                const firstUnAnsweredTestIndex = IsTestSectionAnsweredList.map((isTestAnswered, index) => ({ isTestAnswered, index })).filter(({ isTestAnswered, index }) => !isTestAnswered)[0]?.index

                if (firstUnAnsweredTestIndex !== undefined)
                    return firstUnAnsweredTestIndex
                else
                    return prev
            }
        })
    }
    
    useEffect(()=>{
        if ( userId )
            dispatch( asyncSetAnswer(userId) )
    }, [ userId, activeSectionIndex ])
    
    return (
        <LoadRequiredContent {...{
            status: submitStatus,
            setStatus: setSubmitStatus,
            showOnPending: true
        }}>
            <AuthLoadRequiredContent {...{
                isEnabled: isAnswerSubmitted,
            }}>
                <div className="page fill-window flex">
                    <MainAppBar />
                    <Toolbar />
                    <Container>
                        <div className="section-header">
                            <Stack display="flex" justifyContent={"space-between"}>
                                <Button onClick={() => setOpenSectionListModal(true)} endIcon={<ArrowDropDown />} sx={{ paddingLeft: 0 }}>
                                    <h2 className="section-title">{Object.values(TEST_SECTIONS)[activeSectionIndex].label}</h2>
                                </Button>
                                <p className="typography-note">{`${activeSectionIndex + 1} / ${Object.keys(TEST_SECTIONS).length}`}</p>
                            </Stack>
                        </div>
                    </Container>
                    <div style={{ flexShrink: 1, flexGrow: 1, overflow: "hidden" }}>
                        <Swiper speed={speed} noSwipingClass='testcontent-swiper-no-swiping' onActiveIndexChange={(swiper) => setActiveSectionIndex(swiper.activeIndex)} ref={swiperRef} style={{ height: "100%" }} {...SWIPERPROPS}>
                            {
                                (Object.entries(TEST_SECTIONS) as [id: string, { subtitle?: string, contentComponent?: React.ReactNode }][]).map(([id, { subtitle, contentComponent }]) => (
                                    <SwiperSlide key={id} data-hash={id}>
                                        <Container className="content" sx={{ width: "100%" }}>
                                            {
                                                subtitle
                                                &&
                                                <p>{subtitle}</p>
                                            }
                                            {contentComponent}
                                        </Container>
                                        <div className="fab-placeholder fab-placeholder--no-margin" />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                    <Fab onClick={isAllTestAnswered ? handleFinishTest : handleNextButtonClick} disabled={(!isAllTestAnswered) && !isActiveTestAnswered}>
                        {isAllTestAnswered ? "결과 확인하기" : "다음"}
                    </Fab>
                    <ConfirmDrawer
                        open={openConfirmDrawer}
                        onOpen={() => setOpenConfirmDrawer(true)}
                        onClose={handleCloseConfirmDrawer}
                        onCancel={handleCloseConfirmDrawer}
                        onConfirm={handleConfirmSubmit}
                        title={"답변을 제출할까요?"}
                        cancelButtonLabel={'답변 한 번 더 확인하기'}
                    />
                    <DraggableDialog
                        open={opensectionlistmodal}
                        onClose={handleSectionListModalClose}

                    >
                        <div className="section-header">
                            <h2 className="section-title">테스트</h2>
                        </div>
                        <Grid container spacing={1}>
                            {
                                IsTestSectionAnsweredList.map((isAnswered, index) => {
                                    const isActive = (index === activeSectionIndex)
                                    return (
                                        <Grid key={index} item xs={6}>
                                            <Button onClick={handleSectionButtonClick(index)} startIcon={<ImageIcon name={Object.values(TEST_SECTIONS)[index]?.icon} />} variant={"contained"} color={isActive ? "gray" : "secondary"} sx={{ ...!isAnswered && { '& > *': { opacity: 0.5 } }, paddingLeft: '12px', fontWeight: 400 }}>
                                                {Object.values(TEST_SECTIONS)[index]?.label}
                                            </Button>
                                        </Grid>

                                    )
                                })
                            }
                        </Grid>
                        <Stack justifyContent={"end"} spacing={0}>
                            <Button onClick={highlightAnsweredSections} className="typography-note" style={{ fontWeight: 600 }}>{`답변한 질문 : ${IsTestSectionAnsweredList.filter((isAnswered) => isAnswered).length}`}</Button>
                            <Button onClick={highlightUnAnsweredSections} className="typography-note disabled">{`남은 질문 : ${IsTestSectionAnsweredList.filter((isAnswered) => !isAnswered).length}`}</Button>
                        </Stack>
                    </DraggableDialog>
                </div >
            </AuthLoadRequiredContent>
        </LoadRequiredContent >
    );
}
export default withReducer(TestContent)({ testAnswer: testAnswerReducer })