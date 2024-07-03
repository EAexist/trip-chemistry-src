
import { Container, Divider, Icon, ListItemAvatar, ListItemText, Paper, Stack } from "@mui/material";
import { useState } from "react";
import { CHARACTERS, CITIES, HASHTAGS, TRIP_TAGS } from "~/common/app-const";
import { ActivityTag } from "~/interfaces/enums/ActivityTag";
import { ExpectationTag } from "~/interfaces/enums/ExpectationTag";
import { TripTag } from "~/interfaces/enums/TripTag";
import { useAppSelector } from "~/store";
import { WithProfileProps } from "../../hocs/withUserProfile";
import FriendAvatar from "../Avatar/FriendAvatar";
import { ActivityTagChip, ExpectationTagChip, TripTagChip } from "../Chip/TagChip";
import PngIcon from "../PngIcon";
import { createSelector } from "@reduxjs/toolkit";
import { MotionList } from "~/motion/components/MotionList";
import { VARIANTS_STAGGER_CHILDREN } from "~/motion/props";
import { MotionListItemButton } from "~/motion/components/MotionListItemButton";
import { NavigateNext } from "@mui/icons-material";
import { useStrings } from "~/texts";
import useNavigateWithGuestContext from "~/hooks/useNavigateWithGuestContext";
import getImgSrc from "~/utils/getImgSrc";

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

interface CharacterResultContentProps extends WithProfileProps { };

function CharacterResultContent({ testResult }: CharacterResultContentProps) {

    const character = CHARACTERS[testResult.characterId]

    /* City */
    return (
        <div className="content">
            <Stack>
            <div className="block--centered">
                <img
                    src={getImgSrc('/character', testResult.characterId, { size: "large" })}
                    alt={testResult.characterId}
                    className="title-image"
                    style={{ margin: "0px -16px" }}
                />
            </div>
            <div>
                <p>{character.prefix}</p>
                <h2 className="typography-title">{character.name}</h2>
            </div>
            </Stack>
            {
                character.body.split("\n").map((text) =>
                    <p className="typography-article" key={text}>{text}</p>
                )
            }
        </div>
    );
}

export default CharacterResultContent;
