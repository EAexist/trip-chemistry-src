import { Slider, SliderOwnProps } from "@mui/material";
import withTestAnswer, { WithTestAnswerProps } from "../../../hocs/withTestAnswer";
import { priceText } from "../../../utils/priceText";

interface AnswerSliderProps extends WithTestAnswerProps, SliderOwnProps {
    // onChange: ( newValue : number ) => void;
};

function AnswerSlider( { testName, answer, setAnswer, ...sliderOwnProps } : AnswerSliderProps ){

    // const strings = useStrings().public.contents.test;   

    const handleAnswerChange = (     
        event: Event,
        newValue: number | number[], 
    ) => {
        setAnswer( newValue as number );
        // onChange( newValue as number );
    }

    return(
        <Slider
            size="small"
            aria-label="budget"
            valueLabelDisplay="auto"
            getAriaValueText={priceText}
            value={ answer }
            onChange={ handleAnswerChange }
            marks
            {...sliderOwnProps}
        />
    );
}


export default withTestAnswer( AnswerSlider );