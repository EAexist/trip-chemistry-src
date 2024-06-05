/* React */
import { SyntheticEvent, useEffect, useState } from "react";

/* Externals */
import { Close, Edit, ExpandMore, NavigateNext } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardActions, CardContent, Grow, IconButton, Slider, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import dayjs from "dayjs";

/* Swiper */
import 'swiper/css';
import 'swiper/css/effect-coverflow'; /* Food Carousel */

/* App */
import { TEST } from "../../common/app-const";

/* GoogleMap */
import InfoWindowContext from "~/components/GoogleMap/common/InfoWindowContext";
import GoogleMapMarker from "~/components/GoogleMap/ui/GoogleMapMarker";
import GoogleMapContext from "../../components/GoogleMap/common/GoogleMapContext";
import { OPTIONS_TEST_SCHEDULE } from "../../components/GoogleMap/common/options";
import GoogleMap from "../../components/GoogleMap/ui/GoogleMap";

import Logo from "../../components/Logo";
import { RootState } from "../../store";
import { useStrings } from "../../texts";
import { FORMATSVG } from "../../utils/getImgSrc";
import AnswerButtonGroup from "./component/AnswerButtonGroup";
import { TimeClock } from "@mui/x-date-pickers";
import { useTestAnswer } from "~/reducers/testAnswerReducer";

function TimeTestContent() {

    /* States */
    const [expanded, setExpanded] = useState<string | false>("start");

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    /* Reducers */
    const [scheduleStartTime, setScheduleStartTime] = useState(dayjs('2022-04-17T15:30'));
    const [scheduleEndTime, setScheduleEndTime] = useState(dayjs('2022-04-17T15:30'));

    return (
        <div className="block__body">
            <h2 className="typography-heading">시간</h2>
            <div>
                <Accordion expanded={expanded === "start"} onChange={handleChange("start")}>
                    <AccordionSummary
                        expandIcon={(expanded === "start") && <ExpandMore />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Stack direction="row" justifyContent="space-between" width="100%">
                            {
                                (expanded === "start") ?
                                    <p className="">{"숙소를 나서서 일정을 시작하려고 해.\n몇시가 좋을까?"}</p>
                                    :
                                    <p>{"시작 시간"}</p>
                            }
                            {
                                (expanded !== "start") &&
                                (
                                    (scheduleStartTime !== undefined) ?
                                        <p className="typography-body"><b>{scheduleStartTime.toString()}</b></p>
                                        :
                                        <Edit fontSize="small" />
                                )
                            }
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TimeClock value={scheduleStartTime} onChange={(newValue) => setScheduleStartTime(newValue)} views={['hours']} />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "end"} onChange={handleChange("end")}>
                    <AccordionSummary
                        expandIcon={(expanded === "end") && <ExpandMore />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Stack direction="row" justifyContent="space-between" width="100%">
                            {
                                (expanded === "end")
                                    ?
                                    <p>{"일정을 마치고 숙소에 들어가 쉬려고 해.\n몇시가 좋을까?"}</p>
                                    :
                                    <p>{"끝나는 시간"}</p>
                            }
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* <p className="typography-center">{"일정을 마치고 숙소에 들어가 쉬려고 해.\n몇시가 좋을까?"}</p> */}
                        <TimeClock value={scheduleStartTime} onChange={(newValue) => setScheduleStartTime(newValue)} views={['hours']} />
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}
export default TimeTestContent