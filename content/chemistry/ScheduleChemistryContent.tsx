/* React */
import { useState } from "react";

/* Externals */
import { Circle, Help } from "@mui/icons-material";
import { Box, Button, Container, Dialog, Icon, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { m } from "framer-motion";

/* App */
import { IProfile } from "../../interfaces/IProfile";
import { MotionList } from "../../motion/components/MotionList";
import { MotionListItem } from "../../motion/components/MotionListItem";
import { FADEIN_FROMBOTTOM_VIEWPORT, VARIANTS_SLIDEUP, VARIANTS_STAGGER_CHILDREN } from "../../motion/props";
import { useUserProfile } from "../../reducers/authReducer";
import { useAppSelector } from "../../store";
import { nightPlanTestOptions, scheduleTestOptions } from "../test/TimeTestContent";

function ScheduleChemistryContent() {

    const { id, nickname } = useUserProfile()

    const scheduleAnswersSorted = useAppSelector(
        createSelector(
            state => state.chemistry.data.profiles,
            (profiles: {[k: string] : IProfile }) =>
                Object.values(profiles).map((profile) =>
                ({
                    nickname: profile.nickname,
                    ...profile.testResult ? profile.testAnswer.schedule : { startTime: -1, endTime: -1, schedule: -1, nightPlan: undefined }
                })
                ).sort((a, b) => (((b.endTime - b.startTime) - (a.endTime - a.startTime)) === 0) ? (b.schedule - a.schedule) : (b.endTime - b.startTime) - (a.endTime - a.startTime))
        )
    );

    const minStartTIme = Math.min(...scheduleAnswersSorted.map(({ startTime }) => startTime >= 0 ? startTime : 24))

    const relaxingMemberIds = useAppSelector((state)=>state.chemistry.data.memberLists.relaxing)
    const busyMemberIds = useAppSelector((state)=>state.chemistry.data.memberLists.busy)


    /* Dialog */
    const [openHelpDialog, setOpenHelpDialog] = useState(false)

    return (
        <>
            <Dialog onClose={() => setOpenHelpDialog(false)} open={openHelpDialog}>
                <Container className="column-padding content content--sparse">
                    <div className="content">
                        <h3>널널함</h3>
                        <Stack direction={"row"} alignItems={"start"}>
                            {
                                scheduleTestOptions.map(({ value, label }) =>
                                    <Stack key={value} direction={"column"} textAlign={"center"} sx={{ width: "48px" }} >
                                        <Circle sx={{ color: (value > 0) ? "primary.main" : "gray.dark", opacity: (value > 0) ? 0.25 * value : 1, fontSize: "12px" }} />
                                        <p className="typography-note">{label}</p>
                                    </Stack>
                                )
                            }
                        </Stack>
                    </div>
                    <div>
                        <h3>밤에는 뭘 할까</h3>
                        <List disablePadding>
                            {
                                nightPlanTestOptions.map(({ label, materialIcon }, index) =>
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Icon className="color-gray">{materialIcon}</Icon>
                                        </ListItemAvatar>
                                        <ListItemText primary={<p className="typography-note">{label}</p>} />
                                    </ListItem>
                                )
                            }
                        </List>
                    </div>
                    <Button variant="outlined" onClick={() => setOpenHelpDialog(false)} className="main-action-button">닫기</Button>
                </Container>
            </Dialog>
            <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="section-header">
                <Stack justifyContent={"space-between"}>
                    <h2 className="section-title">일정은 어떻게 짤까?</h2>
                    <IconButton onClick={() => setOpenHelpDialog(true)}>
                        <Help fontSize="small" />
                    </IconButton>
                </Stack>
            </m.div>
            <div className="content">
                {/* <Stack justifyContent={"end"}>
                    <FormControlLabel control={
                        <Switch
                            checked={showScheduleLabel}
                            onChange={handleShowLabelSwitchChange}
                            size="small"
                            color="default"
                        />
                    } label={<p className="typography-note">널널함 표시</p>} labelPlacement="start" />
                </Stack> */}
                <MotionList
                    // custom={0.5} /* delayChildren */
                    initial={"hidden"}
                    whileInView={"visible"}
                    variants={VARIANTS_STAGGER_CHILDREN}
                    viewport={{ once: true }}
                >
                    {
                        scheduleAnswersSorted.map(({ nickname, startTime, endTime, schedule, nightPlan }) =>
                            <MotionListItem
                                key={nickname}
                                disabled={(startTime < 0)}
                                variants={VARIANTS_SLIDEUP}
                                sx={{ opacity: 0.5 }}
                            >
                                <ListItemAvatar className="block--centered typography-note--lg" sx={{ width: "72px" }} >
                                    {nickname}
                                </ListItemAvatar>
                                <ListItemText primary={
                                    (startTime >= 0)
                                        ?
                                        <Box sx={{ backgroundColor: "gray.main", height: "8px", borderRadius: "16px", position: "relative", marginTop: "0.8rem", marginBottom: "0.8rem" }}>
                                            <Box sx={{ backgroundColor: "white", height: "8px", width: `${(endTime - startTime) * 100 / (24 - minStartTIme)}%`, borderRadius: "16px", position: "absolute", left: `${(startTime - minStartTIme) * 100 / (24 - minStartTIme)}%` }}>
                                                <Box sx={{ backgroundColor: (schedule > 0) ? "primary.main" : "gray.dark", width: "100%", height: "100%", borderRadius: "16px", opacity: (schedule > 0) ? 0.25 * schedule : 1 }} />
                                            </Box>
                                            <p className="typography-note" style={{ position: "absolute", left: `${(startTime - minStartTIme) * 100 / (24 - minStartTIme)}%`, top: "100%", transform: "translateX(-50%)" }}>
                                                {startTime}시
                                            </p>
                                            <p className="typography-note" style={{ position: "absolute", left: `${(endTime - minStartTIme) * 100 / (24 - minStartTIme)}%`, top: "100%", transform: "translateX(-50%)" }}>
                                                {endTime}시
                                            </p>
                                            {/* <Fade in={showScheduleLabel}>
                                                <p className="typography-note" style={{ position: "absolute", left: `${(startTime + endTime - 2 * minStartTIme) / 2 * 100 / (24 - minStartTIme)}%`, bottom: "100%", transform: "translateX(-50%)", marginBottom: "0.25rem" }}>
                                                    {
                                                        scheduleAnswerLabels[schedule]
                                                    }
                                                </p>
                                            </Fade> */}
                                            <div style={{ position: "absolute", left: `${(24 + endTime - 2 * minStartTIme) / 2 * 100 / (24 - minStartTIme)}%`, transform: "translateX(-50%)", bottom: "0%" }}>
                                                <Icon fontSize="small" className="color-gray" >{nightPlanTestOptions[nightPlan].materialIcon}</Icon>
                                            </div>
                                        </Box>
                                        :
                                        <p className="block--centered"> ? </p>
                                } />
                            </MotionListItem>
                        )
                    }
                </MotionList>
                {/* <Stack>
                    {
                        nightPlanTestOptions.map(({ icon }))

                    }
                </Stack> */}
            </div>
            {
                (relaxingMemberIds.includes(id)) &&
                <m.p className="typography-article" {...FADEIN_FROMBOTTOM_VIEWPORT}>
                    {`${nickname} 님, `}
                    친구들은 숙소 밖에서 더 많은 시간을 보내고 싶어해요. 친구들을 따라 여행지 곳곳을 돌아다니는 데에 시간을 더 투자해보세요.
                </m.p>
            }
            {
                (busyMemberIds.includes(id)) &&
                <m.p className="typography-article" {...FADEIN_FROMBOTTOM_VIEWPORT}>
                    {`${nickname} 님, `}
                    친구들은 숙소에서 쉬는 시간을 더 갖고 싶어해요. 계획을 짤 때 친구들이 지치지 않도록 신경 써 주세요. 이른 아침 또는 늦은 밤의 일정은 친구들과 따로 다니며 즐기는 것도 고려해보세요.
                </m.p>
            }
        </>
    );
}
export default ScheduleChemistryContent;