/* React */

/* Externals */
import { SliderProps } from "@mui/material";

/* Swiper */
import 'swiper/css';
import 'swiper/css/effect-coverflow'; /* Food Carousel */

/* App */
import AnswerSlider from "./component/AnswerSlider";

export const specialFoodBudgetSliderProps: SliderProps = {
    step: 20000,
    min: 20000,
    max: 120000,
    "aria-label": "special restaurant budget",
    marks: [
        {
            value: 20000,
            label: "2만원"
        },
        {
            value: 40000,
        },
        {
            value: 60000,
            label: "6만원"
        },
        {
            value: 80000,
        },
        {
            value: 100000,
            label: "10만원"
        },
        {
            value: 120000,
        },
    ]
};


function RestaurantBudgetTestContent() {

    return (
        <div className="content">
            {/* <h2 className="test__title__heading section-title">여행 중 평범한 식사 한끼</h2> */}
            {/* <h3> 여행 중 평범한 식사 한끼에는 평균적으로 얼마나 쓸까? </h3> */}
            <AnswerSlider
                testKey="restaurant"
                subKey="specialBudget"
                {...specialFoodBudgetSliderProps}
            />
        </div>
    );
}
export default RestaurantBudgetTestContent