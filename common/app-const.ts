import { SliderProps } from "@mui/material";
import { ExpectationTag } from "~/interfaces/enums/ExpectationTag";
import { TripTag } from "../interfaces/enums/TripTag";
import { ActivityTag } from "~/interfaces/enums/ActivityTag";
import { CityTag } from "~/interfaces/enums/CityTag";

export const USER = {
    maxNicknameLength: 5,
    maxPasswordLength: 8
}
export const PAGES = {
    test: {
        path: 'test',
        icon: 'letter'
    },
    result: {
        path: 'result',
        icon: 'paw'
    },
    chemistry: {
        path: 'myChemistry',
        icon: 'suitcase'
    },
}

export const HEADERS_AXIOS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

export const TRIP_TAGS = {
    [TripTag.DEFAULT]: {
        label: "여행자",
        icon: "tour",
    },
    [TripTag.PHOTO]: {
        label: "사진사",
        icon: "photo_camera",
    },
    [TripTag.EAT]: {
        label: "미식가",
        icon: "ramen_dining",
    },
    [TripTag.FRIENDSHIP]: {
        label: "우정의 수호자",
        icon: "favorite",
    },
    [TripTag.PHYSICAL]: {
        label: "액티비티",
        icon: "surfing",
    },
    [TripTag.REST]: {
        label: "휴식이 필요해",
        icon: "forest",
    },
    [TripTag.INFLUENCER]: {
        label: "인플루언서",
        icon: "share",
    },
    [TripTag.COFFEE]: {
        label: "카페 탐방",
        icon: "local_cafe",
    },
    [TripTag.CULTURE]: {
        label: "문화 생활",
        icon: "palette",
    },
    [TripTag.ADVENTURE]: {
        label: "모험가",
        icon: "travel_explore",
    },
    [TripTag.PASSION]: {
        label: "열정적",
        icon: "local_fire_department",
    },
    [TripTag.REFRESH]: {
        label: "재충전",
        icon: "battery_charging_full",
    },
}

export const HASHTAGS = {
    expectation: {
        [ExpectationTag.HEAL]: {
            label: "치유되는",
        },
        [ExpectationTag.COMPACT]: {
            label: "알찬",
        },
        [ExpectationTag.FULLFILL]: {
            label: "보람있는",
        },
        [ExpectationTag.MEMORY]: {
            label: "추억",
        },
        [ExpectationTag.RELAX]: {
            label: "여유로운",
        },
        [ExpectationTag.COMFORT]: {
            label: "편안한",
        },
        [ExpectationTag.ADVENTURE]: {
            label: "모험",
        },
        [ExpectationTag.NEW]: {
            label: "새로운 경험",
        },
        [ExpectationTag.DIGITAL_DETOX]: {
            label: "디지털 디톡스",
        },
        [ExpectationTag.REST]: {
            label: "휴식",
        },
        [ExpectationTag.VIEW]: {
            label: "풍경",
        },
        [ExpectationTag.FRIENDSHIP]: {
            label: "우정",
        },
    },
    activity: {
        [ActivityTag.PHOTO]: {
            label: "사진",
        },
        [ActivityTag.INSTA]: {
            label: "인스타그램",
        },
        [ActivityTag.NETWORK]: {
            label: "새 친구 사귀기",
        },
        [ActivityTag.EXTREME]: {
            label: "익스트림 액티비티",
        },
        [ActivityTag.SWIM]: {
            label: "물놀이",
        },
        [ActivityTag.DRIVE]: {
            label: "드라이브",
        },
        [ActivityTag.WALK]: {
            label: "산책",
        },
        [ActivityTag.THEMEPARK]: {
            label: "테마파크",
        },
        [ActivityTag.MARKET]: {
            label: "시장 구경",
        },
        [ActivityTag.HOTEL]: {
            label: "호캉스",
        },
        [ActivityTag.VLOG]: {
            label: "브이로그",
        },
        [ActivityTag.EAT]: {
            label: "맛집탐방",
        },
        [ActivityTag.BAR]: {
            label: "근사한 바에서 술",
        },
        [ActivityTag.CAFE]: {
            label: "카페 탐방",
        },
        [ActivityTag.SHOPPING]: {
            label: "쇼핑",
        },
        [ActivityTag.SHOW]: {
            label: "공연",
        },
        [ActivityTag.MUSEUM]: {
            label: "미술관",
        },
    },
    city: {
        [CityTag.QUIET]: {
            label: "조용한",
        },
        [CityTag.LOUD]: {
            label: "시끌벅적한",
        },
        [CityTag.ACTIVE]: {
            label: "활기찬",
        },
        [CityTag.HISTORY]: {
            label: "유서깊은",
        },
        [CityTag.MODERN]: {
            label: "현대적인",
        },
        [CityTag.FAMOUS]: {
            label: "유명한",
        },
        [CityTag.HIDDEN]: {
            label: "숨겨진",
        },
        [CityTag.NATURE]: {
            label: "자연",
        },
        [CityTag.INTERNATIONAL]: {
            label: "국제적인",
        },
    }
}

