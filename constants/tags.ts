import { ActivityTag } from "../interfaces/enums/ActivityTag";
import { CityTag } from "../interfaces/enums/CityTag";
import { ExpectationTag } from "../interfaces/enums/ExpectationTag";
import { TripTag } from "../interfaces/enums/TripTag";

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