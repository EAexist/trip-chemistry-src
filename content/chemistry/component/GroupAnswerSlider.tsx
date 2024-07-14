import { Avatar, Badge, IconButton, Slider, SliderProps, Stack } from "@mui/material";
import { m } from "framer-motion"

/* App */
import { Close } from "@mui/icons-material";
import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import FriendAvatar from "~/components/Avatar/FriendAvatar";
import LabeledAvatar from "~/components/Avatar/LabeledAvatar";
import { IProfileId } from "~/reducers";
import { useAppSelector } from "~/store";
import { IvalueToProfileIds } from "../../../hooks/useValueToProfileIdList";
import { AnimatePresence } from "framer-motion";
import { FADEIN } from "~/motion/props";

interface GroupAnswerSliderValueLabelProps {
    profileIds: IProfileId[]
}

function GroupAnswerSliderValueLabel({ profileIds }: GroupAnswerSliderValueLabelProps) {

    const length = profileIds.length

    const [isExpanded, setIsExpanded] = useState(false)

    const handleClick = () => {
        setIsExpanded(true)
    }

    const nicknames = useAppSelector(
        createSelector(
            state => state.chemistry?.data.profiles,
            (profiles) => profileIds.map(profileId =>
                profiles[profileId].nickname
            )
        )
    )

    return (
        // <AnimatePresence mode={"wait"} initial={false}>
        //     <m.div key={String(isExpanded)} {...{ ...FADEIN, exit: "hidden" }}>
        //         {
                    isExpanded
                        ?
                        <Stack direction={"column"}>
                            <IconButton onClick={() => setIsExpanded(false)} sx={{ width: "24px", height: "24px" }}>
                                <Close />
                            </IconButton>
                            {
                                nicknames.map((nickname) => (
                                    <p key={nickname} className="typography--profile-label">{nickname}</p>
                                ))
                            }
                        </Stack>
                        :
                        <Stack onClick={handleClick} direction={"row-reverse"} spacing={-5} alignItems={"start"}>
                            <Avatar variant="outlined" />
                            <LabeledAvatar label={`${nicknames[0]} ···`} labelSize="large" variant="outlined" />
                            <Badge badgeContent={`+${length}`} color="primary">
                                <FriendAvatar showBadge={false} id={profileIds[0]} renderLabel={false} variant="outlined" />
                            </Badge>
                        </Stack>
        //         }
        //     </m.div>
        // </AnimatePresence>
    )
}

interface GroupAnswerSliderProps extends SliderProps {
    answerToProfiles: IvalueToProfileIds
}

function GroupAnswerSlider({ answerToProfiles, className, ...sliderProps }: GroupAnswerSliderProps) {

    // const [activeValue, setActiveValue] = useState<number | false>(false)

    // const handleAvatarGroupClick = (value: number | false) => () => {
    //     setActiveValue(value)
    // }

    // const handleCloseMemberList = () => {
    //     setActiveValue(false)
    // }

    useEffect(() => {
        console.log(`[GroupAnswerSlider]: answerToProfiles=${JSON.stringify(answerToProfiles)}}`);
    }, [answerToProfiles]);

    return (
        <div className={className}>
            <div style={{ padding: "8px 24px" }}>
                <Slider
                    {...sliderProps}
                    size="small"
                    valueLabelDisplay="on"
                    valueLabelFormat={(value, index) =>
                    (
                        Object.keys(answerToProfiles).includes(value.toString()) && (
                            answerToProfiles[value].length > 1
                                ?
                                <GroupAnswerSliderValueLabel profileIds={answerToProfiles[value]} />
                                :
                                <FriendAvatar id={answerToProfiles[value][0]} showBadge={false}/>
                        )
                    )
                    }
                    track={false}
                    sx={{
                        '& .MuiSlider-valueLabel': {
                            background: 'unset',
                        },
                        '& .MuiSlider-markLabel': {
                            fontSize: 12,
                            width: "48px",
                            whiteSpace: "pre-line",
                            textAlign: "center"
                        },
                        '& .Mui-disabled': {
                            color: "primary.main"
                        },
                        marginTop: "72px",
                        marginBottom: "24px",
                    }}
                    value={Object.keys(answerToProfiles).map(value => Number(value))}
                    marks={Object.keys(answerToProfiles).map(value => ({
                        value: Number(value),
                        label: value
                    }))}
                />
            </div>
        </div>
    );
}
export default GroupAnswerSlider;