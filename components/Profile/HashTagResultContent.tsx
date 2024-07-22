import { useEffect, useState } from "react";

import { Avatar, Box, Stack } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";

import { HASHTAGS } from "../../common/app-const";
import { WithProfileProps } from "../../hocs/withUserProfile";
import { ActivityTag } from "../../interfaces/enums/ActivityTag";
import { ExpectationTag } from "../../interfaces/enums/ExpectationTag";
import { TripTag } from "../../interfaces/enums/TripTag";
import { useAppSelector } from "../../store";
import FriendAvatar from "../Avatar/FriendAvatar";
import { TripTagChip } from "../Chip/TagChip";

import { AnimatePresence, m } from "framer-motion";
import { FADEIN } from "../../motion/props";

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
    const [showInstruction, setShowInstruction] = useState(true);

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

    const tagToNumber = useAppSelector(
        createSelector(
            state => state.chemistry?.data.profileIds,
            state => state.chemistry?.data.profiles,
            (profileIds, profiles) =>
                Object.values(TripTag).map(tag =>
                    profileIds?.filter(profileId =>
                        profiles[profileId].testResult?.tripTagList.includes(tag)
                    ).length
                )
        )
    )

    useEffect(() => {
        setDelayedSelectedTag(selectedTag)
    }, [selectedTag])

    useEffect(() => {
        if (showInstruction && (selectedTag !== undefined)) {
            setShowInstruction(false)
        }
    }, [selectedTag !== undefined, showInstruction])

    return (
        <div className="content">
            <div>
                {/* {
                    showInstruction
                    &&
                    <Stack className="typography-note--lg" justifyContent={"center"} marginBottom={"16px"}>
                        <Info sx={{ fontSize: "14px" }} />
                        <p>태그를 터치해보세요</p>
                    </Stack>
                } */}
                {
                    <Stack display={"flex"} useFlexGap flexWrap={"wrap"} rowGap={1} justifyContent={"center"}>
                        {
                            [...testResult.tripTagList].sort((a, b) => (tagToNumber[b] - tagToNumber[a]))
                                .map((tag) =>
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
                                            endIcon={
                                                // <Badge badgeContent={`+${tagToNumber[tag] - 1}`} sx={{ '& .MuiBadge-badge': { color: "primary.main", fontWeight: 700 } }} invisible={tagToNumber[tag] < 2}>
                                                // <Badge badgeContent={`${tagToNumber[tag] - 1}`} color="primary" invisible={tagToNumber[tag] < 2}>
                                                //     <Avatar sx={{ height: "28px", width: "28px" }}/>
                                                // </Badge>
                                                // tag === TripTag.DEFAULT 
                                                // ?
                                                // <AvatarGroup spacing="small">
                                                //     <Avatar sx={{ height: "24px", width: "24px" }}/>
                                                //     <Avatar sx={{ height: "24px", width: "24px" }}/>
                                                //     <Avatar sx={{ height: "24px", width: "24px" }}/>
                                                // </AvatarGroup>
                                                // :
                                                (tagToNumber[tag] >= 2) ?
                                                    <Avatar sx={{ height: "24px", width: "24px", fontSize: "12px" }}>
                                                        {`+${tagToNumber[tag] - 1}`}
                                                    </Avatar>
                                                    : undefined
                                            }
                                            sx={{
                                                overflow: "visible",
                                                fontWeight: 700
                                            }}
                                        />
                                    </m.div>
                                )
                        }
                        {
                            (delayedSelectedTag !== undefined)
                            &&
                            <m.div layoutId={delayedSelectedTag?.toString()} style={{ paddingTop: "8px", paddingLeft: "8px", paddingRight: "8px", scale: 1.1 }}>
                                <TripTagChip
                                    tagId={delayedSelectedTag}
                                    variant={"filled"}
                                    color={"primary"}
                                    onClick={() => setSelectedTag(undefined)}
                                // sx={{ padding: "1.2rem 16px", '& .MuiChip-label': { fontSize: "16px" } }}
                                />
                            </m.div>
                        }
                    </Stack>
                }
            </div>
            <AnimatePresence mode={"wait"} initial={false}>
                {
                    (delayedSelectedTag !== undefined)
                    &&
                    <m.div key={delayedSelectedTag} className="typography-note--lg content"  {...{ ...FADEIN, exit: "hidden" }}>
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
                        {
                            (Object.keys(TripTag)[delayedSelectedTag] === "DEFAULT")
                                ?
                                <div>
                                    <Box sx={{ backgroundColor: "gray.main", padding: "0px 4px", width: "fit-content" }}>
                                        <p className="typography-note"># 기본 태그</p>
                                    </Box>
                                </div>
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
                                </>
                        }
                    </m.div>
                }
            </AnimatePresence>
        </div>
    );
}

export default HashTagResultContent;