export const LINK = {
    "travel-japan": {
        link: ""
    },
    "tabelog": {
        link: "https://tabelog.com/kr/"
    },
    "tripadvisor": {
        link: "https://www.tripadvisor.co.kr/Restaurants"
    },
    "website": {
        link: ""
    },
    "hongkong-tourism-board": {
        link: ""
    },
}

export const PREFERENCE_OPTIONS = {
    "1": {
        value: 1,
        label: "싫어",
        icon: "😡",
    },
    "2": {
        value: 2,
        label: "별로야",
        icon: "😤",
    },
    "3": {
        value: 3,
        label: "상관 없어",
        icon: "🤔",
    },
    "4": {
        value: 4,
        label: "좋아",
        icon: "😃",
    },
    "5": {
        value: 5,
        label: "취향 저격",
        icon: "😍",
    },
}

export interface ICharacter {
    name: string
    prefix: string
    body: string
}

export const CHARACTERS = {
    none:
    {
        name: "",
        prefix: "",
        body: ""
    },
    bee:
    {
        name: "부지런한 꿀벌",
        prefix: "쉴 틈이 없어요",
        body: "알차고 보람이 많은 여행을 꿈꿔요. 여행 전에 갈 곳을 찾아보고 계획을 짜는 일도 즐길 수 있어요.\n"
            + "여행지에서는 부지런히 돌아다니며 최대한 많은 경험을 해야해요.\n 여행이 다가오는데 아무런 계획이 없거나, 여행지에서 시간을 허투루 쓰는 것은 좋아하지 않아요."
    },
    sloth:
    {
        name: "느긋한 나무늘보",
        prefix: "여유만만",
        body: "여행은 여유와 쉼이랍니다.\n"
            + "널널한 일정으로 한 곳을 오래 둘러보고 바쁜 일상과는 다르게 여행을 통해 푹 쉬는 것을 좋아해요.\n 계획을 너무 빡빡하게 세우거나 일정을 소화하기 위해 여행 중에 지치고 긴장하는 것은 싫어요."
    },
    panda:
    {
        name: "미식가 판다",
        prefix: "새로운 맛을 찾아볼까",
        body: "새로운 미식 경험을 위해 떠날 준비가 되어있어요.\n"
            + "여행 중 매 끼니는 미리 계획하고 필요하다면 줄 서서 기다리는 것도 좋아요. 여행지에 특별한 음식이 있다면 반드시 먹어봐야 하죠.\n 여행인데도 불구하고 식비를 아끼거나 집에서도 먹을 수 있는 음식으로 끼니를 때우는 건 싫어요."
    },
    racoon:
    {
        name: "도시의 너구리",
        prefix: "세련된 여행가",
        body: "사람이 많고 현대적인 도시로 떠나는 편한 여행을 좋아해요.\n"
            + "쇼핑을 하거나 공연을 보는 것도 좋아요.깔끔한 도시라면 어느 곳을 가던 함께 즐길 수 있는 좋은 여행 친구에요. 외지거나 생활이 불편한 곳으로의 여행은 고민이 필요할 수도 있으니 꼭 미리 의논해주세요."
    }
}

