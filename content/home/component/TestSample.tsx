/* React */
import { Fragment, useEffect, useState } from "react";

/* Externals */

/* App */

/* GoogleMap */
import { FormControlLabel, Paper, Radio, RadioGroup } from "@mui/material";
import SelectedPlaceContext from "~/components/GoogleMap/common/SelectedPlaceContext";
import GoogleMapMarker from "~/components/GoogleMap/ui/GoogleMapMarker";
import GoogleMapPolyline from "~/components/GoogleMap/ui/GoogleMapPolyline";
import { airportPlace, googleMapOptions, places, scheduleTestOptions } from "~/content/test/ScheduleTestContent";
import GoogleMapContext from "../../../components/GoogleMap/common/GoogleMapContext";
import { mapId_home, OPTIONS_TEST_SCHEDULE } from "../../../components/GoogleMap/common/options";
import GoogleMap from "../../../components/GoogleMap/ui/GoogleMap";

function TestSample() {

    /* States */
    const [scheduleExampleMap, setScheduleExampleMap] = useState<google.maps.Map | null>();

    const [scheduleAnswer, setScheduleAnswer] = useState<number>(1);
    const { zoom: googleMapZoom, center: googleMapCenter } = googleMapOptions[scheduleAnswer];

    useEffect(() => {
        scheduleExampleMap?.setZoom(googleMapZoom);
        scheduleExampleMap?.panTo(googleMapCenter);
    }, [scheduleAnswer, scheduleExampleMap]);

    /* Side Effects */
    const scheduleAnswerSwitchInterval = 2000;

    // Infinitely loop scheduleAnswer from 2 ~ 5
    useEffect(() => {
        setInterval(() => {
            setScheduleAnswer((prev) => (prev === 4) ? 1 : prev + 1)
        }, scheduleAnswerSwitchInterval)
    }, [])

    return (
            <div className="block--round full" style={{ overflow: "hidden" }} >
                <div style={{ position: "absolute", zIndex: 1 }} className="block--with-margin--xsmall">
                    <Paper className="">
                        <RadioGroup
                            name="controlled-radio-buttons-group full"
                            value={scheduleAnswer}
                            row={true}
                        >
                            {
                                scheduleTestOptions.map(({ value, label }, index) => (
                                    (value > 0) &&
                                    <FormControlLabel
                                        key={label}
                                        value={value}
                                        control={
                                            <Radio
                                                size="small"
                                            />
                                        }
                                        // label={<></>}
                                        label={(value === scheduleAnswer) && <p className="block--centered typography-note" style={{ whiteSpace: "normal", marginRight: (index===3) && "8px" }}>{label}</p>}
                                    // labelPlacement="top"
                                    />
                                ))
                            }
                        </RadioGroup>
                    </Paper>
                </div>
                <GoogleMapContext.Provider value={{ map: scheduleExampleMap as google.maps.Map, setMap: setScheduleExampleMap }}>
                    <GoogleMap opts={{ mapId: mapId_home, ...OPTIONS_TEST_SCHEDULE}}>
                        <SelectedPlaceContext.Provider value={{}}>
                            <GoogleMapMarker {...airportPlace} />
                            {
                                Object.entries(places).map(([id, place], index) => (
                                    <Fragment key={id}>
                                        <GoogleMapMarker id={id} {...place} isActive={place.option <= scheduleAnswer} />
                                        <GoogleMapPolyline
                                            coordinates={[
                                                (index > 0) ? Object.values(places)[index - 1].position : airportPlace.position,
                                                place.position
                                            ]}
                                            {...place}
                                            isActive={place.option <= scheduleAnswer}
                                        />
                                    </Fragment>
                                ))
                            }
                        </SelectedPlaceContext.Provider>
                    </GoogleMap>
                </GoogleMapContext.Provider>
            </div>
    );
}
export default TestSample;