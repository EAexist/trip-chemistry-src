import { Stack, ToggleButton } from "@mui/material";
import { m, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import LabeledAvatar from "~/components/Avatar/LabeledAvatar";
import { ProfileImage } from "~/components/Profile/ProfileImage";
import { ITripCharacter } from "~/interfaces/ITripCharacter";
import LazyDomAnimation from "~/motion/LazyDomAnimation";
import { FADEIN } from "~/motion/props";

function CharacterSample() {

    /* constants */
    const profileList = [
        {
            id: "나무늘보",
            nickname: "혜인",
            tripCharacter: {
                id: "SLOTH",
                name: "느긋한 나무늘보"
            }
        },
        {
            id: "나무늘보",
            nickname: "다니엘",
            tripCharacter: {
                id: "SLOTH",
                name: "느긋한 나무늘보"
            }
        },
        {
            id: "꿀벌",
            nickname: "민지",
            tripCharacter: {
                id: "BEE",
                name: "부지런한 꿀벌"
            }
        },
        {
            id: "너구리",
            nickname: "민지",
            tripCharacter: {
                id: "RACOON",
                name: "도시의 너구리"
            }
        },
        {
            id: "판다",
            nickname: "하니",
            tripCharacter: {
                id: "PANDA",
                name: "미식가 판다"
            }
        },
    ]

    /* States */
    const [userIndex, setUserIndex] = useState<number>(1);
    const profile = profileList[userIndex];

    /* Side Effects */

    // Infinitely loop userIndex from 2 ~ 5 
    const userIndexSwitchInterval = 2000;
    useEffect(()=>{
        setInterval(()=>{
            setUserIndex((prev) => ( prev === 4 ) ? 1 : prev + 1 )
        }, userIndexSwitchInterval)
    }, []) 

    /* Rendering List */
    const UserToggleButtonList = profileList.map(({ id, tripCharacter, nickname }, index) => (
        <ToggleButton
            key={id}
            value={index}
            onChange={(_, value) => setUserIndex(value)}
            selected={userIndex === index}
            className="toggle-button--button-base"
        >
            <LabeledAvatar characterId={tripCharacter.id} nickname={nickname} labelSize="large" />
        </ToggleButton>
    ))

    return (
        <LazyDomAnimation>
            <Stack spacing={-0.25} justifyContent={'center'} alignItems={'start'}>
                {UserToggleButtonList}
            </Stack>
            <AnimatePresence mode={"wait"} initial={false}>
                <m.div key={userIndex} {...{ ...FADEIN, exit: "hidden" }} className="navigation-button__container">
                    <ProfileImage key={userIndex} id={profile.id} nickname={profile.nickname} testResult={{ tripCharacter: profile.tripCharacter as ITripCharacter, tripTagList: [] }} />
                </m.div>
            </AnimatePresence>
        </LazyDomAnimation>
    );
}
export default CharacterSample;