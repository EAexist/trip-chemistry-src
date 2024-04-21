import { Slider, SliderOwnProps, Stack } from "@mui/material";

import useValueToProfileIdList from "../../../hooks/useValueToProfileIdList";
import useProfileIdListByAnswer from "../../../hooks/useProfileIdListByAnswer";
import FriendAvatar from "../../../components/Avatar/FriendAvatar";
import { ITestName } from "../../../interfaces/ITestAnswer";

interface ChemistrySliderProps extends SliderOwnProps {
    testName: ITestName
    min: number
    max: number
    step: number
};

const SliderValueLabel = ({ testName, value }: { testName: ITestName, value: number }) => {

    const { userList } = useProfileIdListByAnswer(testName, value);

    return (
        userList.length > 0
            ? <Stack className="Slider__value" >
                <h2 className="typography-label">{value}</h2>
                <Stack spacing={0.5}>
                    {
                        userList.map((id) => (
                            <FriendAvatar key={id} id={id} />
                        ))
                    }
                </Stack>
            </Stack>
            : <div className="Slider__value" />
    );
}

function ChemistrySlider({ testName, ...sliderOwnProps }: ChemistrySliderProps) {

    const budgetAnswerToProfiles = useValueToProfileIdList(testName);

    const marks = Array.from(
        { length: (sliderOwnProps.max - sliderOwnProps.min) / sliderOwnProps.step + 1 },
        (value, index) => sliderOwnProps.max - index * sliderOwnProps.step
    )

    return (
        <Stack alignItems={'stretch'}>
            <Stack alignItems={'stretch'} className="Slider">
                {/* <div className="flex" >
                    {
                        marks.slice(0, marks.length-1).map((value) => (
                            <h6 className="typography-marks block--centered" 
                                style={{ 
                                    flexGrow: 1, 
                                    transform: "translateY(-50%)", 
                                    visibility: (
                                            (value % 10000 === 0) 
                                            // && !Object.keys(budgetAnswerToProfiles).includes(value.toString())
                                        )
                                        ? 'visible' : 'hidden' 
                                }}>
                                {(value)}
                            </h6>))
                    }
                </div> */}
                <Slider
                    sx={{
                        // '& input[type="range"]': {
                        //     WebkitAppearance: 'slider-vertical',
                        // },
                        height: 300,
                        zIndex: 1,
                    }}
                    getAriaLabel={()=>(`friends' restaurant budget preference`)}
                    orientation="vertical"
                    size="small"
                    value={Object.keys(budgetAnswerToProfiles).map((answer) => Number(answer))}
                    marks
                    {...sliderOwnProps}
                />
            </Stack>
            <div className="flex">
                {
                    marks.map((value) => (
                        <SliderValueLabel key={value} testName={testName} value={value} />
                    ))
                }
            </div>
        </Stack>
    );
}

export default ChemistrySlider;
export type { ChemistrySliderProps };

/* Deprecated */
// interface ValueLabelComponentProps extends SliderValueLabelProps {
//     testName: ITestName;
// }

// const valueLabelComponent = (testName: ITestName) => ({ value, children }: SliderValueLabelProps) => {

//     const { userList, ascendingOrder } = useProfileIdListByAnswer(testName, value);
//     const isEven = ascendingOrder % 2 === 0;

//     return (
//         <Tooltip open={true} placement={isEven ? "left" : "right"} className="Slider__value-label" title={
//             <Stack flexDirection={isEven ? "row-reverse" : "row"}>
//                 <h2 className="typography-label">{value}</h2>
//                 <Stack>
//                     {
//                         userList.map((id) => (
//                             <AvatarProfile id={id} />
//                         ))
//                     }
//                 </Stack>
//             </Stack>
//         }
//         >
//             {children}
//         </Tooltip>
//     );
// }