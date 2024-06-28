/* React */
import { Fragment, useCallback, useEffect, useState } from "react";

/* Externals */

/* App */

/* GoogleMap */
import { FormControlLabel, Paper, Radio, RadioGroup } from "@mui/material";
import { APIProvider, Map, MapCameraChangedEvent, MapCameraProps } from "@vis.gl/react-google-maps";
import GoogleMapMarker from "~/components/GoogleMap/ui/GoogleMapMarker";
import GoogleMapPanner from "~/components/GoogleMap/ui/GoogleMapPanner";
import GoogleMapPolyline from "~/components/GoogleMap/ui/GoogleMapPolyline";
import { airportPlace, googleMapOptions, places, scheduleTestOptions } from "~/content/test/ScheduleTestContent";
import env from "~/env";
import { OPTIONS_TEST_SCHEDULE } from "../../../components/GoogleMap/common/options";

function TestSample() {

    /* GoogleMap */
    /* API load */
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        console.log(`Mounting [GoogleMap]`);
        async function importLibrary() {
            const libaray = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
            setIsLoaded(true)
        }
        importLibrary();
    }, []);

    /* Zoom and pan */
    const [scheduleAnswer, setScheduleAnswer] = useState<number>(1);
    const [cameraProps, setCameraProps] = useState<MapCameraProps>(googleMapOptions[scheduleAnswer || 0]);
    const handleCameraChange = useCallback((ev: MapCameraChangedEvent) =>
        setCameraProps(ev.detail)
        , []);

    const [panTargetPosition, setPanTargetPosition] = useState<google.maps.LatLngLiteral>()

    useEffect(() => {
        setPanTargetPosition(googleMapOptions[scheduleAnswer || 0].center)
    }, [scheduleAnswer]);


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
                                    label={(value === scheduleAnswer) && <p className="block--centered typography-note" style={{ whiteSpace: "normal", marginRight: (index === 3) && "8px" }}>{label}</p>}
                                // labelPlacement="top"
                                />
                            ))
                        }
                    </RadioGroup>
                </Paper>
            </div>
            {
                isLoaded &&
                <APIProvider libraries={["maps"]} apiKey={env.REACT_APP_GOOGLE_MAP_JS_API_KEY}>
                    <Map {...OPTIONS_TEST_SCHEDULE} {...cameraProps} onCameraChanged={handleCameraChange}>
                        <GoogleMapPanner zoom={googleMapOptions[scheduleAnswer || 0].zoom} center={panTargetPosition} />
                        <GoogleMapMarker {...airportPlace} />
                        {
                            (scheduleAnswer !== undefined) &&
                            Object.entries(places).map(([id, place], index) => (
                                <Fragment key={id}>
                                    <GoogleMapMarker id={id} {...place} isActive={(scheduleAnswer === 0) || (place.option <= scheduleAnswer)} />
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
                    </Map>
                </APIProvider>
            }
        </div>
    );
}
export default TestSample;