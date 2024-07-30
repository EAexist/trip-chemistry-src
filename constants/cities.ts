import { ActivityTag } from "../interfaces/enums/ActivityTag";
import { CityTag } from "../interfaces/enums/CityTag";

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
