import { Container, Slider, SliderOwnProps } from "@mui/material";
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
            <Container className="gutter-xl column-padding">
                <Slider
                    size="small"
                    valueLabelDisplay="on"
                    valueLabelFormat={(value, index) =>
                    (
                        (answer !== undefined) && (answer > 0)
                            ?
                            `${answer / 10000}만원${(answer === sliderOwnProps.max) ? ' 이상' : ''}`
                            : "?"
                    )}
                    getAriaValueText={priceText}
                    value={answer || (sliderOwnProps.max + sliderOwnProps.min) / 2}
                    onChange={handleAnswerChange}
                    marks
                    track={false}
                    disabled={disabled}
                    {...sliderOwnProps}
                />
            </Container>
        </div>
    );
}


export default withTestAnswer(AnswerSlider);