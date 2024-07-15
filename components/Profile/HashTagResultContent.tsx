
import { Avatar, Box, Container, Divider, Icon, List, ListItem, ListItemAvatar, ListItemText, Stack, Zoom } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { Fragment, useEffect, useState } from "react";
import { HASHTAGS, TRIP_TAGS } from "~/common/app-const";
import { ActivityTag } from "~/interfaces/enums/ActivityTag";
import { ExpectationTag } from "~/interfaces/enums/ExpectationTag";
import { TripTag } from "~/interfaces/enums/TripTag";
import { useAppSelector } from "~/store";
import { WithProfileProps } from "../../hocs/withUserProfile";
import FriendAvatar from "../Avatar/FriendAvatar";
import { TripTagChip } from "../Chip/TagChip";
import ImageIcon from "../ImageIcon";
import { Group, Info, Snowboarding, Textsms } from "@mui/icons-material";

import { AnimatePresence, m } from "framer-motion"
import { FADEIN } from "~/motion/props";

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
    const [delayedSelectedTag, setDelayedSelectedTag] = useState<number>();

    const handleTripTagClick = (tag: number) => () => {
        setDelayedSelectedTag(undefined)
        setSelectedTag(tag)
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

    useEffect(() => {
        setDelayedSelectedTag(selectedTag)
    }, [selectedTag])

    return (
        <div className="content">
            <div>
                {
                    (delayedSelectedTag === undefined)
                    &&
                    <Stack className="typography-note--lg" justifyContent={"center"}>
                        <Info sx={{ fontSize: "14px" }} />
                        <p>태그를 터치해보세요</p>
                    </Stack>
                }
                {
                    <Stack display={"flex"} useFlexGap flexWrap={"wrap"} rowGap={1} justifyContent={"center"} padding={"16px 0px"}>
                        {
                            testResult.tripTagList.map((tag) =>
                                (delayedSelectedTag !== tag) &&
                                <m.div layoutId={tag.toString()}>
                                    <TripTagChip
                                        key={tag}
                                        tagId={tag}
                                        // variant={(selectedTag === tag) ? "filled" : "outlined"}
                                        variant={"outlined"}
                                        // color={(selectedTag === tag) ? "primary" : "default"}
                                        color={"primary"}
                                        onClick={handleTripTagClick(tag)}
                                    />
                                </m.div>
                            )
                        }
                        {
                            (delayedSelectedTag !== undefined)
                            &&
                            <m.div layoutId={delayedSelectedTag?.toString()} style={{ marginTop: "16px", scale: 1.2 }}>
                                <TripTagChip
                                    tagId={delayedSelectedTag}
                                    variant={"filled"}
                                    color={"primary"}
                                    onClick={() => setSelectedTag(undefined)}
                                />
                            </m.div>
                        }
                    </Stack>
                }
            </div>
            {
                (delayedSelectedTag !== undefined)
                &&
                <div className="typography-note--lg content">
                    {
                        (Object.keys(TripTag)[delayedSelectedTag] === "DEFAULT")
                            ? <p>기본 태그</p>
                            :
                            <>
                                {
                                    (sourceExpectationTags.length > 0) &&
                                    <div>
                                        <h3 style={{ marginBottom: "8px" }}>여행 테마</h3>
                                        <Stack>
                                            {
                                                sourceExpectationTags.map((tag) =>
                                                    <Box sx={{ backgroundColor: "gray.main", padding: "0px 4px" }}>
                                                        <p className="typography-note" key={tag}># {HASHTAGS.expectation[tag].label}</p>
                                                    </Box>
                                                )
                                            }
                                        </Stack>
                                    </div>
                                }
                                {
                                    (sourceActivityTags.length > 0) &&
                                    <div>
                                        <h3 style={{ marginBottom: "8px" }}>액티비티</h3>
                                        <Stack>
                                            {
                                                sourceActivityTags.map((tag) =>
                                                    <Box sx={{ backgroundColor: "gray.main", padding: "0px 4px" }}>
                                                        <p className="typography-note" key={tag}># {HASHTAGS.activity[tag].label}</p>
                                                    </Box>
                                                )
                                            }
                                        </Stack>
                                    </div>
                                }
                                {
                                    isChemistryDefined && (friendsWithSelectedTag.length > 0) &&
                                    <div>
                                        <h3 style={{ marginBottom: "8px" }}>같은 태그의 친구</h3>
                                        <Stack>
                                            {
                                                friendsWithSelectedTag.map((id) =>
                                                    <FriendAvatar key={id} id={id} />
                                                )
                                            }
                                        </Stack>
                                    </div>
                                }
                            </>
                    }
                </div>
            }
        </div>
    );
}

export default HashTagResultContent;
