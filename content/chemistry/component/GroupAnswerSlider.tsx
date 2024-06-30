import { Avatar, Badge, Container, IconButton, Paper, Slider, SliderProps, Stack } from "@mui/material";

/* App */
import { Close, KeyboardArrowUp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import FriendAvatar from "~/components/Avatar/FriendAvatar";
import LabeledAvatar from "~/components/Avatar/LabeledAvatar";
import Label from "~/components/Label";
import { IProfile } from "~/interfaces/IProfile";
import { IProfileId } from "~/reducers";
import { useProfile } from "~/reducers/chemistryReducer";
import { IvalueToProfileIds } from "../../../hooks/useValueToProfileIdList";

interface GroupAnswerSliderValueLabelProps {
    profileIds: IProfileId[]
    isActive: boolean,
    onClick: () => void
}

function GroupAnswerSliderValueLabel({ profileIds, isActive, onClick }: GroupAnswerSliderValueLabelProps) {
    const length = profileIds.length
    const { nickname: label } = useProfile(profileIds[0]) as IProfile;

    return (
        isActive
            ?
            <Label label={`${length}명`}>
                {/* <IconButton onClick={onClick} sx={{ color: "primary.main", width: "40px", height: "40px", outline: "1px solid" }}> */}
                <IconButton onClick={onClick} sx={{ width: "40px", height: "40px", backgroundColor: "gray.light" }}>
                    <KeyboardArrowUp />
                </IconButton>
            </Label>
            :
            <Badge badgeContent={length} >
                <Stack onClick={onClick} direction={"row-reverse"} spacing={-5} alignItems={"start"}>
                    <Avatar />
                    <LabeledAvatar label={`${label} ···`} labelSize="large" />
                    <FriendAvatar id={profileIds[0]} renderLabel={false} />
                </Stack>
            </Badge>
    )
}

interface GroupAnswerSliderProps extends SliderProps {
    answerToProfiles: IvalueToProfileIds
}

function GroupAnswerSlider({ answerToProfiles, className, ...sliderProps }: GroupAnswerSliderProps) {

    const [activeValue, setActiveValue] = useState<number | false>(false)

    const handleAvatarGroupClick = (value: number | false) => () => {
        setActiveValue(value)
    }

    const handleCloseMemberList = () => {
        setActiveValue(false)
    }

    useEffect(() => {
        console.log(`[GroupAnswerSlider]: answerToProfiles=${JSON.stringify(answerToProfiles)}}`);
    }, [answerToProfiles]);

    return (
        <div className={className}>
            {
                (!!activeValue) &&
                // <Grow in={!!activeValue} mountOnEnter unmountOnExit>
                <Paper variant="gray">
                    <Container className="gutter--sm">
                    <Stack display={"flex"} flexDirection={"row-reverse"} >
                        <IconButton onClick={handleCloseMemberList}>
                            <Close />
                        </IconButton>
                        <Stack sx={{ flexGrow: 1 }}>
                            {
                                activeValue &&
                                answerToProfiles[activeValue].map((profileId) => (
                                    <FriendAvatar key={profileId} id={profileId} />
                                ))
                            }
                        </Stack>
                    </Stack>
                    </Container>
                </Paper>
                // </Grow>
            }
            <div style={{ padding: "1rem 16px" }}>
                <Slider
                    {...sliderProps}
                    size="small"
                    valueLabelDisplay="on"
                    valueLabelFormat={(value, index) =>
                    (
                        Object.keys(answerToProfiles).includes(value.toString()) && (
                            answerToProfiles[value].length > 1
                                ?
                                <GroupAnswerSliderValueLabel profileIds={answerToProfiles[value]} isActive={value === activeValue} onClick={handleAvatarGroupClick((value === activeValue) ? false : value)} />
                                :
                                <FriendAvatar id={answerToProfiles[value][0]} onClick={handleAvatarGroupClick(false)} />
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