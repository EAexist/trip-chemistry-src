
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

// export const FOOD = {
//     kyudong:
//     {
//         name: "규동",
//         city: "jp",
//         restaurant: "yoshinoya",
//         restaurantName: "요시노야",
//         nation: "jp",
//         linkType: "website",
//         link: "https://www.yoshinoya.com/",
//     },
//     wantang:
//     {
//         name: "완탕면",
//         city: "hongkong",
//         restaurant: "tsim-chai-kee",
//         restaurantName: "침차이키",
//         nation: "hk",
//         linkType: "tripadvisor",
//         link: "https://www.tripadvisor.co.kr/Restaurant_Review-g294217-d1094369-Reviews-Tsim_Chai_Kee_Noodle_Shop-Hong_Kong.html",
//     },
//     churos:
//     {
//         name: "츄러스",
//         city: "hongkong",
//         restaurant: "twist&buckle",
//         restaurantName: "Twist & Buckle",
//         nation: "hk",
//         linkType: "website",
//         link: "https://www.twistandbuckle.com/",
//     },
//     ramen:
//     {
//         name: "라멘",
//         city: "osaka",
//         restaurant: "iida-shouten-ramen",
//         restaurantName: "라멘 이이다쇼텐",
//         nation: "jp",
//         linkType: "tabelog",
//         link: "https://tabelog.com/en/kanagawa/A1410/A141002/14038776/",
//     },
//     udon:
//     {
//         name: "우동",
//         city: "tokyo",
//         restaurant: "udon-maruka",
//         restaurantName: "우동 마루카",
//         nation: "jp",
//         linkType: "tabelog",
//         link: "https://tabelog.com/kr/osaka/A2707/A270704/27011240/",
//     },
//     dumpling:
//     {
//         name: "딤섬",
//         city: "hongkong",
//         restaurant: "timhowan",
//         restaurantName: "팀호완",
//         nation: "hk",
//         linkType: "website",
//         link: "https://www.timhowan.com/",
//     },
//     sushi:
//     {
//         name: "초밥",
//         city: "sapporo",
//         restaurant: "nemuro-hanamaru",
//         restaurantName: "네무로 하나마루",
//         nation: "jp",
//         linkType: "tabelog",
//         link: "https://tabelog.com/kr/hokkaido/A0101/A010101/1001102/",
//     },
//     afternoonTea:
//     {
//         name: "애프터눈 티",
//         city: "hongkong",
//         restaurant: "peninsula-hk",
//         restaurantName: "페닌슐라 호텔 홍콩",
//         nation: "hk",
//         linkType: "website",
//         link: "https://www.peninsula.com/en/hong-kong/hotel-fine-dining/the-lobby-afternoon-tea",
//     },

//     hitsumabushi:
//     {
//         name: "장어덮밥",
//         city: "tokyo",
//         restaurant: "tomoei",
//         restaurantName: "토모에이",
//         nation: "jp",
//         linkType: "tabelog",
//         link: "https://tabelog.com/en/kanagawa/A1410/A141001/14001626/",
//     },
//     yakitori:
//     {
//         name: "야키토리",
//         city: "tokyo",
//         restaurant: "torishiki",
//         restaurantName: "토리시키",
//         nation: "jp",
//         linkType: "tabelog",
//         link: "https://tabelog.com/kr/tokyo/A1316/A131601/13041029/",
//     },
//     chiliCrab:
//     {
//         name: "칠리크랩",
//         city: "hongkong",
//         restaurant: "underbridge-spicy-crab",
//         restaurantName: "언더브릿지 스파이시 크랩",
//         nation: "hk",
//         linkType: "tripadvisor",
//         link: "https://www.tripadvisor.com/Restaurant_Review-g294217-d1089734-Reviews-Under_the_Bridge_Spicy_Crab-Hong_Kong.html",
//     },
//     mandaringrill:
//     {
//         name: "퓨전 파인다이닝",
//         city: "hongkong",
//         restaurant: "mandarin-grill",
//         restaurantName: "만다린 그릴",
//         price: 100000,
//         nation: "jp",
//         linkType: "website",
//         link: "https://www.mandarinoriental.com/en/hong-kong/victoria-harbour/dine/mandarin-grill-and-bar",
//     },
//     more:
//     {
//         name: "그 이상",
//         city: "hongkong",
//         restaurant: "",
//         restaurantName: "",
//         price: 100000,
//         nation: "",
//         linkType: "website",
//         link: "",
//     },
// };

