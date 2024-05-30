import { ListItemAvatar, ListItemText, Stack, useTheme } from "@mui/material";
import { m } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import FriendAvatar from "~/components/Avatar/FriendAvatar";
import LabeledAvatar from "~/components/Avatar/LabeledAvatar";
import { MotionList } from "~/motion/components/MotionList";
import { MotionListItem } from "~/motion/components/MotionListItem";
import LazyDomAnimation from "~/motion/LazyDomAnimation";
import { VARIANTS_FADEIN_FROMBOTTOM, VARIANTS_STAGGER_CHILDREN } from "~/motion/props";
import { useStrings } from "~/texts";

function ConflictSample() {

    /* constants */
    const { palette } = useTheme();

    const scheduleChemistryText = "%해린% 님, %민지% 님, %하니% 님은 일정에 대한 욕심을 덜어보는 건 어떨까요?."
    const scheduleChemistryTextList = scheduleChemistryText.split(/(%\S*%)/)

    const scheduleAnswerToProfiles = {
        1: {
            label: "아주 널널하게",
            profileList: [
                {
                    characterId: "SLOTH",
                    nickname: "혜인"
                },
                {
                    characterId: "SLOTH",
                    nickname: "다니엘"
                }
            ]
        },
        4: {
            label: "알차게",
            profileList: [
                {
                    characterId: "RACOON",
                    nickname: "민지"
                },
                {
                    characterId: "PANDA",
                    nickname: "하니"
                }
            ]
        },
        5: {
            label: "매우 알차게",
            profileList: [
                {
                    characterId: "BEE",
                    nickname: "해린"
                }
            ]
        },
    }

    return (
        <LazyDomAnimation>
            <div className="block__body">
                <MotionList initial={"hidden"} whileInView={"visible"} variants={VARIANTS_STAGGER_CHILDREN} disablePadding custom={{ staggerChildren: 0.1 }}>
                    {Object.entries(scheduleAnswerToProfiles).map(([value, { label, profileList }]) => (
                        <MotionListItem variants={VARIANTS_FADEIN_FROMBOTTOM} key={value} disableGutters dense>
                            {
                                (value === "4") && <div style={{ position: 'absolute', backgroundColor: palette.primary.light, opacity: 0.5, width: '100%', height: '100%' }} className="block--round" />}
                            <ListItemAvatar style={{ width: "100px", zIndex: 1 }} className="block--centered">
                                <p className="typography-label">{label}</p>
                            </ListItemAvatar>
                            <ListItemText primary={
                                <Stack>
                                    <Stack spacing={0.5}>
                                        {
                                            profileList.map(({ characterId, nickname }) => (
                                                <LabeledAvatar key={nickname} characterId={characterId} nickname={nickname} />
                                            ))
                                        }
                                    </Stack>
                                </Stack>
                            } sx={{ marginLeft: "16px", zIndex: 1 }} />
                        </MotionListItem>
                    )).reverse()
                    }
                    <m.div className="block__body" variants={VARIANTS_FADEIN_FROMBOTTOM}>
                        <p style={{ fontSize: "16px", lineHeight: '1.7rem' }}>
                            {
                                scheduleChemistryTextList.map((t, index) =>
                                    t[0] === "%"
                                        ? <b key={index}>{t.replaceAll('%', '')}</b>
                                        : <Fragment key={index}>{t}</Fragment>
                                )
                            }
                        </p>
                    </m.div>
                </MotionList>
            </div>
        </LazyDomAnimation>
    );
}
export default ConflictSample;