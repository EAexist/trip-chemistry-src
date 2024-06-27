/* React */
import { Fragment, useEffect, useState } from "react";

/* Externals */
import { Close, NavigateNext } from "@mui/icons-material";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, FormControlLabel, Grow, IconButton, Radio, RadioGroup } from "@mui/material";

/* App */
import { useTestAnswer } from "~/reducers/testAnswerReducer";
import Logo from "../../components/Logo";
import getImgSrc, { FORMATSVG } from "../../utils/getImgSrc";

/* GoogleMap */
import SelectedPlaceContext from "~/components/GoogleMap/common/SelectedPlaceContext";
import GoogleMapMarker from "~/components/GoogleMap/ui/GoogleMapMarker";
import GoogleMapPolyline from "~/components/GoogleMap/ui/GoogleMapPolyline";
import GoogleMapContext from "../../components/GoogleMap/common/GoogleMapContext";
import { OPTIONS_TEST_SCHEDULE } from "../../components/GoogleMap/common/options";
import GoogleMap from "../../components/GoogleMap/ui/GoogleMap";

export const airportPlace = {
    position: {
        lat: 33.605,
        lng: 130.404,
    },
    id: 'fukuoka-airport',
    label: '후쿠오카 공항',
    body: '후쿠오카 중심부에서 하타카를 연결하는 지하철 노선이있는 도심 공항',
    icon: 'flight',
    href: 'https://www.fukuoka-airport.jp/ko/',
    infoWindowStyle: 'simple'
}

export const places = {
    'ichiran-fukuoka':
    {
        position: {
            lat: 33.5932449,
            lng: 130.4020225,
        },
        label: '이치란 본점',
        icon: 'restaurant',
        body: '돼지 사골 국물로 만든 돈코쓰 라멘을 전문으로 하는 편안한 분위기의 레스토랑.',
        href: 'https://maps.app.goo.gl/16GR87KEjvMhibAR9',
        option: 1,
    },
    'canal-city-hakata':
    {
        position: {
            lat: 33.5897988,
            lng: 130.4085279,
        },
        label: '캐널시티',
        icon: 'shopping_cart',
        body: '유명 브랜드와 전문 매장, 식당가가 입점한 대형 쇼핑몰로 분수 쇼가 펼쳐집니다.',
        href: 'https://maps.app.goo.gl/EzJP78zovYCqWsD76',
        option: 1,
    },
    'hakozaki-shrine':
    {
        position: {
            lat: 33.6147611,
            lng: 130.4216325,
        },
        label: '하코자키 궁',
        icon: 'temple_buddhist',
        body: '활기찬 경내와 대표적 유물이 있고 전통 이벤트가 열리는 유서 깊은 신사.',
        href: 'https://maps.app.goo.gl/CHYBKRNS9bYWReNv6',
        option: 2,
    },
    'hakuhaku':
    {
        position: {
            lat: 33.6133009,
            lng: 130.4307441,
        },
        label: '하쿠하쿠',
        icon: 'museum',
        body: '일본식 명란젓을 만드는 후쿠야의 하카타 음식 및 문화 박물관.',
        href: 'https://maps.app.goo.gl/rGYZGkXGYicQZieR6',
        option: 2,
    },
    'tempura-hirao':
    {
        position: {
            lat: 33.586,
            lng: 130.454,
        },
        label: '덴푸라 히라오 본점',
        icon: 'restaurant',
        body: '후쿠오카의 맛있는 덴푸라 가게.',
        href: 'https://maps.app.goo.gl/rnASDN2w1SFdswMm8',
        option: 3,
    },
    'hankyu-hakata':
    {
        position: {
            lat: 33.5893684,
            lng: 130.4172629,
        },
        label: '한큐백화점 하카타',
        icon: 'shopping_cart',
        body: '“세련되고 즐거운” 대형 백화점 하카타 한큐',
        href: 'https://maps.app.goo.gl/D3aS5d1NZMxDn2rD6',
        option: 3,
    },
    'gundam-fukuoka':
    {
        position: {
            lat: 33.5650103,
            lng: 130.4388288,
        },
        label: '건담 파크 후쿠오카',
        icon: 'tour',
        body: '기동전사건담 시리즈의 세계관을 즐길수 있는 종합 엔터테인먼트 시설.',
        href: 'https://maps.app.goo.gl/CuTbExgR5b6KkhZH8',
        option: 3,
    },
    'yusentei':
    {
        position: {
            lat: 33.5626837,
            lng: 130.3738197,
        },
        label: '유센테이',
        icon: 'tour',
        body: '1754년에 지어진 구로다 쓰구타카의 옛 저택으로 현재는 정원, 연못, 찻집이 있는 공원.',
        href: 'https://maps.app.goo.gl/72zJsM8cowxYP8oE9',
        option: 4,
    },
    'fukuoka-museum':
    {
        position: {
            lat: 33.5897904,
            lng: 130.3504891,
        },
        label: '후쿠오카시 박물관',
        icon: 'museum',
        body: '나국의 금박 인장을 비롯하여 후쿠오카의 역사 전시를 관람할 수 있는 현대적인 박물관입니다.',
        href: 'https://maps.app.goo.gl/FtKt6uwJCjE4eJ1M6',
        option: 4,
    },
    'momochi':
    {
        position: {
            lat: 33.5934691,
            lng: 130.3465043,
        },
        label: '모모치해변',
        icon: 'beach_access',
        body: '인공 섬을 따라 난 인기 있는 인공 해변으로, 길게 뻗은 모래사장에서 발리볼을 즐길 수 있습니다.',
        href: 'https://maps.app.goo.gl/fR7ENJtjFyaWWX9Q9',
        option: 4,
    },
}