// export type ICityType = "metropolis" | "history" | "nature" | "small"
// export const CITY_TYPES: Record<ICityType, {
//     title: string,
//     icon: string,
//     examples: string[]
// }> = {
//     "metropolis":
//     {
//         title: "현대적 대도시",
//         icon: "domain",
//         examples: [
//             "tokyo",
//             "osaka",
//             "yokohama",
//             "hongkong",
//         ],
//     },
//     "history":
//     {
//         title: "문화유산이 많은 도시",
//         icon: "temple_buddhist",
//         examples: [
//             "kyoto",
//             "nara",
//             "kamakura",
//         ]
//     },
//     "nature":
//     {
//         title: "아름다운 자연 경관",
//         icon: "forest",
//         examples: [
//             "shiretoko",
//             "yakushima",
//             "biei",
//         ]
//     },
//     "small":
//     {
//         title: "조용한 소도시",
//         icon: "forest",
//         examples: [
//             "takamatsu",
//             "onomichi",
//         ]
//     },
// };
// export const CITY_TYPE_KEYS = Object.keys(CITY_TYPES);

// export const TEST = {
//     leadership: {
//         subTests: {
//             leadership:
//             {
//                 icon: "groups",
//                 sectionIndex: 0
//             }
//         }
//     },
//     schedule: {
//         subTests: {
//             schedule:
//             {
//                 icon: "edit_calendar",
//                 sectionIndex: 1,
//                 airportPlace:
//                 {
//                     position: {
//                         lat: 33.605,
//                         lng: 130.404,
//                     },
//                     name: 'fukuoka-airport',
//                     label: '후쿠오카 공항',
//                     icon: 'flight',
//                     href: 'https://www.fukuoka-airport.jp/ko/',
//                     infoWindowStyle: 'simple'
//                 },
//                 places: [
//                     {
//                         position: {
//                             lat: 33.5932449,
//                             lng: 130.4020225,
//                         },
//                         name: 'ichiran-fukuoka',
//                         label: '이치란 본점',
//                         icon: 'restaurant',
//                         body: '돼지 사골 국물로 만든 돈코쓰 라멘을 전문으로 하는 편안한 분위기의 레스토랑.',
//                         href: 'https://maps.app.goo.gl/16GR87KEjvMhibAR9',
//                         option: 1,
//                     },
//                     {
//                         position: {
//                             lat: 33.5897988,
//                             lng: 130.4085279,
//                         },
//                         name: 'canal-city-hakata',
//                         label: '캐널시티',
//                         icon: 'shopping_cart',
//                         body: '유명 브랜드와 전문 매장, 식당가가 입점한 대형 쇼핑몰로 분수 쇼가 펼쳐집니다.',
//                         href: 'https://maps.app.goo.gl/EzJP78zovYCqWsD76',
//                         option: 1,
//                     },
//                     {
//                         position: {
//                             lat: 33.6147611,
//                             lng: 130.4216325,
//                         },
//                         name: 'hakozaki-shrine',
//                         label: '하코자키 궁',
//                         icon: 'temple_buddhist',
//                         body: '활기찬 경내와 대표적 유물이 있고 전통 이벤트가 열리는 유서 깊은 신사.',
//                         href: 'https://maps.app.goo.gl/CHYBKRNS9bYWReNv6',
//                         option: 2,
//                     },
//                     {
//                         position: {
//                             lat: 33.6133009,
//                             lng: 130.4307441,
//                         },
//                         name: 'hakuhaku',
//                         label: '하쿠하쿠',
//                         icon: 'museum',
//                         body: '일본식 명란젓을 만드는 후쿠야의 하카타 음식 및 문화 박물관.',
//                         href: 'https://maps.app.goo.gl/rGYZGkXGYicQZieR6',
//                         option: 2,
//                     },
//                     {
//                         position: {
//                             lat: 33.586,
//                             lng: 130.454,
//                         },
//                         name: 'tempura-hirao',
//                         label: '덴푸라 히라오 본점',
//                         icon: 'restaurant',
//                         body: '후쿠오카의 맛있는 덴푸라 가게.',
//                         href: 'https://maps.app.goo.gl/rnASDN2w1SFdswMm8',
//                         option: 3,
//                     },
//                     {
//                         position: {
//                             lat: 33.5893684,
//                             lng: 130.4172629,
//                         },
//                         name: 'hankyu-hakata',
//                         label: '한큐백화점 하카타',
//                         icon: 'shopping_cart',
//                         body: '“세련되고 즐거운” 대형 백화점 하카타 한큐',
//                         href: 'https://maps.app.goo.gl/D3aS5d1NZMxDn2rD6',
//                         option: 3,
//                     },
//                     {
//                         position: {
//                             lat: 33.5650103,
//                             lng: 130.4388288,
//                         },
//                         name: 'gundam-fukuoka',
//                         label: '건담 파크 후쿠오카',
//                         icon: 'tour',
//                         body: '기동전사건담 시리즈의 세계관을 즐길수 있는 종합 엔터테인먼트 시설.',
//                         href: 'https://maps.app.goo.gl/CuTbExgR5b6KkhZH8',
//                         option: 4,
//                     },
//                     {
//                         position: {
//                             lat: 33.5626837,
//                             lng: 130.3738197,
//                         },
//                         name: 'yusentei',
//                         label: '유센테이',
//                         icon: 'tour',
//                         body: '1754년에 지어진 구로다 쓰구타카의 옛 저택으로 현재는 정원, 연못, 찻집이 있는 공원.',
//                         href: 'https://maps.app.goo.gl/72zJsM8cowxYP8oE9',
//                         option: 4,
//                     },
//                     {
//                         position: {
//                             lat: 33.5897904,
//                             lng: 130.3504891,
//                         },
//                         name: 'fukuoka-museum',
//                         label: '후쿠오카시 박물관',
//                         icon: 'museum',
//                         body: '나국의 금박 인장을 비롯하여 후쿠오카의 역사 전시를 관람할 수 있는 현대적인 박물관입니다.',
//                         href: 'https://maps.app.goo.gl/FtKt6uwJCjE4eJ1M6',
//                         option: 5,
//                     },
//                     {
//                         position: {
//                             lat: 33.5934691,
//                             lng: 130.3465043,
//                         },
//                         name: 'momochi',
//                         label: '모모치해변',
//                         icon: 'beach_access',
//                         body: '인공 섬을 따라 난 인기 있는 인공 해변으로, 길게 뻗은 모래사장에서 발리볼을 즐길 수 있습니다.',
//                         href: 'https://maps.app.goo.gl/fR7ENJtjFyaWWX9Q9',
//                         option: 5,
//                     },
//                 ],
//                 examples: {
//                     1: {
//                         zoom: 13.5,
//                         center: { lat: 33.60, lng: 130.405 },
//                     },
//                     2: {
//                         zoom: 13,
//                         center: { lat: 33.605, lng: 130.42 },
//                     },
//                     3: {
//                         zoom: 13,
//                         center: { lat: 33.605, lng: 130.427 },
//                     },
//                     4: {
//                         zoom: 12,
//                         center: { lat: 33.6000, lng: 130.415 },
//                     },
//                     5: {
//                         zoom: 12,
//                         center: { lat: 33.6000, lng: 130.40 },
//                     },
//                 }
//             },
//         }
//     },
//     restaurant:
//     {
//         type: 'budget',
//         icon: "dailyRestaurantBudget",
//         "examples": {
//             5000: "kyudong",
//             10000: "wantang",
//             15000: "ramen",
//             20000: "dumpling",
//             25000: "afternoonTea",
//             30000: "sushi",
//             35000: "chiliCrab",
//             40000: "yakitori",
//             45000: "hitsumabushi",
//             50000: "more",
//         },
//         more: [
//             "tripadvisor",
//             "tabelog"
//         ]
//     },
//     city: {
//         subTests: {
//             metropolis:
//             {
//                 icon: "domain",
//                 sectionIndex: 3,
//                 examples: [
//                     "tokyo",
//                     "osaka",
//                     "yokohama",
//                     "hongkong",
//                 ],
//             },
//             history:
//             {
//                 icon: "temple_buddhist",
//                 sectionIndex: 4,
//                 examples: [
//                     "kyoto",
//                     "nara",
//                     "kamakura",
//                 ]
//             },
//             nature:
//             {
//                 icon: "forest",
//                 sectionIndex: 5,
//                 examples: [
//                     "shiretoko",
//                     "yakushima",
//                     "biei",
//                 ]
//             },
//         }
//     },
//     hashtag: {
//         subTests: {
//             tag: {
//                 icon: "edit_calendar",
//                 sectionIndex: 6,
//                 list: {
//                     activity: [
//                         "photo",
//                         "insta",
//                         "network",
//                         "extreme",
//                         "swim",
//                         "drive",
//                         "walk",
//                         "themepark",
//                         "market",
//                         "hotel",
//                         "vlog",
//                         "waiting",
//                         "bar",
//                         "cafe",
//                         "shopping",
//                         "show",
//                     ],
//                     general: [
//                         "heal",
//                         "compact",
//                         "fullfill",
//                         "memory",
//                         "relax",
//                         "comfort",
//                         "adventure",
//                         "new",
//                         "digital_detox",
//                         "rest",
//                         "view",
//                     ],
//                 },
//             }
//         }
//     },
// }


