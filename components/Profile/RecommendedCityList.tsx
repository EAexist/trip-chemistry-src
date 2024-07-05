
import { CITIES } from "~/common/app-const";
import { WithProfileProps } from "~/hocs/withUserProfile";
import CityList, { CityListProps } from "./CityList";

interface RecommendedCityListProps extends WithProfileProps, Omit<CityListProps, "cities"> {
};

function RecommendedCityList({ testAnswer, ...props }: RecommendedCityListProps) {

    // const recommendedCities = useAppSelector(
    //     createSelector(
    //         state => state.chemistry.data.profiles[id].testAnswer.hashtag,
    //         ({ activity, city }: { activity: IActivityTag[], city: ICityTag[] }) =>
    //             Object.fromEntries(
    //             Object.entries(CITIES)
    //                 .map(([id, { cityTags, activityTags }]) => {
    //                     console.log(`[recommendedCities] activityTags=${activityTags} activity=${JSON.stringify(activity)} `)
    //                     const score = 2.5 + 0.5 * (city.filter(x => cityTags.includes(x)).length + activity.filter(x => activityTags.includes(x)).length)
    //                     return (
    //                         [ id,
    //                             {
    //                                 score: (score > 5) ? 5 : score
    //                             }
    //                         ]
    //                     )
    //                 }).filter(([k, v]) => (v as { score: number }).score > 3.5).sort(([k1, v1], [k2, v2]) => ((v2 as { score: number }).score - (v1 as { score: number }).score))
    //             )
    //     )
    // )

    const recommendedCities = Object.fromEntries(
            Object.entries(CITIES)
                .map(([id, { cityTags, activityTags }]) => {
                    console.log(`[RecommendedCityList] cityTags=${cityTags} city=${JSON.stringify(testAnswer.hashtag.city)} `)
                    const score = 2.5 + 0.5 * (testAnswer.hashtag.city.filter(x => cityTags.includes(x)).length + testAnswer.hashtag.activity.filter(x => activityTags.includes(x)).length)
                    return (
                        [id,
                            {
                                score: (score > 5) ? 5 : score
                            }
                        ]
                    )
                })
                .sort(([k1, v1], [k2, v2]) => ((v2 as { score: number }).score - (v1 as { score: number }).score))
                .filter(([k, v]) => (v as { score: number }).score > 2.5)
                .slice(0, 5)
        )

    return (
        <CityList cities={recommendedCities} {...props as Partial<CityListProps>} />
    );
}

export default RecommendedCityList;
