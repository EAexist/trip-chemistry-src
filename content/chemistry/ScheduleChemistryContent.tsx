/* React */

/* Externals */
import { m } from "framer-motion";


/* App */
import { useStrings } from "../../texts";

import { Box, Grid, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

import PngIcon from "~/components/PngIcon";
import { MotionListItem } from "~/motion/components/MotionListItem";

import { FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { useProfileIdList } from "../../reducers/chemistryReducer";
import { useAppSelector } from "~/store";
import { Fragment } from "react/jsx-runtime";
import useTripMemberNicknames from "~/hooks/useTripMemberNicknames";

function ScheduleChemistryContent() {

    /* Constants */
    const strings = useStrings().public.contents.chemistry;

    /* Reducers */
    const answeredProfileIdList = useProfileIdList();

    /* States */
    // const [activeProfileId, setActiveProfileId] = useState<IProfileId | undefined>(answeredProfileIdList[0]);

    /* Reducers */
    const scheduleAnswerList = useAppSelector((state) =>
        Object.values(state.chemistry.data.profiles).map((profile) =>
        ({
            nickname: profile.nickname,
            ...profile.testAnswer ? profile.testAnswer.schedule : { startTime: -1, endTime: -1, schedule: -1 }
        })
        )
    ).sort((a, b) => (((b.endTime - b.startTime) - (a.endTime - b.startTime)) === 0) ? b.schedule - a.schedule : (b.endTime - b.startTime) - (a.endTime - b.startTime));

    const relaxingMemberNicknames = useTripMemberNicknames("relaxing")
    const busyMemberNicknames = useTripMemberNicknames("busy")

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
            <p>
                {
                    relaxingMemberNicknames.map(( nickname, index ) =>
                        <Fragment>
                        <b>{nickname}</b>
                        {" 님, "}
                        </Fragment>
                    )
                } 
                친구가 숙소 밖에서 더 많은 시간을 보내고 싶어해요. 친구들을 따라 여행지 곳곳을 돌아다니는 데에 시간을 더 투자해보세요.
            </p>
            <p>
                {
                    busyMemberNicknames.map(( nickname, index ) =>
                        <Fragment>
                        <b>{nickname}</b>
                        {" 님, "}
                        </Fragment>
                    )
                }
                친구가 숙소에서 쉬는 시간을 더 갖고 싶어해요. 계획을 짤 때 친구들이 지치지 않도록 신경 써 주세요. 이른 아침 또는 늦은 밤의 일정은 친구들과 따로 다니며 즐기는 것도 고려해보세요.
            </p>
        </div>
    );
}
export default ScheduleChemistryContent;