export type ICharacterId = keyof typeof CHARACTERS

export const FOOD = {
    kyudong:
    {
        name: "규동",
        city: "jp",
        restaurant: "yoshinoya",
        restaurantName: "요시노야",
        nation: "jp",
        linkType: "website",
        link: "https://www.yoshinoya.com/",
    },
    wantang:
    {
        name: "완탕면",
        city: "hongkong",
        restaurant: "tsim-chai-kee",
        restaurantName: "침차이키",
        nation: "hk",
        linkType: "tripadvisor",
        link: "https://www.tripadvisor.co.kr/Restaurant_Review-g294217-d1094369-Reviews-Tsim_Chai_Kee_Noodle_Shop-Hong_Kong.html",
    },
    churos:
    {
        name: "츄러스",
        city: "hongkong",
        restaurant: "twist&buckle",
        restaurantName: "Twist & Buckle",
        nation: "hk",
        linkType: "website",
        link: "https://www.twistandbuckle.com/",
    },
    ramen:
    {
        name: "라멘",
        city: "osaka",
        restaurant: "iida-shouten-ramen",
        restaurantName: "라멘 이이다쇼텐",
        nation: "jp",
        linkType: "tabelog",
        link: "https://tabelog.com/en/kanagawa/A1410/A141002/14038776/",
    },
    udon:
    {
        name: "우동",
        city: "tokyo",
        restaurant: "udon-maruka",
        restaurantName: "우동 마루카",
        nation: "jp",
        linkType: "tabelog",
        link: "https://tabelog.com/kr/osaka/A2707/A270704/27011240/",
    },
    dumpling:
    {
        name: "딤섬",
        city: "hongkong",
        restaurant: "timhowan",
        restaurantName: "팀호완",
        nation: "hk",
        linkType: "website",
        link: "https://www.timhowan.com/",
    },
    sushi:
    {
        name: "초밥",
        city: "sapporo",
        restaurant: "nemuro-hanamaru",
        restaurantName: "네무로 하나마루",
        nation: "jp",
        linkType: "tabelog",
        link: "https://tabelog.com/kr/hokkaido/A0101/A010101/1001102/",
    },
    afternoonTea:
    {
        name: "애프터눈 티",
        city: "hongkong",
        restaurant: "peninsula-hk",
        restaurantName: "페닌슐라 호텔 홍콩",
        nation: "hk",
        linkType: "website",
        link: "https://www.peninsula.com/en/hong-kong/hotel-fine-dining/the-lobby-afternoon-tea",
    },

    hitsumabushi:
    {
        name: "장어덮밥",
        city: "tokyo",
        restaurant: "tomoei",
        restaurantName: "토모에이",
        nation: "jp",
        linkType: "tabelog",
        link: "https://tabelog.com/en/kanagawa/A1410/A141001/14001626/",
    },
    yakitori:
    {
        name: "야키토리",
        city: "tokyo",
        restaurant: "torishiki",
        restaurantName: "토리시키",
        nation: "jp",
        linkType: "tabelog",
        link: "https://tabelog.com/kr/tokyo/A1316/A131601/13041029/",
    },
    chiliCrab:
    {
        name: "칠리크랩",
        city: "hongkong",
        restaurant: "underbridge-spicy-crab",
        restaurantName: "언더브릿지 스파이시 크랩",
        nation: "hk",
        linkType: "tripadvisor",
        link: "https://www.tripadvisor.com/Restaurant_Review-g294217-d1089734-Reviews-Under_the_Bridge_Spicy_Crab-Hong_Kong.html",
    },
    mandaringrill:
    {
        name: "퓨전 파인다이닝",
        city: "hongkong",
        restaurant: "mandarin-grill",
        restaurantName: "만다린 그릴",
        price: 100000,
        nation: "jp",
        linkType: "website",
        link: "https://www.mandarinoriental.com/en/hong-kong/victoria-harbour/dine/mandarin-grill-and-bar",
    },
    more:
    {
        name: "그 이상",
        city: "hongkong",
        restaurant: "",
        restaurantName: "",
        price: 100000,
        nation: "",
        linkType: "website",
        link: "",
    },
};

