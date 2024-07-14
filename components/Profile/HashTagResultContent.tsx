
import { Avatar, Box, Container, Divider, Icon, List, ListItem, ListItemAvatar, ListItemText, Stack, Zoom } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { Fragment, useState } from "react";
import { HASHTAGS, TRIP_TAGS } from "~/common/app-const";
import { ActivityTag } from "~/interfaces/enums/ActivityTag";
import { ExpectationTag } from "~/interfaces/enums/ExpectationTag";
import { TripTag } from "~/interfaces/enums/TripTag";
import { useAppSelector } from "~/store";
import { WithProfileProps } from "../../hocs/withUserProfile";
import FriendAvatar from "../Avatar/FriendAvatar";
import { TripTagChip } from "../Chip/TagChip";
import ImageIcon from "../ImageIcon";
import { Group, Snowboarding, Textsms } from "@mui/icons-material";

const expectationToTripTagMap = {
    HEAL: [TripTag.REST],
    COMPACT: [TripTag.PASSION],
    FULLFILL: [TripTag.PASSION],
    MEMORY: [TripTag.FRIENDSHIP],
    RELAX: [TripTag.REST, TripTag.REFRESH],
    COMFORT: [TripTag.REST],
    ADVENTURE: [TripTag.ADVENTURE],
    NEW: [TripTag.ADVENTURE, TripTag.PASSION],
    DIGITAL_DETOX: [TripTag.REFRESH],
    REST: [TripTag.REST],
    VIEW: [TripTag.ADVENTURE],
    FRIENDSHIP: [TripTag.FRIENDSHIP],
}
const activityToTripTagMap = {
    PHOTO: [TripTag.PHOTO],
    INSTA: [TripTag.PHOTO, TripTag.INFLUENCER],
    NETWORK: [TripTag.FRIENDSHIP, TripTag.ADVENTURE, TripTag.PASSION],
    EXTREME: [TripTag.PHYSICAL],
    SWIM: [TripTag.PHYSICAL],
    DRIVE: [TripTag.ADVENTURE, TripTag.REFRESH],
    WALK: [TripTag.REFRESH],
    THEMEPARK: [TripTag.CULTURE],
    MARKET: [TripTag.ADVENTURE],
    HOTEL: [TripTag.REST],
    VLOG: [TripTag.INFLUENCER],
    EAT: [TripTag.EAT],
    BAR: [TripTag.EAT],
    CAFE: [TripTag.EAT, TripTag.COFFEE],
    SHOPPING: [],
    SHOW: [TripTag.CULTURE],
}

interface HashTagResultContentProps extends WithProfileProps { };

function HashTagResultContent({ id, nickname, testResult }: HashTagResultContentProps) {

    const [selectedTag, setSelectedTag] = useState<number>();

    const handleTripTagClick = (tag: number) => () => {
        setSelectedTag((selectedTag === tag) ? undefined : tag)
    }
    const getHashTags = (toTripTagMap: { [k: string]: number[] }, tags: { [k: string]: number }) => Object.entries(toTripTagMap).filter(([k, v]) => v.includes(selectedTag)).map(([k, v]) => tags[k])

    const sourceExpectationTags = getHashTags(expectationToTripTagMap, ExpectationTag)
    const sourceActivityTags = getHashTags(activityToTripTagMap, ActivityTag)

    const isChemistryDefined = useAppSelector((state) => state.chemistry !== undefined)

    const friendsWithSelectedTag = useAppSelector(
        createSelector(
            state => state.chemistry?.data.profileIds,
            state => state.chemistry?.data.profiles,
            (profileIds, profiles) => profileIds?.filter(profileId =>
                (profileId !== id) &&
                profiles[profileId].testResult?.tripTagList.includes(selectedTag)
            )
        )
    )

    return (
        <div className="content">
            {
                <Stack display={"flex"} useFlexGap flexWrap={"wrap"} rowGap={1} justifyContent={"center"} padding={"16px 0px"}>
                    {
                        testResult.tripTagList.map((tag) =>
                            // (selectedTag !== tag) &&
                            <TripTagChip
                                key={tag}
                                tagId={tag}
                                variant={(selectedTag === tag) ? "filled" : "outlined"}
                                // color={(selectedTag === tag) ? "primary" : "default"}
                                color={"primary"}
                                onClick={handleTripTagClick(tag)}
                            />
                        )
                    }
                </Stack>
            }
            {
                (selectedTag !== undefined)
                &&
                <div>
                    {
                        (Object.keys(TripTag)[selectedTag] === "DEFAULT")
                            ? <p>기본 태그</p>
                            :
                            <>
                                <p>어떻게 얻었을까?</p>
                                <List>
                                    {
                                        (sourceExpectationTags.length > 0) &&
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <Textsms />
                                                </Avatar>
                                                {/* <ImageIcon name="expectation" /> */}
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    sourceExpectationTags.map((tag) =>
                                                        <Fragment key={tag}># {HASHTAGS.expectation[tag].label}{"\xa0\xa0\xa0"}</Fragment>
                                                        // <ExpectationTagChip key={tag} tagId={tag} sx={{ backgroundColor: "transparent" }} />
                                                    )
                                                }
                                                sx={{ '& .MuiTypography-root': { fontSize: "12px" } }}
                                            />
                                        </ListItem>
                                    }
                                    {
                                        (sourceActivityTags.length > 0) &&
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <Snowboarding />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    sourceActivityTags.map((tag) =>
                                                        <Fragment key={tag}># {HASHTAGS.activity[tag].label}{"\xa0\xa0\xa0"}</Fragment>
                                                        // <ActivityTagChip key={tag} tagId={tag} sx={{ backgroundColor: "transparent" }} />
                                                    )
                                                }
                                                sx={{ '& .MuiTypography-root': { fontSize: "12px" } }}
                                            />
                                        </ListItem>
                                    }
                                </List>
                                {
                                    isChemistryDefined && (friendsWithSelectedTag.length > 0) &&
                                    <>
                                        <p>같은 태그의 친구</p>
                                        <List>
                                        <ListItem sx={{ alignItems: "start" }}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <Group />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <Stack>
                                                {
                                                    friendsWithSelectedTag.map((id) =>
                                                        <FriendAvatar key={id} id={id} />
                                                    )
                                                }
                                            </Stack>
                                        </ListItem>
                                        </List>
                                    </>
                                }
                            </>
                    }
                </div>
            }
        </div>
    );
}

export default HashTagResultContent;
