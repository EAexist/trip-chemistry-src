/* React */
import { useEffect, useState } from "react";

/* Externals */
import { Close, NavigateNext } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, Grow, IconButton } from "@mui/material";
import { useSelector } from "react-redux";

/* Swiper */
import 'swiper/css';
import 'swiper/css/effect-coverflow'; /* Food Carousel */

/* App */
import { TEST } from "../../common/app-const";

/* GoogleMap */
import InfoWindowContext from "~/components/GoogleMap/common/InfoWindowContext";
import GoogleMapMarker from "~/components/GoogleMap/ui/GoogleMapMarker";
import GoogleMapContext from "../../components/GoogleMap/common/GoogleMapContext";
import { OPTIONS_TEST_SCHEDULE } from "../../components/GoogleMap/common/options";
import GoogleMap from "../../components/GoogleMap/ui/GoogleMap";

import Logo from "../../components/Logo";
import { RootState } from "../../store";
import { useStrings } from "../../texts";
import { FORMATSVG } from "../../utils/getImgSrc";
import AnswerButtonGroup from "./component/AnswerButtonGroup";

function ScheduleTestContent() {

    /* Strings */
    const contentstrings = useStrings().public.contents.test;

    /* Reducers */
    const scheduleAnswer = useSelector((state: RootState) => state.testAnswer.data.schedule) as number;

    /* States */
    const [scheduleExampleMap, setScheduleExampleMap] = useState<google.maps.Map | null>();

    /* 구글맵 */
    const { zoom: googleMapZoom, center: googleMapCenter } = TEST.schedule.subTests.schedule.examples[scheduleAnswer as keyof typeof TEST.schedule.subTests.schedule.examples];

    /** 실제 오픈되어 있어야 하는 Info Window. Context 에 적용. */
    const [selectedInfoWindow, setSelectedInfoWindow] = useState<google.maps.InfoWindow>();
    /**
     * DOM 에서 오픈되어 있는 Info Window. 
     * Active Info Window 가 변경 될 경우 기존 Active Info Window 의 close() 함수를 호출해 닫기 위해 참조. 
     * [Deprecated] InfoWindow 및 Marker View 변화 로직은 모두 GoogleMapMarker 로 이동.
     * 부모 컴포넌트(ScheduleTestContent)에서는 activeGoogleMarker 를 참조하는 state 하나와 activeGoogleMarker 가 없을 경우 지도 초기화 로직만 관리.   
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

    return (
        <>
            <div className="flex-grow block--centered">
                <div className="test__google-map-container modal__container block--round block--round--large" style={{ overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 8, left: 8, zIndex: 1 }}>
                        {
                            showMapTitle ?
                                <Grow in={showMapTitle}>
                                    <Card sx={{ borderRadius: '16px' }}>
                                        <IconButton onClick={() => setShowMapTitle(false)} sx={{ position: "absolute", top: 0, right: 0 }} size="small">
                                            <Close fontSize="small" />
                                        </IconButton>
                                        <CardContent>
                                            <h2 className="typography-note">Based On</h2>
                                            <p className="typography-label">{"재하 님의\n후쿠오카 여행"}</p>
                                        </CardContent>
                                        <CardActions>
                                            <Button href={"https://blog.naver.com/jcjw1234"} startIcon={<Logo id={"naver-blog"} format={FORMATSVG} size="small" />} endIcon={<NavigateNext />} size="small" className="typography-note">
                                                블로그에서 더 보기
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grow>
                                :
                                <Button onClick={() => setShowMapTitle(true)} startIcon={<Logo id={"naver-blog"} format={FORMATSVG} size="small" />} endIcon={<NavigateNext fontSize="inherit" sx={{ marginLeft: "-4px" }} />} size="small" className="typography-label" sx={{ textTransform: 'none' }}>
                                    Based On 재하 님의 후쿠오카 여행

                                </Button>
                        }
                    </div>
                    <GoogleMapContext.Provider value={{ map: scheduleExampleMap as google.maps.Map, setMap: setScheduleExampleMap }}>
                        <GoogleMap opts={OPTIONS_TEST_SCHEDULE}>
                            <InfoWindowContext.Provider value={{ selectedInfoWindow, setSelectedInfoWindow }}>
                                <GoogleMapMarker {...TEST.schedule.subTests.schedule.airportPlace} />
                                {
                                    (scheduleAnswer !== undefined) &&
                                    Object.entries(TEST.schedule.subTests.schedule.examples).map(([value, { places }]) => (
                                        places.map((place) => (
                                            <GoogleMapMarker key={place.label} {...place} isActive={Number(value) <= scheduleAnswer} />
                                        ))
                                    ))
                                }
                            </InfoWindowContext.Provider>
                        </GoogleMap>
                    </GoogleMapContext.Provider>
                </div>
            </div>
            <div className="block block__body--large">
                <div className="test__title">
                    <h2 className="test__title__heading typography-heading">{contentstrings.test.schedule.title}</h2>
                </div>
                <AnswerButtonGroup testName="schedule" />
                <div />
            </div>
        </>
    );
}
export default ScheduleTestContent