export type ICityType = "metropolis" | "history" | "nature" | "small"
export const CITY_TYPES: Record<ICityType, {
    title: string,
    icon: string,
    examples: string[]
}> = {
    "metropolis":
    {
        title: "현대적 대도시",
        icon: "domain",
        examples: [
            "tokyo",
            "osaka",
            "yokohama",
            "hongkong",
        ],
    },
    "history":
    {
        title: "문화유산이 많은 도시",
        icon: "temple_buddhist",
        examples: [
            "kyoto",
            "nara",
            "kamakura",
        ]
    },
    "nature":
    {
        title: "아름다운 자연 경관",
        icon: "forest",
        examples: [
            "shiretoko",
            "yakushima",
            "biei",
        ]
    },
    "small":
    {
        title: "조용한 소도시",
        icon: "forest",
        examples: [
            "takamatsu",
            "onomichi",
        ]
    },
};
export const CITY_TYPE_KEYS = Object.keys(CITY_TYPES);

export const TEST_TYPE = {
    "leadership": {
        "answers": {
            1:
            {
                value: 1,
                icon: "1",
            },
            2:
            {
                value: 2,
                icon: "2",
            },
            3:
            {
                value: 3,
                icon: "3",
            },
        },
    },
    "schedule": {
        title: "일정은 얼마나 알차면 좋을까?",
        instruction: "답변을 눌러서 선택해봐!",
        "sliderProps": {
            "step": 1,
            "min": 0,
            "max": 4
        },
        "answers": {
            1:
            {
                value: 1,
                icon: "1",
            },
            2:
            {
                value: 2,
                icon: "2",
            },
            3:
            {
                value: 3,
                icon: "3",
            },
            4:
            {
                value: 4,
                icon: "4",
            },
            5:
            {
                value: 5,
                icon: "5",
            }
        },
    },
    "budget": {
    },
    "city": {
        titleTextList: [
            "/testKey",
            " 여행은 어때?"
        ],
        "sliderProps": {
            "step": 1,
            "min": 0,
            "max": 4
        },
        "answers": {
            1:
            {
                value: 1,
                icon: "😡",
            },
            2:
            {
                value: 2,
                icon: "😤",
            },
            3:
            {
                value: 3,
                icon: "🤔",
            },
            4:
            {
                value: 4,
                icon: "😃",
            },
            5:
            {
                value: 5,
                icon: "😍",
            },
        },
    },
    "hashtag": {
        selectedMinLength: 2
    },
}

