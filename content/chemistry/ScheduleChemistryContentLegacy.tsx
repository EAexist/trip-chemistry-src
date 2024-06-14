/* React */
import { Fragment } from "react";

/* Externals */
import { m } from "framer-motion";

import { List, ListItemAvatar, ListItemText, Stack, useTheme } from "@mui/material";

/* App */
import { useStrings } from "../../texts";

import { MotionListItem } from "~/motion/components/MotionListItem";
import FriendAvatar from "../../components/Avatar/FriendAvatar";
import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import { FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { useChemistry } from "../../reducers/chemistryReducer";

function ScheduleChemistryContent() {

    /* Constants */
    const testStrings = useStrings().public.contents.test;
    const strings = useStrings().public.contents.chemistry;

    /* States */
    const { palette } = useTheme();

    /* Reducers */
    const chemistry = useChemistry();

    const scheduleAnswerToProfiles = useValueToProfileIdList('schedule');
    
    return (
        <>
            <m.h2 {...FADEIN_FROMBOTTOM_VIEWPORT} className="typography-heading">{strings.sections.schedule.title}</m.h2>
            <div className="content">
                    <List>
                        {
                            (Object.values(testStrings.test.schedule.answers) as { label: string, value: number }[]).map(({ label, value }) => (
                                Object.keys(scheduleAnswerToProfiles).includes(String(value)) &&
                                <MotionListItem key={label} {...FADEIN_FROMBOTTOM_VIEWPORT} disableGutters dense >
                                    {(value === 4) && <div style={{ position: 'absolute', backgroundColor: palette.primary.light, opacity: 0.5, width: '100%', height: '100%' }} className="block--round" />}
                                    <ListItemAvatar style={{ width: "100px", zIndex: 1 }} className="block--centered">
                                        <p className={Object.keys(scheduleAnswerToProfiles).includes(String(value)) ? "typography-label" : "disabled"}>{label}</p>
                                    </ListItemAvatar>
                                    <ListItemText primary={
                                        <Stack>
                                            <Stack spacing={0.5}>
                                                {
                                                    (Object.keys(scheduleAnswerToProfiles).includes(String(value)) ? scheduleAnswerToProfiles[value] : []).map((id) => (
                                                        <FriendAvatar key={id} id={id} />
                                                    ))
                                                }
                                            </Stack>
                                        </Stack>
                                    } sx={{ marginLeft: "16px", zIndex: 1 }} />
                                </MotionListItem>
                            )).reverse()
                        }
                    </List>
                <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="content">
                </m.div>
            </div>
                {/* <Slider
                        size="small"
                        valueLabelDisplay="on"
                        valueLabelFormat={(value, index) => (
                            <AvatarGroup spacing={'small'}>
                                {
                                    scheduleAnswerToProfiles[value].map((profileId) => (
                                        <FriendAvatar id={profileId} />
                                    ))
                                }
                            </AvatarGroup>
                        )}
                        track={false}
                        sx={{
                            '& input[type="range"]': {
                                WebkitAppearance: 'slider-vertical',
                            },
                            '& .MuiSlider-valueLabel': {
                                background: 'unset',
                            },
                            '& .MuiSlider-markLabel': {
                                fontSize: 12,
                                width: "48px",
                                whiteSpace: "pre-line",
                                textAlign: "center"
                            },
                            marginTop: "72px",
                            marginBottom: "48px",

                        }}
                        value={Object.keys(scheduleAnswerToProfiles).map(value => Number(value))}
                        {...scheduleSliderProps}
                    /> */}
                {/* <Slider
                        orientation="vertical"
                        size="small"
                        valueLabelDisplay="on"
                        valueLabelFormat={( value, index ) => (
                            // Object.keys(scheduleAnswerToProfiles).includes(value) ?
                            <AvatarGroup>
                                {
                                    scheduleAnswerToProfiles[value].map(( profileId ) => (
                                        <FriendAvatar id={profileId} />
                                    ))
                                }
                            </AvatarGroup>
                        )}
                        // value={(scheduleAnswer === undefined) ? 2 : scheduleAnswer}
                        track={false}
                        sx={{
                            '& input[type="range"]': {
                                WebkitAppearance: 'slider-vertical',
                            },
                            '& .MuiSlider-valueLabel': {
                                background: 'unset',
                                left: "28px",
                                justifyContent: "flex-start"
                            },
                            '& .MuiSlider-markLabel': {
                                fontSize: 12,
                                left: "-48px",
                                width: "48px",
                                whiteSpace: "pre-line",
                                textAlign: "center"
                            },
                            height: 250,
                            marginTop: "40px",
                            marginBottom: "40px",
                            marginLeft: "24px"

                        }}
                        value={ Object.keys(scheduleAnswerToProfiles).map(value => Number(value) ) }
                        {...scheduleSliderProps}
                    /> */}
                {/* <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="content">
                    {
                        chemistry?.scheduleChemistryText?.map((body, index) => {
                            const list = body.split(/(%\S*%)/)
                            return (
                                <p key={index}>
                                    {
                                        list.map((t, index) =>
                                            t[0] === "%"
                                                ? <b key={index}>{t.replaceAll('%', '')}</b>
                                                : <Fragment key={index}>{t}</Fragment>
                                        )
                                    }
                                </p>
                            )
                        })
                    }
                </m.div> */}
        </>
    );
}
export default ScheduleChemistryContent;