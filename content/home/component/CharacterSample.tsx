import { Stack, ToggleButton } from "@mui/material";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { ICharacterId } from "~/common/app-const";
import ProfileAvatar from "~/components/Avatar/ProfileAvatar";
import { ProfileImage } from "~/components/Profile/ProfileImage";
import LazyDomAnimation from "~/motion/LazyDomAnimation";
import { FADEIN } from "~/motion/props";

function CharacterSample() {

    /* constants */
    const profiles = [
        {
            id: "나무늘보",
            nickname: "혜인",
            character: {
                id: "SLOTH",
                name: "느긋한 나무늘보"
            }
        },
        {
            id: "나무늘보",
            nickname: "다니엘",
            character: {
                id: "sloth",
                name: "느긋한 나무늘보"
            }
        },
        {
            id: "꿀벌",
            nickname: "민지",
            character: {
                id: "bee",
                name: "부지런한 꿀벌"
            }
        },
        {
            id: "너구리",
            nickname: "민지",
            character: {
                id: "racoon",
                name: "도시의 너구리"
            }
        },
        {
            id: "판다",
            nickname: "하니",
            character: {
                id: "panda",
                name: "미식가 판다"
            }
        },
    ]

    /* States */
    const [userIndex, setUserIndex] = useState<number>(1);
    const profile = profiles[userIndex];

    /* Side Effects */

    const userIndexSwitchInterval = 2000;

    // Infinitely loop userIndex from 2 ~ 5
    useEffect(() => { 
        setInterval(() => {
            setUserIndex((prev) => (prev === 4) ? 1 : prev + 1)
        }, userIndexSwitchInterval)
    }, [])

    return (
        <LazyDomAnimation>
            <Stack spacing={-0.25} justifyContent={'center'} alignItems={'start'}>
                {
                    profiles.map(({ id, character, nickname }, index) => (
                        <ToggleButton
                            key={index}
                            value={index}
                            onChange={(_, value) => setUserIndex(value)}
                            selected={userIndex === index}
                        >
                            <ProfileAvatar avatarId={character.id} nickname={nickname} labelSize="large" />
                        </ToggleButton>
                    ))
                }
            </Stack>
            <AnimatePresence mode={"wait"} initial={false}>
                <m.div key={userIndex} {...{ ...FADEIN, exit: "hidden" }} className="navigation-button__container">
                    <ProfileImage id={profile.id} nickname={profile.nickname} testResult={{ characterId: profile.character.id as ICharacterId, tripTagList: [] }} />
                </m.div>
            </AnimatePresence>
        </LazyDomAnimation>
    );
}
export default CharacterSample;