export const TEST = {
    leadership: {
        subTests: {
            leadership:
            {
                icon: "groups",
                sectionIndex: 0
            }
        }
    },
    schedule: {
        subTests: {
            schedule:
            {
                icon: "edit_calendar",
                sectionIndex: 1,
                airportPlace:
                {
                    position: {
                        lat: 33.605,
                        lng: 130.404,
                    },
                    name: 'fukuoka-airport',
                    label: '후쿠오카 공항',
                    icon: 'flight',
                    href: 'https://www.fukuoka-airport.jp/ko/',
                    infoWindowStyle: 'simple'
                },
                places: [
                    {
                        position: {
                            lat: 33.5932449,
                            lng: 130.4020225,
                        },
                        name: 'ichiran-fukuoka',
                        label: '이치란 본점',
                        icon: 'restaurant',
                        body: '돼지 사골 국물로 만든 돈코쓰 라멘을 전문으로 하는 편안한 분위기의 레스토랑.',
                        href: 'https://maps.app.goo.gl/16GR87KEjvMhibAR9',
                        option: 1,
                    },
                    {
                        position: {
                            lat: 33.5897988,
                            lng: 130.4085279,
                        },
                        name: 'canal-city-hakata',
                        label: '캐널시티',
                        icon: 'shopping_cart',
                        body: '유명 브랜드와 전문 매장, 식당가가 입점한 대형 쇼핑몰로 분수 쇼가 펼쳐집니다.',
                        href: 'https://maps.app.goo.gl/EzJP78zovYCqWsD76',
                        option: 1,
                    },
                    {
                        position: {
                            lat: 33.6147611,
                            lng: 130.4216325,
                        },
                        name: 'hakozaki-shrine',
                        label: '하코자키 궁',
                        icon: 'temple_buddhist',
                        body: '활기찬 경내와 대표적 유물이 있고 전통 이벤트가 열리는 유서 깊은 신사.',
                        href: 'https://maps.app.goo.gl/CHYBKRNS9bYWReNv6',
                        option: 2,
                    },
                    {
                        position: {
                            lat: 33.6133009,
                            lng: 130.4307441,
                        },
                        name: 'hakuhaku',
                        label: '하쿠하쿠',
                        icon: 'museum',
                        body: '일본식 명란젓을 만드는 후쿠야의 하카타 음식 및 문화 박물관.',
                        href: 'https://maps.app.goo.gl/rGYZGkXGYicQZieR6',
                        option: 2,
                    },
                    {
                        position: {
                            lat: 33.586,
                            lng: 130.454,
                        },
                        name: 'tempura-hirao',
                        label: '덴푸라 히라오 본점',
                        icon: 'restaurant',
                        body: '후쿠오카의 맛있는 덴푸라 가게.',
                        href: 'https://maps.app.goo.gl/rnASDN2w1SFdswMm8',
                        option: 3,
                    },
                    {
                        position: {
                            lat: 33.5893684,
                            lng: 130.4172629,
                        },
                        name: 'hankyu-hakata',
                        label: '한큐백화점 하카타',
                        icon: 'shopping_cart',
                        body: '“세련되고 즐거운” 대형 백화점 하카타 한큐',
                        href: 'https://maps.app.goo.gl/D3aS5d1NZMxDn2rD6',
                        option: 3,
                    },
                    {
                        position: {
                            lat: 33.5650103,
                            lng: 130.4388288,
                        },
                        name: 'gundam-fukuoka',
                        label: '건담 파크 후쿠오카',
                        icon: 'tour',
                        body: '기동전사건담 시리즈의 세계관을 즐길수 있는 종합 엔터테인먼트 시설.',
                        href: 'https://maps.app.goo.gl/CuTbExgR5b6KkhZH8',
                        option: 4,
                    },
                    {
                        position: {
                            lat: 33.5626837,
                            lng: 130.3738197,
                        },
                        name: 'yusentei',
                        label: '유센테이',
                        icon: 'tour',
                        body: '1754년에 지어진 구로다 쓰구타카의 옛 저택으로 현재는 정원, 연못, 찻집이 있는 공원.',
                        href: 'https://maps.app.goo.gl/72zJsM8cowxYP8oE9',
                        option: 4,
                    },
                    {
                        position: {
                            lat: 33.5897904,
                            lng: 130.3504891,
                        },
                        name: 'fukuoka-museum',
                        label: '후쿠오카시 박물관',
                        icon: 'museum',
                        body: '나국의 금박 인장을 비롯하여 후쿠오카의 역사 전시를 관람할 수 있는 현대적인 박물관입니다.',
                        href: 'https://maps.app.goo.gl/FtKt6uwJCjE4eJ1M6',
                        option: 5,
                    },
                    {
                        position: {
                            lat: 33.5934691,
                            lng: 130.3465043,
                        },
                        name: 'momochi',
                        label: '모모치해변',
                        icon: 'beach_access',
                        body: '인공 섬을 따라 난 인기 있는 인공 해변으로, 길게 뻗은 모래사장에서 발리볼을 즐길 수 있습니다.',
                        href: 'https://maps.app.goo.gl/fR7ENJtjFyaWWX9Q9',
                        option: 5,
                    },
                ],
                examples: {
                    1: {
                        zoom: 13.5,
                        center: { lat: 33.60, lng: 130.405 },
                    },
                    2: {
                        zoom: 13,
                        center: { lat: 33.605, lng: 130.42 },
                    },
                    3: {
                        zoom: 13,
                        center: { lat: 33.605, lng: 130.427 },
                    },
                    4: {
                        zoom: 12,
                        center: { lat: 33.6000, lng: 130.415 },
                    },
                    5: {
                        zoom: 12,
                        center: { lat: 33.6000, lng: 130.40 },
                    },
                }
            },
        }
    },
    restaurant:
    {
        type: 'budget',
        icon: "dailyRestaurantBudget",
        "examples": {
            5000: "kyudong",
            10000: "wantang",
            15000: "ramen",
            20000: "dumpling",
            25000: "afternoonTea",
            30000: "sushi",
            35000: "chiliCrab",
            40000: "yakitori",
            45000: "hitsumabushi",
            50000: "more",
        },
        more: [
            "tripadvisor",
            "tabelog"
        ]
    },
    city: {
        subTests: {
            metropolis:
            {
                icon: "domain",
                sectionIndex: 3,
                examples: [
                    "tokyo",
                    "osaka",
                    "yokohama",
                    "hongkong",
                ],
            },
            history:
            {
                icon: "temple_buddhist",
                sectionIndex: 4,
                examples: [
                    "kyoto",
                    "nara",
                    "kamakura",
                ]
            },
            nature:
            {
                icon: "forest",
                sectionIndex: 5,
                examples: [
                    "shiretoko",
                    "yakushima",
                    "biei",
                ]
            },
        }
    },
    hashtag: {
        subTests: {
            tag: {
                icon: "edit_calendar",
                sectionIndex: 6,
                list: {
                    activity: [
                        "photo",
                        "insta",
                        "network",
                        "extreme",
                        "swim",
                        "drive",
                        "walk",
                        "themepark",
                        "market",
                        "hotel",
                        "vlog",
                        "waiting",
                        "bar",
                        "cafe",
                        "shopping",
                        "show",
                    ],
                    general: [
                        "heal",
                        "compact",
                        "fullfill",
                        "memory",
                        "relax",
                        "comfort",
                        "adventure",
                        "new",
                        "digital_detox",
                        "rest",
                        "view",
                    ],
                },
            }
        }
    },
}


