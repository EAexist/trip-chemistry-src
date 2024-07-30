/* App */
import { specialRestaurantBudgetSliderProps } from "../../constants/specialRestaurantBudgetSliderProps";
import AnswerSlider from "./component/AnswerSlider";

function RestaurantBudgetTestContent() {

    return (
        <div className="content">
            {/* <h2 className="test__title__heading section-title">여행 중 평범한 식사 한끼</h2> */}
            {/* <h3> 여행 중 평범한 식사 한끼에는 평균적으로 얼마나 쓸까? </h3> */}
            <AnswerSlider
                testKey="restaurant"
                subKey="specialBudget"
                {...specialRestaurantBudgetSliderProps}
            />
        </div>
    );
}
export default RestaurantBudgetTestContent