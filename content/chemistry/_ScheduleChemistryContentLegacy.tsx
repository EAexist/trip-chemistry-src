/* React */

/* Externals */
import { m } from "framer-motion";

import { List, ListItemAvatar, ListItemText, Stack, useTheme } from "@mui/material";

/* App */
import { useStrings } from "../../texts";

import { MotionListItem } from "../motion/components/MotionListItem";
import FriendAvatar from "../../components/Avatar/FriendAvatar";
import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import { FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";

function ScheduleChemistryContent() {

    /* Constants */
    const testStrings = useStrings().public.contents.test;
    const strings = useStrings().public.contents.chemistry;

    /* States */
    const { palette } = useTheme();

    const scheduleAnswerToProfiles = useValueToProfileIdList('schedule');
    
    return (
        <>
            <h2 className="section-title">{strings.sections.schedule.title}</h2>
            <div className="content">
                    <List>
                        {
                            (Object.values(testStrings.test.schedule.answers) as { label: string, value: number }[]).map(({ label, value }) => (
                                Object.keys(scheduleAnswerToProfiles).includes(String(value)) &&
                                <MotionListItem key={label} {...FADEIN_FROMBOTTOM_VIEWPORT} disableGutters dense >
                                    {(value === 4) && <div style={{ position: 'absolute', backgroundColor: palette.primary.light, opacity: 0.5, width: '100%', height: '100%' }} className="block--round" />}
                                    <ListItemAvatar style={{ width: "100px", zIndex: 1 }} className="block--centered">
                                        <p className={Object.keys(scheduleAnswerToProfiles).includes(String(value)) ? "typography-highlight" : "disabled"}>{label}</p>
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
        </>
    );
}
export default ScheduleChemistryContent;