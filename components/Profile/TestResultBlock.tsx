
import { Container, Divider, Icon, Paper, Stack } from "@mui/material";
import { useState } from "react";
import { ACTIVITY_TAGS, CHARACTERS, EXPECTATION_TAGS, TRIP_TAGS } from "~/common/app-const";
import { ActivityTag } from "~/interfaces/enums/ActivityTag";
import { ExpectationTag } from "~/interfaces/enums/ExpectationTag";
import { TripTag } from "~/interfaces/enums/TripTag";
import { useAppSelector } from "~/store";
import { WithProfileProps } from "../../hocs/withUserProfile";
import FriendAvatar from "../Avatar/FriendAvatar";
import { ActivityTagChip, ExpectationTagChip, TripTagChip } from "../Chip/TagChip";
import PngIcon from "../PngIcon";
import { createSelector } from "@reduxjs/toolkit";

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
    WAITING: [TripTag.EAT],
    BAR: [TripTag.EAT],
    CAFE: [TripTag.EAT, TripTag.COFFEE],
    SHOPPING: [],
    SHOW: [TripTag.CULTURE],
}

interface TestResultBlockProps extends WithProfileProps { };

function TestResultBlock({ id, nickname, testResult }: TestResultBlockProps) {

    const [selectedTag, setSelectedTag] = useState<number>();
    const character = CHARACTERS[testResult.characterId]

    const handleTripTagClick = (tag: number) => () => {
        setSelectedTag((selectedTag === tag) ? undefined : tag)
    }

    const getHashTags = (toTripTagMap: { [k: string]: number[] }, tags: { [k: string]: number }) => Object.entries(toTripTagMap).filter(([k, v]) => v.includes(selectedTag)).map(([k, v]) => tags[k])

    const expectationTags = getHashTags(expectationToTripTagMap, ExpectationTag)
    const activityTags = getHashTags(activityToTripTagMap, ActivityTag)

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
        <div className="content content--sparse">
            <div className="content">
                <div>
                    <p>{character.prefix}</p>
                    <h2 className="typography-title">{character.name}</h2>
                </div>
                {
                    character.body.split("\n").map((text) =>
                        <p className="typography-article" key={text}>{text}</p>
                    )
                }
            </div>
            <div className="content">
                <h2 className="section-title--sm">{`${nickname} 님의 여행 태그`}</h2>
                {
                    <Stack display={"flex"} useFlexGap flexWrap={"wrap"} rowGap={1} >
                        {
                            testResult.tripTagList.map((tag) =>
                                <TripTagChip
                                    key={tag}
                                    tagId={tag}
                                    variant={(selectedTag === tag) ? "filled" : "outlined"}
                                    onClick={handleTripTagClick(tag)}
                                />
                            )
                        }
                    </Stack>
                }
                {
                    (selectedTag !== undefined)
                    &&
                    <Paper sx={{ backgroundColor: "gray.main" }} >
                        <Container className="content">
                        <Stack>
                            <Icon>{TRIP_TAGS[selectedTag].icon}</Icon>
                            <p>{TRIP_TAGS[selectedTag].label}</p>
                        </Stack>
                        {
                            (Object.keys(TripTag)[selectedTag] === "DEFAULT")
                                ? <p className="typography-note">기본 태그</p>
                                :
                                <>
                                    <Divider />
                                    {
                                        (expectationTags.length > 0) &&
                                        <Stack display={"flex"} useFlexGap flexWrap={"wrap"} rowGap={2} >
                                            <PngIcon name="expectation" />
                                            {
                                                expectationTags.map((tag) =>
                                                    <p># {EXPECTATION_TAGS[tag].label}</p>
                                                    // <ExpectationTagChip key={tag} tagId={tag} sx={{ backgroundColor: "transparent" }} />
                                                )
                                            }
                                        </Stack>
                                    }
                                    {
                                        (activityTags.length > 0) &&
                                        <Stack display={"flex"} useFlexGap flexWrap={"wrap"} rowGap={2} >
                                            <PngIcon name="activity" />
                                            {
                                                activityTags.map((tag) =>
                                                    <p># {ACTIVITY_TAGS[tag].label}</p>
                                                    // <ActivityTagChip key={tag} tagId={tag} sx={{ backgroundColor: "transparent" }} />
                                                )
                                            }
                                        </Stack>
                                    }
                                    {
                                        isChemistryDefined &&
                                        <Stack>
                                            <PngIcon name="raiseHand" />
                                            {
                                                (friendsWithSelectedTag.length > 0) ?
                                                    friendsWithSelectedTag.map((id) =>
                                                        <FriendAvatar key={id} id={id} />
                                                    )
                                                    :
                                                    <p className="typography-note">같은 태그의 친구가 없어요.</p>
                                            }
                                        </Stack>
                                    }
                                </>
                        }
                        </Container>
                    </Paper>
                }
            </div>
        </div>
    );
}

export default TestResultBlock;
