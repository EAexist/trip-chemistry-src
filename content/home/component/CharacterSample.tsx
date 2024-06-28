import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { AnimatePresence, m } from "framer-motion";

import ProfileAvatar from "~/components/Avatar/ProfileAvatar";
import LazyImage from "~/components/LazyImage";
import { FADEIN } from "~/motion/props";
import getImgSrc from "~/utils/getImgSrc";
import ToggleButton from "../../../components/Button/ToggleButton";

function CharacterSample() {

    /* constants */
    const profiles = [
        {
            id: "hyein",
            nickname: "혜인",
            character: {
                id: "user",
                name: "사용자"
            }
        },
        {
            id: "danielle",
            nickname: "다니엘",
            character: {
                id: "sloth",
                name: "느긋한 나무늘보"
            }
        },
        {
            id: "minji",
            nickname: "민지",
            character: {
                id: "bee",
                name: "부지런한 꿀벌"
            }
        },
        {
            id: "haerin",
            nickname: "해린",
            character: {
                id: "racoon",
                name: "도시의 너구리"
            }
        },
        {
            id: "hanni",
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
        <div className="content content--sparse">
            <Stack spacing={0} justifyContent={'center'}>
                {
                    profiles.map(({ id, character, nickname }, index) => (
                        <ToggleButton
                            key={id}
                            value={id}
                            selected={userIndex === index}
                            disabled={userIndex !== index}
                        >
                            <ProfileAvatar avatarId={character.id} nickname={nickname} labelSize="large" />
                        </ToggleButton>
                    ))
                }
            </Stack>
            <div className="block--centered">
                <AnimatePresence mode={"wait"}>
                    <m.div key={userIndex} {...FADEIN}>
                        <LazyImage
                            alt={profile.character.id}
                            src={getImgSrc('/character', profile.character.id, { size: "large" })}
                            width={"196px"}
                            height={"196px"}
                        />
                        <p className="typography-highlight">{profile.character.name}</p>
                    </m.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
export default CharacterSample;