export const googleMapOptions = {
    1: {
        zoom: 13.5,
        center: { lat: 33.60, lng: 130.405 },
    },
    2: {
        zoom: 13,
        center: { lat: 33.605, lng: 130.415 },
    },
    3: {
        zoom: 12,
        center: { lat: 33.6000, lng: 130.42 },
    },
    4: {
        zoom: 12,
        center: { lat: 33.6000, lng: 130.40 },
    },
    0: {
        zoom: 12,
        center: { lat: 33.6000, lng: 130.40 },
    },
}

export const scheduleTestOptions = [
    {
        value: 1,
        label: "아주\n널널하게"
    },
    {
        value: 2,
        label: "널널하게"
    },
    {
        value: 3,
        label: "알차게"
    },
    {
        value: 4,
        label: "매우\n알차게"
    },
    {
        value: 0,
        label: "아무래도\n상관없어"
    },
]

function ScheduleTestContent() {

    /* Reducers */
    const [scheduleAnswer, setScheduleAnswer] = useTestAnswer("schedule", "schedule");

    const handleAnswerChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        setScheduleAnswer(Number(event.target.value));
    }
    /* 구글맵 */
    const [scheduleExampleMap, setScheduleExampleMap] = useState<google.maps.Map | null>();

    const { zoom: googleMapZoom, center: googleMapCenter } = googleMapOptions[scheduleAnswer || 0];

    /** 실제 오픈되어 있어야 하는 Info Window. Context 에 적용. */
    const [selectedPlaceId, setSelectedPlaceId] = useState<string>()
    const selectedPlace = (selectedPlaceId === 'fukuoka-airport') ? airportPlace : places[selectedPlaceId]

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

    useEffect(() => {
        // console.log(`selectedInfoWindow.content=${selectedPlaceId?.getContent().toString()}`)

        /**
         * 새로운 Info Window 가 열릴 경우 기존의 Active Info Window를 닫음. Close 버튼을 눌러 Info Window를 닫을 경우 상태를 undefined 로 설정. Context의 Active Info Window 와 DOM 에서 오픈되어있는 Info Window 를 동기화. 
         * [ Deprecated ] prevActiveInfoWindow 참고.       
         *  */
        // if ( selectedInfoWindow !== prevActiveInfoWindow ){
        //     prevActiveInfoWindow?.close()
        //     setPrevActiveInfoWindow( selectedInfoWindow )
        // }

        // Close 버튼을 눌러 Info Window를 닫을 경우 Info Window로 인해 이동한 지도의 center를 기본값으로 초기화.
        if (selectedPlaceId === undefined) {
            scheduleExampleMap?.panTo(googleMapCenter);
        }

    }, [selectedPlaceId, scheduleExampleMap])

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
        <div className="content">
            {/* <h2 className="typography-heading">일정은 얼마나 알차면 좋을까?</h2> */}
            <RadioGroup
                name="controlled-radio-buttons-group"
                value={(scheduleAnswer !== undefined) ? scheduleAnswer : null}
                onChange={handleAnswerChange}
                row={true}
                sx={{ justifyContent: "space-between" }}                
            >
                {
                    scheduleTestOptions.map(({ value, label }) => (
                        <FormControlLabel
                            key={label}
                            value={value}
                            control={
                            <Radio
                                size="small" 
                                color="default"
                                sx={{
                                    color: value > 0 ? "primary.main" : "inherit",
                                    opacity: ((value > 0) && (value !== scheduleAnswer)) ? 0.25*value : 1
                                }}
                            />
                            }
                            label={<p className="block--centered typography-note">{label}</p>}
                            labelPlacement="bottom"
                        />
                    ))
                }
            </RadioGroup>
            {/* </div> */}
            <div className="google-map__container modal__container block--round" style={{ overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }} className="block--with-margin--xsmall">
                    {
                        showMapTitle ?
                            <Grow in={showMapTitle}>
                                <Card sx={{ position: "relative" }} >
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
                                재하 님의 후쿠오카 여행
                            </Button>
                    }
                </div>
                {/* <Grow in={showMapTitle}> */}
                {
                    selectedPlace &&
                    <Grow in={selectedPlaceId !== undefined}>
                        <div style={{ position: "absolute", bottom: 0, zIndex: 1, width: "100%" }} >
                            <div className="block--with-margin--xsmall">
                                <Card sx={{ position: "relative" }}>
                                    <IconButton onClick={() => setSelectedPlaceId(undefined)} sx={{ zIndex: 1, position: "absolute", top: 0, right: 0 }} >
                                        <Close fontSize="small" />
                                    </IconButton>
                                    <CardActionArea href={selectedPlace.href} sx={{ display: "flex", alignItems: "start" }}>
                                        {
                                            <CardMedia
                                                component="img"
                                                image={getImgSrc("/test/schedule", selectedPlaceId)}
                                                alt={selectedPlace.label}
                                                width="96px"
                                                sx={{ width: "96px", aspectRatio: "1/1", borderRadius: "16px", margin: "16px" }}
                                            />
                                        }
                                        <CardContent sx={{ paddingLeft: 0, flexGrow: 1 }}>
                                            <h2 className="typography-label" style={{}}>{selectedPlace.label}<span style={{ fontSize: "inherit", position: "relative" }}><NavigateNext sx={{ fontSize: "inherit", position: "absolute", top: "50%", transform: "translateY(-50%)" }} /></span></h2>
                                            <p className="typography-note">{selectedPlace.body}</p>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        </div>
                    </Grow>
                }
                {/* </Grow> */}
                <GoogleMapContext.Provider value={{ map: scheduleExampleMap as google.maps.Map, setMap: setScheduleExampleMap }}>
                    <GoogleMap opts={OPTIONS_TEST_SCHEDULE}>
                        <SelectedPlaceContext.Provider value={{ selectedPlaceId, setSelectedPlaceId }}>
                            <GoogleMapMarker {...airportPlace} />
                            {
                                (scheduleAnswer !== undefined) &&
                                Object.entries(places).map(([id, place], index) => (
                                    <Fragment key={id}>
                                        <GoogleMapMarker id={id} {...place} isActive={(scheduleAnswer === 0) || (place.option <= scheduleAnswer)} />
                                        <GoogleMapPolyline
                                            coordinates={[
                                                (index > 0) ? Object.values(places)[index - 1].position : airportPlace.position,
                                                place.position
                                            ]}
                                            {...place}
                                            isActive={place.option <= scheduleAnswer}
                                        />
                                    </Fragment>
                                ))
                            }
                        </SelectedPlaceContext.Provider>
                    </GoogleMap>
                </GoogleMapContext.Provider>
            </div>
        </div>
    );
}
export default ScheduleTestContent