export const TEST_SECTIONS = {
    expectation:
    {
        type: "hashtag",
        icon: "temple_buddhist",
    },
    activity:
    {
        type: "hashtag",
        icon: "temple_buddhist",
    },
    leadership:
    {
        type: 'leadership',
        icon: "groups",
    },
    schedule:
    {
        type: 'schedule',
        icon: "edit_calendar",
        airportPlace:
        {
            position: {
                lat: 33.61,
                lng: 130.8,
            },
            label: '공항',
            // icon: 'flight',
        },
        examples: {
            1: {
                places: [
                    {
                        position: {
                            lat: 33.5897988,
                            lng: 130.4085279,
                        },
                        label: '캐널시티',
                        icon: 'shopping_cart',
                    },
                    {
                        position: {
                            lat: 33.5932449,
                            lng: 130.4020225,
                        },
                        label: '이치란\n본점',
                        icon: 'restaurant',
                    },
                ],
                zoom: 13.5,
                center: { lat: 33.5900, lng: 130.415 },
            },
            2: {
                places: [
                    {
                        position: {
                            lat: 33.6133009,
                            lng: 130.4307441,
                        },
                        label: '하쿠하쿠',
                        icon: 'museum',
                    },
                    {
                        position: {
                            lat: 33.6147611,
                            lng: 130.4216325,
                        },
                        label: '하코자키 궁',
                        icon: 'temple_buddhist',
                    },
                ],
                zoom: 13,
                center: { lat: 33.5950, lng: 130.425 },
            },
            3: {
                places: [
                    {
                        position: {
                            lat: 33.5893684,
                            lng: 130.4172629,
                        },
                        label: '한큐백화점\n하카타점',
                        icon: 'shopping_cart',
                    },
                    {
                        position: {
                            lat: 33.5838392,
                            lng: 130.4539866,
                        },
                        label: '덴푸라 히라오\n본점',
                        icon: 'restaurant',
                    },
                ],
                zoom: 13,
                center: { lat: 33.5950, lng: 130.425 },
            },
            4: {
                places: [
                    {
                        position: {
                            lat: 33.5626837,
                            lng: 130.3738197,
                        },
                        label: '유센테이',
                        icon: 'tour',
                    },
                    {
                        position: {
                            lat: 33.5650103,
                            lng: 130.4388288,
                        },
                        label: '건담 파크\n후쿠오카',
                        icon: 'tour',

                    },
                ],
                zoom: 12,
                center: { lat: 33.5800, lng: 130.40 },
            },
            5: {
                places: [
                    {
                        position: {
                            lat: 33.5897904,
                            lng: 130.3504891,
                        },
                        label: '후쿠오카시\n박물관',
                        icon: 'museum',
                    },
                    {
                        position: {
                            lat: 33.5934691,
                            lng: 130.3465043,
                        },
                        label: '모모치해변',
                        icon: 'beach_access',
                    },
                ],
                zoom: 12,
                center: { lat: 33.5800, lng: 130.40 },
            },
        }
    },
    restaurant:
    {
        type: 'budget',
        icon: "restaurant",
        "examples": {
            5000: "kyudong",
            10000: "wantang",
            15000: "ramen",
            20000: "dumpling",
            25000: "afternoon-tea",
            30000: "sushi",
            35000: "chili-crab",
            40000: "yakitori",
            45000: "hitsumabushi",
            50000: "more",
        },
        more: [
            "tripadvisor",
            "tabelog"
        ]
    },
    metropolis:
    {
        type: "city",
        icon: "domain",
        examples: [
            "tokyo",
            "osaka",
            "yokohama",
            "hongkong",
        ],
    },
    history:
    {
        type: "city",
        icon: "temple_buddhist",
        examples: [
            "kyoto",
            "nara",
            "kamakura",
        ]
    },
    nature:
    {
        type: "city",
        icon: "forest",
        examples: [
            "shiretoko",
            "yakushima",
            "biei",
        ]
    },
    small:
    {
        type: "city",
        icon: "forest",
        examples: [
        ]
    }
};