// export const TEST_SECTIONS = {
//     expectation:
//     {
//         type: "hashtag",
//         icon: "temple_buddhist",
//     },
//     activity:
//     {
//         type: "hashtag",
//         icon: "temple_buddhist",
//     },
//     leadership:
//     {
//         type: 'leadership',
//         icon: "groups",
//     },
//     schedule:
//     {
//         type: 'schedule',
//         icon: "edit_calendar",
//         airportPlace:
//         {
//             position: {
//                 lat: 33.61,
//                 lng: 130.8,
//             },
//             label: '공항',
//             // icon: 'flight',
//         },
//         examples: {
//             1: {
//                 places: [
//                     {
//                         position: {
//                             lat: 33.5897988,
//                             lng: 130.4085279,
//                         },
//                         label: '캐널시티',
//                         icon: 'shopping_cart',
//                     },
//                     {
//                         position: {
//                             lat: 33.5932449,
//                             lng: 130.4020225,
//                         },
//                         label: '이치란\n본점',
//                         icon: 'restaurant',
//                     },
//                 ],
//                 zoom: 13.5,
//                 center: { lat: 33.5900, lng: 130.415 },
//             },
//             2: {
//                 places: [
//                     {
//                         position: {
//                             lat: 33.6133009,
//                             lng: 130.4307441,
//                         },
//                         label: '하쿠하쿠',
//                         icon: 'museum',
//                     },
//                     {
//                         position: {
//                             lat: 33.6147611,
//                             lng: 130.4216325,
//                         },
//                         label: '하코자키 궁',
//                         icon: 'temple_buddhist',
//                     },
//                 ],
//                 zoom: 13,
//                 center: { lat: 33.5950, lng: 130.425 },
//             },
//             3: {
//                 places: [
//                     {
//                         position: {
//                             lat: 33.5893684,
//                             lng: 130.4172629,
//                         },
//                         label: '한큐백화점\n하카타점',
//                         icon: 'shopping_cart',
//                     },
//                     {
//                         position: {
//                             lat: 33.5838392,
//                             lng: 130.4539866,
//                         },
//                         label: '덴푸라 히라오\n본점',
//                         icon: 'restaurant',
//                     },
//                 ],
//                 zoom: 13,
//                 center: { lat: 33.5950, lng: 130.425 },
//             },
//             4: {
//                 places: [
//                     {
//                         position: {
//                             lat: 33.5626837,
//                             lng: 130.3738197,
//                         },
//                         label: '유센테이',
//                         icon: 'tour',
//                     },
//                     {
//                         position: {
//                             lat: 33.5650103,
//                             lng: 130.4388288,
//                         },
//                         label: '건담 파크\n후쿠오카',
//                         icon: 'tour',

