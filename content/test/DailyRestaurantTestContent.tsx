/* React */

/* Externals */
import { SliderProps } from "@mui/material";

/* Swiper */
import 'swiper/css';
import 'swiper/css/effect-coverflow'; /* Food Carousel */

/* App */
import AnswerSlider from "./component/AnswerSlider";

const step = 4000
const min = 4000
const max = 24000

export const dailyRestaurantSliderProps: SliderProps = {
    step,
    min,
    max,
    getAriaLabel: (index: number) => "daily restaurant budget",
    marks: [
        {
            value: 4000,
            label: 4000
        },
        {
            value: 8000,
        },
        {
            value: 12000,
            label: 12000
        },
        {
            value: 16000,
        },
        {
            value: 20000,
            label: 20000
        },
        {
            value: 24000,
        },
    ]
};

function DailyRestaurantTestContent() {


    return (
        <div className="content">
            {/* <h2 className="test__title__heading section-title">여행 중 평범한 식사 한끼</h2> */}
            {/* <h3> 여행 중 평범한 식사 한끼에는 평균적으로 얼마나 쓸까? </h3> */}
            <AnswerSlider
                testKey="restaurant"
                subKey="dailyBudget"
                {...dailyRestaurantSliderProps}
            />
        </div>
    );
}
export default DailyRestaurantTestContent