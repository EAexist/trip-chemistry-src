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
            <div className="block__body">
                <div>
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
                </div>
                <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="block__body">
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
                </m.div>
            </div>
        </>
    );
}
export default ScheduleChemistryContent;