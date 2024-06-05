import { Slider, SliderOwnProps } from "@mui/material";
import withTestAnswer, { WithTestAnswerProps } from "../../../hocs/withTestAnswer";
import { priceText } from "../../../utils/priceText";

interface AnswerSliderProps extends WithTestAnswerProps, SliderOwnProps {
    // onChange: ( newValue : number ) => void;
};

function AnswerSlider({ testName, answer, setAnswer, ...sliderOwnProps }: AnswerSliderProps) {

    // const strings = useStrings().public.contents.test;   

    const handleAnswerChange = (
        event: Event,
        newValue: number | number[],
    ) => {
        setAnswer(newValue as number);
    }

    return (
        <div className="block--with-padding-x">
            {
                answer !== undefined
                    ? <p className='typography-test-answer'>
                        {answer/1000},000원{(answer === sliderOwnProps.max) ? ' 이상' : ''}
                    </p>
                    : <p className='typography-test-answer'>?</p>
            }
            <Slider
                size="small"
                valueLabelDisplay="off"
                getAriaValueText={priceText}
                value={answer || (sliderOwnProps.max + sliderOwnProps.min) / 2}
                onChange={handleAnswerChange}
                marks
                track={false}
                {...sliderOwnProps}
            />
        </div>
    );
}


export default withTestAnswer(AnswerSlider);