//                     },
//                 ],
//                 zoom: 12,
//                 center: { lat: 33.5800, lng: 130.40 },
//             },
//             5: {
//                 places: [
//                     {
//                         position: {
//                             lat: 33.5897904,
//                             lng: 130.3504891,
//                         },
//                         label: '후쿠오카시\n박물관',
//                         icon: 'museum',
//                     },
//                     {
//                         position: {
//                             lat: 33.5934691,
//                             lng: 130.3465043,
//                         },
//                         label: '모모치해변',
//                         icon: 'beach_access',
//                     },
//                 ],
//                 zoom: 12,
//                 center: { lat: 33.5800, lng: 130.40 },
//             },
//         }
//     },
//     restaurant:
//     {
//         type: 'budget',
//         icon: "restaurant",
//         "examples": {
//             5000: "kyudong",
//             10000: "wantang",
//             15000: "ramen",
//             20000: "dumpling",
//             25000: "afternoon-tea",
//             30000: "sushi",
//             35000: "chili-crab",
//             40000: "yakitori",
//             45000: "hitsumabushi",
//             50000: "more",
//         },
//         more: [
//             "tripadvisor",
//             "tabelog"
//         ]
//     },
//     metropolis:
//     {
//         type: "city",
//         icon: "domain",
//         examples: [
//             "tokyo",
//             "osaka",
//             "yokohama",
//             "hongkong",
//         ],
//     },
//     history:
//     {
//         type: "city",
//         icon: "temple_buddhist",
//         examples: [
//             "kyoto",
//             "nara",
//             "kamakura",
//         ]
//     },
//     nature:
//     {
//         type: "city",
//         icon: "forest",
//         examples: [
//             "shiretoko",
//             "yakushima",
//             "biei",
//         ]
//     },
//     small:
//     {
//         type: "city",
//         icon: "forest",
//         examples: [
//         ]
//     }
// };