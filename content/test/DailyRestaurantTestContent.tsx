/* React */

/* Externals */
import { SliderProps } from "@mui/material";
import { useSelector } from "react-redux";

/* Swiper */
import 'swiper/css';
import 'swiper/css/effect-coverflow'; /* Food Carousel */

/* App */
import { RootState } from "../../store";
import { priceText } from "../../utils/priceText";
import AnswerSlider from "./component/AnswerSlider";

function DailyRestaurantTestContent() {

    const step = 2000
    const min = 4000
    const max = 24000

    const dailyFoodBudgetSliderProps: SliderProps = {
        step,
        min,
        max,
        "aria-label": "daily restaurant budget",
        marks: [
            {
                value: 10000,
                label: "만원"
            },
            {
                value: 20000,
                label: "2만원"
            },
        ]
    };

    /* Reducers */
    const dailyRestaurantBudgetAnswer = useSelector((state: RootState) => state.testAnswer.data.dailyRestaurantBudget) as number;

    return (
        <>
            <div className="block block__body">
                <h2 className="test__title__heading typography-heading">여행 중 평범한 식사 한끼</h2>
                <h3 className="typography-body">평균적으로 얼마나 쓸까?</h3>
                <AnswerSlider
                    testName="dailyRestaurantBudget"
                    {...dailyFoodBudgetSliderProps}
                />
                <div />
            </div>
        </>
    );
}
export default DailyRestaurantTestContent