/* React */

/* Externals */
import { m } from "framer-motion";


/* App */
import { useStrings } from "../../texts";

import { Box, Grid, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import PngIcon from "~/components/PngIcon";
import { MotionListItem } from "~/motion/components/MotionListItem";
import { RootState } from "~/store";
import { FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { useProfileIdList } from "../../reducers/chemistryReducer";

function ScheduleChemistryContent() {

    /* Constants */
    const strings = useStrings().public.contents.chemistry;

    /* Reducers */
    const answeredProfileIdList = useProfileIdList();

    /* States */
    // const [activeProfileId, setActiveProfileId] = useState<IProfileId | undefined>(answeredProfileIdList[0]);

    /* Reducers */
    const scheduleAnswerList = useSelector((state: RootState) =>
        Object.values(state.chemistry.data.profileList).map((profile) =>
        ({
            nickname: profile.nickname,
            ...profile.testAnswer ? profile.testAnswer.schedule : { startTime: -1, endTime: -1, schedule: -1 }
        })
        )
    ).sort((a, b) => (((b.endTime - b.startTime) - (a.endTime - b.startTime)) === 0) ? b.schedule - a.schedule : (b.endTime - b.startTime) - (a.endTime - b.startTime));

    return (
        <div className="content">
            <m.h2 {...FADEIN_FROMBOTTOM_VIEWPORT} className="typography-heading">{strings.sections.schedule.title}</m.h2>
            <List>
                {/* <MotionListItem
                    {...FADEIN_FROMBOTTOM_VIEWPORT}
                    key={"grid"}
                    disablePadding
                >
                    <ListItemAvatar />
                    <ListItemText primary={
                        <Grid container>
                            <Grid item xs={2} />
                            <Grid item xs={2} className="block--centered">
                                <PngIcon name={"sunrise"} />
                            </Grid>
                            <Grid item xs={1} />
                            <Grid item xs={2} className="block--centered">
                            </Grid>
                            <Grid item xs={1} />
                            <Grid item xs={2} className="block--centered">
                                <PngIcon name={"sunset"} />
                            </Grid>
                        </Grid>
                    } />
                </MotionListItem> */}
                {
                    scheduleAnswerList.map(({ nickname, startTime, endTime }) =>
                        <ListItem
                            {...FADEIN_FROMBOTTOM_VIEWPORT}
                            key={nickname}
                            className={ ( startTime < 0 ) && "disabled" }
                        >
                            <ListItemAvatar className="block--centered">
                                <p className="">{nickname}</p>
                            </ListItemAvatar>
                            <ListItemText primary={
                                (startTime >= 0)
                                    ?
                                    <Grid container sx={{ backgroundColor: "gray.main" }}>
                                        <Grid item xs={startTime / 2} className="full" sx={{ backgroundColor: "gray.main" }}>
                                            <Box sx={{ backgroundColor: "gray.main", width: "100%", height: "100%" }} className="full" />
                                        </Grid>
                                        <div style={{ position: "relative" }}>
                                            <p className="typography-note" style={{ position: "absolute", top: "100%", transform: "translateX(-50%)" }}>
                                                {startTime}시
                                            </p>
                                        </div>
                                        <Grid item xs={(endTime - startTime) / 2} >
                                            <Box sx={{ backgroundColor: "primary.light" }} className="full" >
                                                .
                                            </Box>
                                        </Grid>
                                        <div style={{ position: "relative" }}>
                                            <p className="typography-note" style={{ position: "absolute", top: "100%", transform: "translateX(-50%)" }}>
                                                {endTime}시
                                            </p>
                                        </div>
                                        <Grid item xs />
                                    </Grid>
                                    :
                                    <p className="block--centered"> ? </p>
                            } />
                        </ListItem>
                    )
                }
            </List>
        </div>
    );
}
export default ScheduleChemistryContent;