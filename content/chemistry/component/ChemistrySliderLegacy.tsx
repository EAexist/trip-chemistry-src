import { Slider as MuiSlider, SliderOwnProps, Stack } from "@mui/material";

import { m } from "framer-motion";
import { forwardRef, Ref } from "react";
import { FADEIN_FROMBOTTOM_VIEWPORT, VARIANTS_FADEIN_FROMBOTTOM, VARIANTS_STAGGER_CHILDREN } from "~/motion/props";
import FriendAvatar from "../../../components/Avatar/FriendAvatar";
import useProfileIdListByAnswer from "../../../hooks/useProfileIdListByAnswer";
import useValueToProfileIdList from "../../../hooks/useValueToProfileIdList";
import { ITestKey } from "../../../interfaces/ITestAnswer";
import { ITestIndex } from "~/reducers/testAnswerReducer";

interface ChemistrySliderProps extends SliderOwnProps, ITestIndex {
};

const SliderValueLabel = m(forwardRef(({ testKey, value }: { testKey: ITestKey, value: number }, ref: Ref<HTMLDivElement>) => {

    const { userList } = useProfileIdListByAnswer(testKey, value);

    return (
        userList.length > 0
            ? <Stack className="Slider__value" ref={ref}>
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
}), { forwardMotionProps: true });

const Slider = m(MuiSlider, { forwardMotionProps: true });

function ChemistrySlider({ testKey, subKey, ...sliderOwnProps }: ChemistrySliderProps ) {

    const budgetAnswerToProfiles = useValueToProfileIdList(testKey, subKey);

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
                        getAriaLabel={() => (`friends' restaurant budget preference`)}
                        orientation="vertical"
                        size="small"
                        value={Object.keys(budgetAnswerToProfiles).map((answer) => Number(answer))}
                        marks
                    />
                </Stack>
                <m.div className="flex" initial={"hidden"} whileInView={"visible"} variants={VARIANTS_STAGGER_CHILDREN} custom={{ staggerChildren: 0.2, delayChildren: 0.5 }}>
                    {
                        marks.map((value) => (
                            <SliderValueLabel key={value} testKey={testKey} value={value} variants={VARIANTS_FADEIN_FROMBOTTOM} />
                        ))
                    }
                </m.div>
            </Stack>
    );
}

export default ChemistrySlider;
export type { ChemistrySliderProps };

/* Deprecated */
// interface ValueLabelComponentProps extends SliderValueLabelProps {
//     testKey: ITestKey;
// }

// const valueLabelComponent = (testKey: ITestKey) => ({ value, children }: SliderValueLabelProps) => {

//     const { userList, ascendingOrder } = useProfileIdListByAnswer(testKey, value);
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