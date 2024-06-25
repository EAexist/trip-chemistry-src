import { Slider, SliderOwnProps } from "@mui/material";
import withTestAnswer, { WithTestAnswerProps } from "../../../hocs/withTestAnswer";
import { priceText } from "../../../utils/priceText";

interface AnswerSliderProps extends WithTestAnswerProps, SliderOwnProps {
    // onChange: ( newValue : number ) => void;
};

function AnswerSlider({ testKey, answer, setAnswer, disabled, ...sliderOwnProps }: AnswerSliderProps) {

    // const strings = useStrings().public.contents.test;   

    const handleAnswerChange = (
        event: Event,
        newValue: number | number[],
    ) => {
        setAnswer(newValue as number);
    }

    return (
        <div className={`testcontent-swiper-no-swiping ${disabled && "disabled"}`}>
            <p className='typography-test-answer'>
                {
                    (answer !== undefined) && (answer > 0 )
                        ?
                            `${answer / 1000},000원${(answer === sliderOwnProps.max) ? ' 이상' : ''}`
                        : "?"
                }
            </p>
            <div style={{ padding: "1rem 16px" }}>
                <Slider
                    size="small"
                    valueLabelDisplay="off"
                    getAriaValueText={priceText}
                    value={answer || (sliderOwnProps.max + sliderOwnProps.min) / 2}
                    onChange={handleAnswerChange}
                    marks
                    track={false}
                    disabled={disabled}
                    {...sliderOwnProps}
                />
            </div>
        </div>
    );
}


export default withTestAnswer(AnswerSlider);