/* React */

/* Externals */
import { Box, Fade, FormControlLabel, List, ListItem, ListItemAvatar, ListItemText, Stack, Switch } from "@mui/material";
import { m } from "framer-motion";

/* App */
import { ChangeEvent, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import useTripMemberNicknames from "~/hooks/useTripMemberNicknames";
import { useAppSelector } from "~/store";
import { FADEIN_FROMBOTTOM_VIEWPORT, SLIDEUP_VIEWPORT, VARIANTS_SLIDEUP, VARIANTS_STAGGER_CHILDREN } from "../../motion/props";
import { MotionList } from "~/motion/components/MotionList";
import { MotionListItem } from "~/motion/components/MotionListItem";
import { createSelector } from "@reduxjs/toolkit";
import { IProfile } from "~/interfaces/IProfile";

const scheduleAnswerLabels = {
    1: "매우 널널",
    2: "널널",
    4: "알참",
    5: "매우 알참",
    0: "상관 없음",
}

function ScheduleChemistryContent() {

    /* Label */
    const [showScheduleLabel, setHideScheduleLabel] = useState(true)
    const handleShowLabelSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setHideScheduleLabel(event.target.checked);
    };

    /* Reducers */
    const scheduleAnswersSorted = useAppSelector(
        createSelector(state => state.chemistry.data.profiles,
            (profiles: IProfile[]) =>
                Object.values(profiles).map((profile) =>
                ({
                    nickname: profile.nickname,
                    ...profile.testAnswer ? profile.testAnswer.schedule : { startTime: -1, endTime: -1, schedule: -1 }
                })
                ).sort((a, b) => (((b.endTime - b.startTime) - (a.endTime - b.startTime)) === 0) ? b.schedule - a.schedule : (b.endTime - b.startTime) - (a.endTime - b.startTime))
        )
    );

    const relaxingMemberNicknames = useTripMemberNicknames("relaxing")
    const busyMemberNicknames = useTripMemberNicknames("busy")

    return (
        <div className="content">
            <m.h2 {...FADEIN_FROMBOTTOM_VIEWPORT} className="typography-heading">언제, 얼마나 알차게 여행할까?</m.h2>
            <div>
                <Stack justifyContent={"end"}>
                    <FormControlLabel control={
                        <Switch
                            checked={showScheduleLabel}
                            onChange={handleShowLabelSwitchChange}
                            size="small"
                            color="default"
                        />
                    } label={<p className="typography-note">널널함 표시</p>} labelPlacement="start" />
                </Stack>
                <MotionList
                    // custom={0.5} /* delayChildren */
                    initial={"hidden"}
                    whileInView={"visible"}
                    variants={VARIANTS_STAGGER_CHILDREN}
                >
                    {
                        scheduleAnswersSorted.map(({ nickname, startTime, endTime, schedule }) =>
                            <MotionListItem
                                key={nickname}
                                disabled={(startTime < 0)}
                                variants={VARIANTS_SLIDEUP}
                            >
                                <ListItemAvatar className="block--centered" sx={{ width: "72px" }}>
                                    <p>{nickname}</p>
                                </ListItemAvatar>
                                <ListItemText primary={
                                    (startTime >= 0)
                                        ?
                                        <Box sx={{ backgroundColor: "gray.main", height: "8px", borderRadius: "16px", position: "relative", marginTop: "0.8rem", marginBottom: "0.8rem" }}>
                                            <Box sx={{ backgroundColor: "white", height: "8px", width: `${(endTime - startTime) * 100 / 24}%`, borderRadius: "16px", position: "absolute", left: `${startTime * 100 / 24}%` }}>
                                                <Box sx={{ backgroundColor: (schedule > 0) ? "primary.main" : "gray.dark", width: "100%", height: "100%", borderRadius: "16px", opacity: (schedule > 0) ? 0.25 * schedule : 1 }} />
                                            </Box>
                                            <p className="typography-note" style={{ position: "absolute", left: `${startTime * 100 / 24}%`, top: "100%", transform: "translateX(-50%)" }}>
                                                {startTime}시
                                            </p>
                                            <p className="typography-note" style={{ position: "absolute", left: `${endTime * 100 / 24}%`, top: "100%", transform: "translateX(-50%)" }}>
                                                {endTime}시
                                            </p>
                                            <Fade in={showScheduleLabel}>
                                                <p className="typography-note" style={{ position: "absolute", left: `${(startTime + endTime) / 2 * 100 / 24}%`, bottom: "100%", transform: "translateX(-50%)", marginBottom: "0.25rem" }}>
                                                    {
                                                        scheduleAnswerLabels[schedule]
                                                    }
                                                </p>
                                            </Fade>
                                        </Box>
                                        :
                                        <p className="block--centered"> ? </p>
                                } />
                            </MotionListItem>
                        )
                    }
                </MotionList>
            </div>
            <m.p className="typography-article" {...SLIDEUP_VIEWPORT}>
                {
                    relaxingMemberNicknames.map((nickname, index) =>
                        <Fragment key={nickname}>
                            <b>{nickname}</b>
                            {" 님, "}
                        </Fragment>
                    )
                }
                친구들은 숙소 밖에서 더 많은 시간을 보내고 싶어해요. 친구들을 따라 여행지 곳곳을 돌아다니는 데에 시간을 더 투자해보세요.
            </m.p>
            <m.p className="typography-article" {...SLIDEUP_VIEWPORT}>
                {
                    busyMemberNicknames.map((nickname, index) =>
                        <Fragment key={nickname}>
                            <b>{nickname}</b>
                            {" 님, "}
                        </Fragment>
                    )
                }
                친구들은 숙소에서 쉬는 시간을 더 갖고 싶어해요. 계획을 짤 때 친구들이 지치지 않도록 신경 써 주세요. 이른 아침 또는 늦은 밤의 일정은 친구들과 따로 다니며 즐기는 것도 고려해보세요.
            </m.p>
        </div>
    );
}
export default ScheduleChemistryContent;