export const CITIES = {
    jp:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/",
        linkType: "travel-japan",
        cityTags: [],
        activityTags: [],
        type: ""
    },
    osaka:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/destinations/kansai/osaka/",
        linkType: "travel-japan",
        cityTags: [CityTag.LOUD, CityTag.ACTIVE, CityTag.MODERN, CityTag.FAMOUS],
        activityTags: [ActivityTag.SHOPPING, ActivityTag.EAT, ActivityTag.THEMEPARK],
        type: "metropolis"
    },
    yokohama:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/destinations/kanto/kanagawa/yokohama-and-around/",
        linkType: "travel-japan",
        cityTags: [CityTag.QUIET, CityTag.MODERN],
        activityTags: [],
        type: "metropolis"
    },
    tokyo:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/destinations/kanto/tokyo/",
        linkType: "travel-japan",
        cityTags: [CityTag.LOUD, CityTag.ACTIVE, CityTag.MODERN, CityTag.FAMOUS, CityTag.INTERNATIONAL],
        activityTags: [ActivityTag.SHOPPING, ActivityTag.EAT, ActivityTag.THEMEPARK],
        type: "metropolis"
    },
    // 삿포로
    kyoto:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/destinations/kansai/kyoto/",
        linkType: "travel-japan",
        cityTags: [CityTag.HISTORY, CityTag.FAMOUS, CityTag.INTERNATIONAL],
        activityTags: [ActivityTag.WALK, ActivityTag.MARKET, ActivityTag.WALK, ActivityTag.PHOTO],
        type: "history"
    },
    nara:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/destinations/kansai/nara/",
        linkType: "travel-japan",
        cityTags: [CityTag.HISTORY, CityTag.INTERNATIONAL, CityTag.NATURE],
        activityTags: [],
        type: "history"
    },
    kamakura:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/destinations/kanto/kanagawa/kamakura-and-around/",
        linkType: "travel-japan",
        cityTags: [CityTag.ACTIVE, CityTag.HISTORY],
        activityTags: [ActivityTag.WALK],
        type: "history"
    },
    // 가와고에 가나자와
    shiretoko:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/spot/2143/",
        linkType: "travel-japan",
        cityTags: [CityTag.QUIET, CityTag.NATURE, CityTag.HIDDEN],
        activityTags: [ActivityTag.WALK],
        type: "nature"
    },
    yakushima:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/destinations/kyushu/kagoshima/yakushima/",
        linkType: "travel-japan",
        cityTags: [CityTag.QUIET, CityTag.NATURE, CityTag.HIDDEN],
        activityTags: [ActivityTag.WALK],
        type: "nature"
    },
    biei:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/spot/1890/",
        linkType: "travel-japan",
        cityTags: [CityTag.QUIET, CityTag.NATURE, CityTag.HIDDEN],
        activityTags: [ActivityTag.WALK],
        type: "nature"
    },
    takamatsu:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/destinations/shikoku/kagawa/takamatsu-area/",
        linkType: "travel-japan",
        cityTags: [CityTag.QUIET],
        activityTags: [ActivityTag.WALK, ActivityTag.EAT, ActivityTag.MUSEUM],
        type: "small"
    },
    onomichi:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/destinations/chugoku/hiroshima/onomichi-and-fukuyama/",
        linkType: "travel-japan",
        cityTags: [CityTag.QUIET, CityTag.HIDDEN],
        activityTags: [ActivityTag.WALK, ActivityTag.PHOTO],
        type: "small"
    },
    sapporo:
    {
        nation: "jp",
        link: "",
        linkType: "",
        cityTags: [CityTag.QUIET],
        activityTags: [ActivityTag.WALK],
        type: ""
    },
    hongkong:
    {
        nation: "hk",
        link: "https://www.discoverhongkong.com/us/index.html",
        linkType: "hongkong-tourism-board",
        cityTags: [CityTag.LOUD, CityTag.ACTIVE, CityTag.MODERN, CityTag.FAMOUS, CityTag.INTERNATIONAL],
        activityTags: [ActivityTag.SHOPPING, ActivityTag.EAT],
        type: "metropolis"
    },
}

export const NATION = {
    "jp": {
        flag: true
    },
    "hk": {
        flag: true
    },
    "kr": {
        flag: true
    },
    "sea": {
        flag: false
    },
}

export const SLIDERPROPS_CHEMISTRY_BUDGET_FOOD: SliderProps = {
    step: 5000,
    min: 5000,
    max: 50000,
};