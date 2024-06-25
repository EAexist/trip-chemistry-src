import { ActivityTag } from "../interfaces/enums/ActivityTag";
import { ExpectationTag } from "../interfaces/enums/ExpectationTag";
import { TripTag } from "../interfaces/enums/TripTag";

const stringTable_kr = {
    "_lang": "ko-kr",
    "public": {
        "common": {
            drawer: {
                home: {
                    title: "About"
                },
                test: {
                    title: "테스트"
                },
                result: {
                    title: "테스트 결과 보기"
                },
                chemistry: {
                    title: "내 여행"
                },
            },
            contact: {
                name: '운영팀',
                icon: 'support_agent',
                mail: 'hyeon.expression@gmail.com',
            },
            error: {
                connect: '지금 서버에 연결할 수 없어요. 잠시 후 다시 시도해주세요.',
                contact: '오류가 계속되면 운영팀에게 알려주세요.',
                // contact: ['오류가 계속되면 ', '/name', '에게 알려주세요.'],
                // connect: '지금 서버에 연결할 수 없어요. 잠시 후 다시 시도해주세요.',
            },
            title: "여행 타입 테스트",
            reference: "출처: ",
            linkText: "에서 보기",
            linkTextList: [
                "/link",
                "에서 ",
                "/city",
                " 더 알아보기",
            ],
            emoji: {
                great: "😍",
                good: "😃",
                soso: "🤔",
                bad: "😤",
                troll: "😡",
            },
            nation: {
                "jp": {
                    name: "일본",
                    flag: true
                },
                "hk": {
                    name: "홍콩",
                    flag: true
                },
                "kr": {
                    name: "한국",
                    flag: true
                },
                "sea": {
                    name: "동남아시아",
                    flag: false
                },
            },
            linkType: {
                "travel-japan": {
                    name: "Travel Japan",
                    body: ""
                },
                "tabelog": {
                    name: "타베로그",
                    body: "신뢰도 높은 일본 전국의 미식, 레스토랑 가이드"
                },
                "tripadvisor": {
                    name: "Tripadvisor",
                    body: "7억개가 넘는 리뷰를 보유한 세계 최대 여행 플랫폼"
                },
                "website": {
                    name: "웹사이트",
                    body: ""
                },
                "discovering-hongkong": {
                    name: "홍콩관광청",
                    body: ""
                },
            },
            restaurant: {
                "kyudong":
                {
                    "name": "규동",
                    "restaurantName": "요시노야",
                },
                "wantang":
                {
                    "name": "완탕면",
                    "restaurantName": "침차이키",
                },
                "churos":
                {
                    "name": "츄러스",
                    "restaurantName": "Twist & Buckle",
                },
                "ramen":
                {
                    "name": "라멘",
                    "restaurantName": "라멘 이이다쇼텐",
                },
                "udon":
                {
                    "name": "우동",
                    "restaurantName": "우동 마루카",
                },
                "dumpling":
                {
                    "name": "딤섬",
                    "restaurantName": "팀호완",
                },

                "sushi":
                {
                    "name": "초밥",
                    "restaurantName": "네무로 하나마루",
                },
                "afternoonTea":
                {
                    "name": "애프터눈 티",
                    "restaurantName": "페닌슐라 호텔 홍콩",
                },

                "hitsumabushi":
                {
                    "name": "장어덮밥",
                    "restaurantName": "토모에이",
                },
                "yakitori":
                {
                    "name": "야키토리",
                    "restaurantName": "토리시키",
                },
                "chiliCrab":
                {
                    "name": "칠리크랩",
                    "restaurantName": "언더브릿지 스파이시 크랩",
                },
                "mandarinGrill":
                {
                    "name": "퓨전 파인다이닝",
                    "restaurantName": "만다린 그릴",
                    "link": "https://www.mandarinoriental.com/en/hong-kong/victoria-harbour/dine/mandarin-grill-and-bar",
                },
                "more":
                {
                    "name": "그 이상",
                    "restaurantName": "",
                    "link": "",
                },
            },
            city: {
                jp:
                {
                    name: "일본 전역",
                    nation: "jp",
                    link: "https://www.japan.travel/ko/",
                    linkType: "travel-japan",
                    intro: "",
                    body: "",
                },
                tokyo:
                {
                    name: "도쿄",
                    nation: "jp",
                    link: "https://www.japan.travel/ko/destinations/kanto/tokyo/",
                    linkType: "travel-japan",
                    intro: "일본의 수도이자 세계에서 인구밀도가 가장 높은 대도시 도쿄는 전통과 혁신이 공존하며, 맛있는 음식과 쇼핑을 즐기고 탐방할 공간이 가득합니다.",
                    body: "\
                        도쿄는 일본의 가장 큰 섬인 혼슈의 간토 지방에 속하는 도쿄만에 위치합니다. \
                        가장 가까운 공항은 하네다 공항으로, 공식 명칭은 ‘도쿄 국제공항’입니다. \
                        그리고 일본 최대 규모의 국제공항인 나리타 공항 나리타 공히라주쿠 및 시부야 지역의 트렌디한 쇼핑가부터 긴자의 명품 플래그십 매장까지 그 종류도 무척 다양합니다. \
                        \n신주쿠는 활기 넘치는 업무 지구로서 환하게 불이 켜진 고층빌딩들, 그리고 작은 선술집들이 들어찬 독특한 분위기의 좁은 골목들이 뒤섞여 있습니다. \
                        아사쿠사는 도쿄 번화가 중에서도 중심에 해당하는 위치이며 옛 사원과 전통 상점들이 자리하고 있습니다. \
                        도쿄는 단일 도시로 세계에서 가장 많은 수의 ‘미슐랭 스타’ 레스토랑들이 있을 정도로 미식의 천국이라 할 수 있으며, 수백 곳에 달하는 맛있고 저렴한 라멘 전문점들이 있습니다. \
                        ",
                },
                osaka:
                {
                    name: "오사카",
                    nation: "jp",
                    link: "https://www.japan.travel/ko/destinations/kansai/osaka/",
                    linkType: "travel-japan",
                    intro: "맛있는 음식과 신나는 놀 거리, 밤놀이 문화 사이로 풍부한 역사와 문화가 살짝 엿보이는 매혹적이고 느긋한 도시 오사카",
                    body: "\
                        오사카는 도쿄에서 신칸센을 타면 금방 도착하지만, 수도인 도쿄와는 사뭇 다른 개성을 느낄 수 있습니다. \
                        고속열차에서 내리는 순간 흥겨운 밤놀이 문화와 맛있는 음식, 직설적이지만 친근한 주민을 만날 수 있는 새로운 세상이 펼쳐집니다. \
                        오사카에는 쇼핑 명소를 비롯한 현대 명물도 물론 많지만, 오랜 역사를 엿볼 수 있는 측면도 있습니다. 그중 가장 대표적인 예가 오사카성입니다. \
                        오사카성은 일본 역사에 대해 좀 더 심층적으로 알아볼 수 있는 배움의 현장으로서도 좋은 곳이지만, 특히 벚꽃이 피고 날씨도 연중 가장 온화한 4월 벚꽃 철이면 경내가 매우 아름다워 그냥 걸어서 둘러보기만 해도 좋습니다. \
                        ",
                },
                yokohama:
                {
                    name: "요코하마",
                    nation: "jp",
                    link: "https://www.japan.travel/ko/destinations/kanto/kanagawa/yokohama-and-around/",
                    linkType: "travel-japan",
                    intro: "세계를 향한 일본의 창",
                    body: "\
                            요코하마는 중국 문화와 서구 문화에 일본 고유의 전통이 조화를 이루어 생기가 넘치는 현대적인 도시입니다. \
                            일본의 보석인 이곳 요코하마와 인근 명소는 미식 투어에 관심이 있는 사람, 역사와 문화에 흠뻑 빠져보는 여행을 원하는 사람, 근사한 전망을 감상하고 싶은 사람 모두가 취향에 맞는 여행을 즐길 수 있는 곳입니다. \
                        ",
                },
                // 삿포로
                kyoto:
                {
                    name: "교토",
                    nation: "jp",
                    link: "https://www.japan.travel/ko/destinations/kansai/kyoto/",
                    linkType: "travel-japan",
                    intro: "일본의 고도로서 세련된 문화와 미식, 예쁜 시골 풍경 등 세계적으로 유명한 명물이 가득한 교토",
                    body: "\
                        교토시에는 매년 일본 전통문화 탐방을 위해 이곳을 찾는 내국인과 외국인 방문객이 수백만 명씩 몰립니다. \
                        기요미즈데라 사원 및 긴카쿠지와 같은 사찰과 신사도 방문객의 이목을 끄는 관광 명소이지만, 인근의 아라시야마 대나무숲도 인기가 많습니다. \
                        전통 료칸에서 묵으며 활력을 되살려주는 온천물에 몸을 담그고, 벚꽃이 피었다가 가을이면 울긋불긋 다채롭게 물들며 계절마다 바뀌는 경치도 감상하세요. \
                        도쿄에서 고속열차를 타면 금세 교토의 마법을 볼 수 있습니다. 시 경계를 벗어나면 교토부의 매력적인 시골 풍경을 곳곳에서 만나게 됩니다. \
                        북쪽으로는 일본의 3대 절경으로 오랫동안 명성을 이어온 아마노하시다테가 있습니다. \
                        산속에 아늑하게 자리 잡은 미야마는 초가지붕을 덮은 농가가 그대로 보전된 얼마 안 남은 마지막 마을인데, 여전히 실제 거처로 사용되고 있습니다. \
                        맛있는 현지산 채소는 물론 우지에서 재배한 명차도 맛보세요. \
                        ",
                },
                nara:
                {
                    name: "나라",
                    nation: "jp",
                    link: "https://www.japan.travel/ko/destinations/kansai/nara/",
                    linkType: "travel-japan",
                    intro: "신성한 산과 종교적으로 깊은 의미를 지닌 여러 명소, 초기 일본의 유물을 보유한 나라현",
                    body: "\
                        고대 일본의 정치종교적 중심부였던 나라는 오사카와 교토에서 교통이 편리하며, 일본에서 가장 오래된 것으로 손꼽히는 신사와 사찰이 많습니다. \
                        이러한 종교적인 건물의 경내에는 철마다 꽃을 피우는 정원이 잘 가꿔져 있어 주변 환경을 한층 아름답게 돋보이게 해줍니다. 나라 공원은 길들여진 사슴이 자유롭게 노니는 곳으로 유명합니다. \
                        인근의 도다이지 사원에는 세계에서 가장 큰 청동 불상이 있습니다. 세계문화유산으로 등재된 요시노산을 통과하는 순례길 코스가 있고, 봄이면 벚꽃이 만발하여 장관을 이룹니다. \
                        ",
                },
                kamakura:
                {
                    name: "가마쿠라",
                    nation: "jp",
                    link: "https://www.japan.travel/ko/destinations/kanto/kanagawa/kamakura-and-around/",
                    linkType: "travel-japan",
                    intro: "각종 명승지, 제철 화초와 단풍, 고대 수도에서 즐기는 식도락, 도쿄와 뛰어난 교통 접근성",
                    body: "\
                        도쿄에서 남쪽으로 한 시간도 채 걸리지 않는 거리에 가마쿠라가 있습니다. \
                        한때 일본 정치의 중심지였던 이곳은 사찰과 문학적 문화유산으로 유명하며, 해변과 하이킹 코스가 멋진 관광 명소이기도 합니다. \
                        ",
                },
                // 가와고에 가나자와
                shiretoko:
                {
                    name: "시레토코",
                    nation: "jp",
                    link: "https://www.japan.travel/ko/spot/2143/",
                    linkType: "travel-japan",
                    intro: "사람의 손을 타지 않은 호수, 움푹 파인 지형의 숲, 희귀한 새와 여러 야생 동물이 가득한 진정한 야생의 들판",
                    body: "\
                        홋카이도의 시레토코 반도는 일본에서 가장 티 없이 깨끗하고 사람의 손이 닿지 않은 순수한 천연의 아름다운 경치를 볼 수 있는 곳입니다. \
                        “뻔한 관광지가 아닌” 여행지로서 시레토코만한 곳은 없습니다. 자연이 주는 단순한 즐거움을 만끽할 수 있는 훌륭한 장소입니다. \
                        ",
                },
                yakushima:
                {
                    name: "야쿠시마",
                    nation: "jp",
                    link: "https://www.japan.travel/ko/destinations/kyushu/kagoshima/yakushima/",
                    linkType: "travel-japan",
                    intro: "유네스코 세계자연유산이자 1천 년 넘는 수령의 야쿠 삼나무, 청정한 바다, 일본 최고의 거북 산란지를 볼 수 있는 야쿠시마",
                    body: "\
                        야쿠시마는 일본의 전설이 깃든 섬입니다. 이 작은 섬은 일본에서 최초로 유네스코 세계유산으로 등재되었으며, 스튜디오 지브리의 애니메이션 “원령공주”에 영감을 주기도 했습니다. \
                        또한 일본에서 최고로 꼽히는 자연 경관도 볼 수 있는 곳입니다. \
                    ",
                },
                biei:
                {
                    name: "비에이",
                    nation: "jp",
                    link: "https://www.japan.travel/ko/spot/1890/",
                    linkType: "travel-japan",
                    intro: "유명한 호수 근처에서 밭과 꽃이 연출하는 조각보 같은 풍경",
                    body: "\
                        비에이정은 다이세쓰산 국립공원 도카치다케 산맥 아래, 홋카이도 중심지 가까이에 자리하고 있습니다. \
                        이곳은 다채로운 자연 경관으로 유명해 홋카이도 홍보용 영상에도 자주 등장합니다. \
                        그중에서도 가장 유명한 곳은 도시 남동쪽에 자리한 청의 호수입니다. \
                        선명한 파란색 물이 고요한 분위기를 자아내는 호수로 계절과 날씨에 따라 색조가 다양하게 바뀝니다. \
                    ",
                },
                takamatsu:
                {
                    name: "다카마쓰",
                    nation: "jp",
                    link: "https://www.japan.travel/ko/spot/1890/",
                    linkType: "travel-japan",
                    intro: "세토 내해의 관문 다카마쓰",
                    body: "\
                        가가와현  현청 소재지이자 활력 넘치는 항구 도시 다카마쓰는 시코쿠 북쪽에 자리 잡은 소도시로, \
                        세토 내해의 수많은 아름다운 섬으로 가는 관문 역할도 겸하고 있습니다. 지역 관광의 거점으로서 편리한 점도 크지만, \
                        도시 자체에도 충분히 좋은 명소들이 많습니다. \
                    ",
                },
                onomichi:
                {
                    name: "오노미치",
                    nation: "jp",
                    link: "https://www.japan.travel/ko/destinations/chugoku/hiroshima/onomichi-and-fukuyama/",
                    linkType: "travel-japan",
                    intro: "해변, 등산, 자전거, 가파른 절벽을 따라 펼쳐지는 아름다운 마을 풍경으로 유명한 곳",
                    body: "\
                        현재 오노미치시가 자리한 항구는 1168년 쌀 운반과 국제 무역이 이루어지는 유통 중심지로 처음 설립되었습니다. \
                        지금은 항구가 비교적 조용한 편이지만, 도시 문화의 중심지인 점은 여전합니다. \
                        매년 4월이 되면 오노미치 미나토 축제(항구 축제)가 열려 인파가 모여듭니다. \
                        사람들은 도시의 옛 역사를 기리며 다양한 음식으로 가득한 가판대, 행렬, 춤 경연 대회를 즐깁니다. \
                        오노미치는 가파른 언덕 위에 자리하며 굽이굽이 이어지는 돌계단이 많아 체력을 시험하는 듯한 느낌이 듭니다. \
                        또한 히로시마에서 가장 아름다운 풍경을 가진 마을이기도 합니다. \
                        멋진 장관을 선사하는 좁은 길과 여러 신사, 느긋하게 뒹구는 고양이들을 렌즈 속에 담아보세요. \
                        오노미치는 시코쿠 마을로 연결되는 60km 거리의 인기 자전거 도로 「시마나미 카이도」의 시작 지점입니다. \
                    ",
                },
                sapporo:
                {
                    name: "삿포로",
                    nation: "jp",
                    // link: "https://www.discoverhongkong.com/eng/index.html",
                    // linkType: "discovering-hongkong",
                    intro: "일본의 수도이자 세계에서 인구밀도가 가장 높은 대도시 도쿄는 전통과 혁신이 공존하며, 맛있는 음식과 쇼핑을 즐기고 탐방할 공간이 가득합니다.",
                    body: "\
                        도쿄는 일본의 가장 큰 섬인 혼슈의 간토 지방에 속하는 도쿄만에 위치합니다. \
                        가장 가까운 공항은 하네다 공항으로, 공식 명칭은 ‘도쿄 국제공항’입니다. \
                        그리고 일본 최대 규모의 국제공항인 나리타 공항 나리타 공히라주쿠 및 시부야 지역의 트렌디한 쇼핑가부터 긴자의 명품 플래그십 매장까지 그 종류도 무척 다양합니다. \
                        \n신주쿠는 활기 넘치는 업무 지구로서 환하게 불이 켜진 고층빌딩들, 그리고 작은 선술집들이 들어찬 독특한 분위기의 좁은 골목들이 뒤섞여 있습니다. \
                        아사쿠사는 도쿄 번화가 중에서도 중심에 해당하는 위치이며 옛 사원과 전통 상점들이 자리하고 있습니다. \
                        도쿄는 단일 도시로 세계에서 가장 많은 수의 ‘미슐랭 스타’ 레스토랑들이 있을 정도로 미식의 천국이라 할 수 있으며, 수백 곳에 달하는 맛있고 저렴한 라멘 전문점들이 있습니다. \
                    ",
                },
                hongkong:
                {
                    name: "홍콩",
                    nation: "hk",
                    link: "https://www.discoverhongkong.com/kr/explore/neighbourhoods/old-town-central.html",
                    linkType: "discovering-hongkong",
                    intro: "세계가 만나는 곳",
                    body: "\
                        홍콩은 화려한 고층 건물과 세계적인 수준의 명소들로 잘 알려져 있지만, 오늘날 홍콩이라는 도시가 어떻게 이 같은 대도시로 부상하게 된지 이해하려면 올드 타운 센트럴을 방문하면 됩니다. \
                        올드 타운 센트럴은 홍콩에서도 가장 오래되고 다이내믹한 지역 중 하나로 센트럴과 셩완 사이의 경사가 높은 길과 구석구석 좁은 골목들로 이뤄졌습니다. \
                        홍콩의 풍부하고 다양한 역사가 응축된 곳입니다. 100년 이상의 역사를 가진 사원이 패션의 유행을 선도하는 콘셉트 스토어들과 같은 거리에 자리하며 전통 티 하우스와 현대적인 아트 갤러리가 공존합니다. \
                        지극히 홍콩을 상징하면서 세계적인 감성의 다채로운 매력을 가진 지역입니다. \
                        다양한 명소로 가득하면서도 도보로 볼거리를 즐길 수 있어 도보여행에 완벽한 곳입니다. \
                        역사적인 의미를 담은 건물과 예술 기관, 로컬 음식, 기념품 등 수많은 즐길거리가 있습니다. \
                        여러분이 흥미를 느낄만한 것이 무엇이든, 이 가이드는 올드 타운 센트럴이 가진 최고의 것들로 여러분을 안내할 예정입니다. \
                        올드 타운 센트럴 탐험을 즐겨보세요! \
                    ",
                },
            },
        },
        "emojis": {
            great: "😍",
            good: "😃",
            soso: "🤔",
            bad: "😤",
            troll: "😡",
        },
        "nations": {
            "jp": "일본",
            "hk": "홍콩",
            "KR": "한국",
            "SEA": "동남아시아",
        },
        "linkType": {
            "travel-japan": {
                name: "Travel Japan",
            },
            "tabelog": {
                name: "타베로그",
            },
            "tripadvisor": {
                name: "Tripadvisor",
            },
            "website": {
                name: "웹사이트",
            },
            "discovering-hongkong": {
                name: "홍콩관광청",
            },
        },
        "topNav": {
            "home": "여행 타입 테스트",
            "test": "테스트",
            "result": "내 결과",
            "chemistry": "케미 보기",
        },
        tripTag: {
            [TripTag.DEFAULT]: "여행자",
            [TripTag.PHOTO]: "사진사",
            [TripTag.EAT]: "미식가",
            [TripTag.FRIENDSHIP]: "우정의 수호자",
            [TripTag.PHYSICAL]: "액티비티",
            [TripTag.REST]: "휴식이 필요해",
            [TripTag.INFLUENCER]: "인플루언서",
            [TripTag.COFFEE]: "카페 탐방",
            [TripTag.CULTURE]: "문화 생활",
            [TripTag.ADVENTURE]: "모험가",
            [TripTag.PASSION]: "열정적",
            [TripTag.REFRESH]: "재충전",
        },
        "test": {
            activity: {
                title: "액티비티",
                hashtag: {
                    [ActivityTag.PHOTO]: "사진",
                    [ActivityTag.INSTA]: "인스타그램",
                    [ActivityTag.NETWORK]: "새 친구 사귀기",
                    [ActivityTag.EXTREME]: "익스트림 액티비티",
                    [ActivityTag.SWIM]: "물놀이",
                    [ActivityTag.DRIVE]: "드라이브",
                    [ActivityTag.WALK]: "산책",
                    [ActivityTag.THEMEPARK]: "테마파크",
                    [ActivityTag.MARKET]: "시장 구경",
                    [ActivityTag.HOTEL]: "호캉스",
                    [ActivityTag.VLOG]: "브이로그",
                    [ActivityTag.WAITING]: "맛집 웨이팅",
                    [ActivityTag.BAR]: "근사한 바에서 술",
                    [ActivityTag.CAFE]: "카페 탐방",
                    [ActivityTag.SHOPPING]: "쇼핑",
                    [ActivityTag.SHOW]: "공연",
                    [ActivityTag.MUESEUM]: "미술관",
                }
            },
            expectation: {
                title: "제네럴",
                hashtag: {
                    [ExpectationTag.HEAL]: "치유되는",
                    [ExpectationTag.COMPACT]: "알찬",
                    [ExpectationTag.FULLFILL]: "보람있는",
                    [ExpectationTag.MEMORY]: "추억",
                    [ExpectationTag.RELAX]: "여유로운",
                    [ExpectationTag.COMFORT]: "편안한",
                    [ExpectationTag.ADVENTURE]: "모험",
                    [ExpectationTag.NEW]: "새로운 경험",
                    [ExpectationTag.DIGITAL_DETOX]: "디지털 디톡스",
                    [ExpectationTag.REST]: "휴식",
                    [ExpectationTag.VIEW]: "풍경",
                    [ExpectationTag.FRIENDSHIP]: "우정",
                }
            },
        },
        "contents": {
            "home": {
                "label": "소개",
                "appTitle": "여행 타입 테스트",
                "startButton": "테스트 시작하기",
            },
            "test": {
                "label": "테스트",
                "main": {
                    "navigatePrev": "이전 질문",
                    "navigateNext": "다음 질문",
                    "confirmButton": "결과 확인하러 가기",
                    tooltip_completeTest: "아직 답변하지 않은 질문이 있어요.",
                    sections: {
                        leadership:
                        {
                            title: "여행 계획은 누가 리드해?",
                            subtitle: "리더",
                            label: "리더",
                            icon: "groups",
                        },
                        schedule:
                        {
                            title: "일정은 얼마나 알차면 좋을까?",
                            subtitle: "일정",
                            label: "널널함",
                            icon: "edit_calendar",
                        },
                        budgetFood:
                        {
                            title: "한끼에 얼마나 쓰면 좋을까?",
                            subtitle: "예산 - 한끼 식사",
                            label: "한끼 식사",
                            icon: "dailyRestaurantBudget",
                        },
                        cityMetropolis:
                        {
                            title: "이런 곳은 어때?",
                            subtitle: "여행지",
                            label: "현대적인 대도시",
                            icon: "domain",
                        },
                        cityHistory:
                        {
                            title: "이런 곳은 어때?",
                            subtitle: "여행지",
                            label: "유서 깊은 대도시",
                            icon: "temple_buddhist",
                        },
                        cityNature:
                        {
                            title: "이런 곳은 어때?",
                            subtitle: "여행지",
                            label: "아름다운 자연경관",
                            icon: "forest",
                        },
                        confirm:
                        {
                            title: "다시 답변하고 싶은 질문은 없는지 확인해봐!",
                            subtitle: "결과 확인",
                            label: "결과 확인",
                            icon: "check",
                        }
                    }
                },
                "test": {
                    "leadership": {
                        title: "일행과 여행을 준비할 때의 나는?",
                        instruction: "답변을 눌러서 선택해봐!",
                        "options": {
                            1:
                            {
                                value: 1,
                                display: "icon",
                                icon: "1",
                                label: "잘 따르는 팀원",
                            },
                            2:
                            {
                                value: 2,
                                display: "icon",
                                icon: "2",
                                label: "적극적인 팀원",
                            },
                            3:
                            {
                                value: 3,
                                display: "icon",
                                icon: "3",
                                label: "적극적인 리더",
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
                                display: "icon",
                                icon: "1",
                                label: "아주 널널하게",
                                "prefix": "아주 널널한게 좋은"
                            },
                            2:
                            {
                                value: 2,
                                display: "icon",
                                icon: "2",
                                label: "널널하게",
                                "prefix": "널널한게 좋은"
                            },
                            3:
                            {
                                value: 3,
                                display: "icon",
                                icon: "3",
                                label: "아무래도 상관없어",
                                "prefix": "아무래도 상관 없는"
                            },
                            4:
                            {
                                value: 4,
                                display: "icon",
                                icon: "4",
                                label: "알차게",
                                "prefix": "알찬게 좋은"
                            },
                            5:
                            {
                                value: 5,
                                display: "icon",
                                icon: "5",
                                label: "매우 알차게",
                                "prefix": "매우 알찬게 좋은"
                            }
                        },
                    },
                    "budget": {
                        title: "예산은 얼마나 쓰면 좋을까?",
                        subtitle: "예산",
                        "instruction": "슬라이더를 움직여보세요.",
                        "linkText": "에서 보기",
                    },
                    "city": {
                        title: "이런 곳은 어때?",
                        titleTextList: [
                            "/testKey",
                            " 여행은 어때?"
                        ],
                        subtitle: "여행지",
                        "instruction": "",
                        "linkText": "에서 보기",
                        "sliderProps": {
                            "step": 1,
                            "min": 0,
                            "max": 4
                        },
                        "answers": {
                            1:
                            {
                                value: 1,
                                display: "icon",
                                icon: "😡",
                                label: "싫어!",
                                "emoji": "😡",
                            },
                            2:
                            {
                                value: 2,
                                display: "icon",
                                icon: "😤",
                                label: "별로야..",
                                "emoji": "😤",
                            },
                            3:
                            {
                                value: 3,
                                display: "icon",
                                icon: "🤔",
                                label: "상관없어",
                                "emoji": "🤔",
                            },
                            4:
                            {
                                value: 4,
                                display: "icon",
                                icon: "😃",
                                label: "좋아",
                                "emoji": "😃",
                            },
                            5:
                            {
                                value: 5,
                                display: "icon",
                                icon: "😍",
                                label: "완전 내 취향!",
                                "emoji": "😍",
                            },
                        },
                    },
                    "hashtag": {
                        instruction: "태그를 두 개 이상 선택해주세요.",
                        selectWarningStringList: [
                            "",
                            "개 이상 선택해주세요.",
                        ]
                    },
                    "activity": {
                        title: "이런 활동은 어때?",
                        subtitle: "즐기기",
                        instruction: "",
                        "answers": {
                            1:
                            {
                                label: "-2",
                                "value": 0,
                                "quote": "싫어!",
                                "emoji": "😡",
                            },
                            2:
                            {
                                label: "-1",
                                "value": 1,
                                "quote": "별로야..",
                                "emoji": "😤",
                            },
                            3:
                            {
                                label: "0",
                                "value": 2,
                                "quote": "상관없어",
                                "emoji": "🤔",
                            },
                            4:
                            {
                                label: "1",
                                "value": 3,
                                "quote": "좋아",
                                "emoji": "😃",
                            },
                            5:
                            {
                                label: "2",
                                "value": 4,
                                "quote": "완전 내 취향!",
                                "emoji": "😍",
                            },
                        },
                    },
                },
                "subTest": {
                    "expectation": {
                        label: "이런 여행을 하고싶어",
                        title: "# 이런 여행을 하고 싶어",
                        particle: "",
                    },
                    "activity": {
                        label: "액티비티",
                        title: "# 여행지에서 해보고 싶은 것",
                        particle: "",
                    },
                    "leadership": {
                        icon: "groups",
                        label: "리더",
                        title: "리더",
                        particle: "",
                        options: {
                            1: {
                                title: "다른 사람이 리드해주기",
                                "detail": "여행 계획은 어떻든 다 좋으니 누군가가 리드해주면 좋겠어",

                            },
                            2: {
                                title: "다같이 준비하기",
                                "detail": "여행 준비하는 데에 매우 적극적일 거지만 리더는 부담스러워",

                            },
                            3: {
                                title: "내가 리드하기",
                                "detail": "여행을 많이 다녀봤고 계획짜는 걸 좋아하는 내가 리드하고 싶어",
                            },
                        },
                    },
                    "schedule": {
                        icon: "edit_calendar",
                        label: "일정",
                        title: "일정",
                        particle: "",
                        // "credit": "재하(https://blog.naver.com/jcjw1234)님의 여행 계획",
                        "exampleTitlePrefix": "여행자의",
                        "exampleTitle": [
                            "후쿠오카",
                            "/flag",
                            "여행 지도",
                        ],
                        "startPosition": {
                            lat: 33.596306,
                            lng: 130.4293798,
                        },
                        "examples": [
                            [
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
                                        lat: 33.5897904,
                                        lng: 130.3504891,
                                    },
                                    label: '후쿠오카시\n박물관',
                                    icon: 'museum',
                                },
                            ],
                            [
                                {
                                    position: {
                                        lat: 33.5838392,
                                        lng: 130.4539866,
                                    },
                                    label: '덴푸라 히라오\n본점',
                                    icon: 'restaurant',
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
                            [
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
                                        lat: 33.5934691,
                                        lng: 130.3465043,
                                    },
                                    label: '모모치해변',
                                    icon: 'beach_access',
                                },
                            ],
                            [
                                {
                                    position: {
                                        lat: 33.5932449,
                                        lng: 130.4020225,
                                    },
                                    label: '이치란\n본점',
                                    icon: 'restaurant',
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
                            [
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
                                        lat: 33.6133009,
                                        lng: 130.4307441,
                                    },
                                    label: '하쿠하쿠',
                                    icon: 'museum',
                                },
                            ]
                        ]
                    },
                    "restaurant": {
                        label: "맛집 탐방",
                        icon: "restaurant",
                        title: "한끼 식사에는 평균적으로 얼마나 쓸까?",
                        particle: "",
                        note: "(평균 예산)",
                        subtitle: "예산 - 식사",
                        "examples": {
                            5000: [
                                "kyudong",
                                "wantang",
                                "churos",
                            ],
                            15000: [
                                "ramen",
                                "udon",
                                "dumpling",
                            ],
                            25000: [
                                "sushi",
                                "afternoon-tea",
                            ],
                            50000: [
                                "hitsumabushi",
                                "yakitori",
                                "chili-crab",
                            ],
                            75000: [
                                "mandarin-grill",
                            ],
                        },
                        "carouselTitleDefault": "선택한 가격대에서 즐길 수 있는\n전세계의 곳곳의 식당들을\n여기에 보여줄게",
                        "carouselTitle": "대에서 즐길 수 있는 전세계의 식당들",
                        "budgetLowerBounds": [
                            5000,
                            15000,
                            25000,
                            50000,
                        ],
                        "sliderProps": {
                            "step": 5000,
                            "min": 5000,
                            "max": 70000
                        },
                    },
                    // "accomodateSpecial": {
                    //     title: "하룻밤 묵는데 얼마나 쓰면 좋을까?",
                    //     subtitle: "예산 - 숙소",
                    //     "linkType": "Hotels.com에서 보기",
                    //     "examples": {
                    //         20000: [
                    //             {
                    //                 "id": "iida-shouten-ramen",
                    //                 "name": "게로온센 스이메이칸",
                    //                 "city": "일본 중부",
                    //                 "room": "룸이름",
                    //                 "price": 200000,
                    //                 "priceText": "20만원~ (1인)",
                    //                 "nation": "jp",
                    //                 "link": "https://www.suimeikan.co.jp/ko/",
                    //             },
                    //         ],
                    //         60000: [
                    //             {
                    //                 "id": "tomoei",
                    //                 "name": "오타루 긴린소",
                    //                 "city": "훗카이도",
                    //                 "room": "룸이름",
                    //                 "price": 300000,
                    //                 "priceText": "60만원~ (2인)",
                    //                 "nation": "jp",
                    //                 "link": "https://www.ginrinsou.com/ko/"
                    //             },
                    //         ],
                    //     },
                    // },
                    "metropolis": {
                        label: "현대적인 대도시",
                        title: "현대적인 대도시",
                        particle: "는",
                        "id": "metropolis",
                        "examples": [
                            "tokyo",
                            "osaka",
                            "yokohama",
                            "hongkong",
                        ]
                        // 삿포로
                    },
                    "history": {
                        label: "유서 깊은 도시",
                        title: "유서 깊은 도시",
                        particle: "는",
                        "id": "history",
                        "examples": [
                            "kyoto",
                            "nara",
                            "kamakura",
                        ]
                        // 가와고에 가나자와
                    },
                    "nature": {
                        label: "아름다운 자연경관",
                        title: "자연경관이 아름다운 곳",
                        particle: "이 있는 곳은",
                        "examples": [
                            "shiretoko",
                            "yakushima",
                            "biei",
                        ]
                    },
                    // {
                    //     title: "한적한 시골마을",
                    //     label: "country" 
                    // },
                },
                // "confirm": {
                //     icon: "check",
                //     label: "결과 확인",
                //     title: "다시 답변하고 싶은 질문은 없는지 확인해봐!",
                //     goToAanswer: "답변하러 가기",
                //     editAnswer: "다시 답변하기",
                //     "confirmButton": "결과 확인하러 가기",
                //     tooltips: {
                //         completeTest: "아직 답변하지 않은 질문이 있어요.",
                //     },
                // }
            },
            "result": {
                "label": "내 여행 타입",
                "navigateToChemistryButton": "친구들과 여행 타입 비교하기",
                "sections": {
                    "character":
                    {
                        title: "내 여행 타입",
                        icon: "pets",
                        typeIntro: "내 여행 MBTI는",
                    },
                    "city":
                    {
                        title: "추천\n여행지",
                        icon: "travel_explore",
                        citySuffix: "당신을 위한 여행지",
                        // "cityListTitle": "아름다운 자연경관, 산책과 하이킹 명소",
                        cityListIntro: "추천 여행지",
                        nationFilterTitle: "지역",
                        unsupportedNationTooltip: "이 지역의 도시들은 추가될 예정이에요.",
                    },
                    "chemistry":
                    {
                        title: "여행 케미\n확인하러 가기",
                        icon: "flight",
                        startChemistryIntro: "이제 친구랑 같이 떠나볼까?",
                        startChemistryTitle: "여행 케미 확인하러 가기",
                        navigateToChemistryButton: "여행 케미 확인하기",
                    },
                },
            },
            "chemistry": {
                "label": "내 여행 목록",
                "addFriend": {
                    label: "친구 추가",
                    icon: "group_add",
                    me: "Me",
                    // addByName: "친구 추가",
                    searchFormPlaceholder: "찾으려는 닉네임과 태그를 입력해주세요 (ex. 꿀벌#12)",
                    giveMyName: "내 닉네임",
                    userApiMissMessage: "친구를 찾지 못했어요.\nID를 다시 확인해주세요.",
                    userApiFailMessage: "현재 서버에 접속할 수 없어요.\n잠시 후 다시 시도해주세요.",
                    add: "친구 추가",
                    confirm: "확인",
                    pending: "...",
                    startChemistryButton: "케미 확인하기",
                    chemistryUpdated: "결과가 준비되었어. 스크롤을 내려 확인해봐!",
                },
                "sections": {
                    "addFriend": {
                        confirm: "확인",
                        addFriendButton: "친구 추가하기",
                        startChemistryButton: "케미 확인하기",
                        scrollDownButton: "스크롤을 내려 결과 확인하기",
                        chemistryUpdated: "결과가 준비되었어. 스크롤을 내려 확인해봐!",
                        tooltips: {
                            addAtLeastOneFriend: "친구를 한 명 이상 추가해주세요.",
                            chemistryFail: "문제가 발생했어요.\n잠시 후 다시 시도해주세요.",
                            startChemistry: "친구를 모두 추가한 후에\n\"케미 확인하기\" 버튼을 클릭하세요.",
                        },
                    },
                    "character": {
                        label: "여행 타입",
                        icon: "pets",
                        title: "여행 타입 확인하기",
                        subtitle: "일행의 여행 MBTI를 통해 서로가 원하는 여행 스타일을 이해해봐요",
                        "howTo": "카드를 클릭해봐!",
                    },
                    "leadership": {
                        label: "리더",
                        icon: "groups",
                        title: "이번 여행의 대장님은 누구?",
                        "leaderTitle": "듬직한 대장",
                        "idPostfix": "님",
                        "and": ",",
                        "body": [
                            "리더",
                            "/idList",
                            "이 여행 계획과 준비를 주도적으로 이끌어 주면 좋을 것 같아요.",
                        ],
                        "detail": [
                            "/idList",
                            "은 계획을 리드할 부담은 갖지 않아도 좋아요. 대신 여행에서 어떤 걸 하고 싶은지, 어떤 건 마음에 들지 않는지 적극적으로 이야기해주세요. 리더를 도와 멋진 여행 계획을 함께 준비해봐요.",
                        ],
                    },
                    "schedule": {
                        label: "일정",
                        icon: "edit_calendar",
                        title: "일정은 얼마나 알차게 짤까?",
                    },
                    "budget": {
                        label: "예산",
                        icon: "attach_money",
                        title: "예산을 세워보자"
                    },
                    "city": {
                        label: "여행지",
                        icon: "travel_explore",
                        title: "함께 어디로 떠나볼까"
                    },
                }
            }
        },
        "assets": {
            "home": {

            },
            "testUser": {

            },
            "result": {

            },
            "chemistry": {

            }

        }
    }
};

type StringTable = typeof stringTable_kr;

export default stringTable_kr;
export type { StringTable };
