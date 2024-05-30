/* React */
import { Fragment, useEffect } from "react";

/* Externals */
import { m } from "framer-motion";
import { useSelector } from "react-redux";

import { Stack } from "@mui/material";

/* App */
import { useStrings } from "../../texts";

import ProfileImage from "../../components/Profile/ProfileImage";
import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import { FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { filterProfile, useChemistry, useProfileIdList } from "../../reducers/chemistryReducer";
import { RootState } from "../../store";

function LeadershipChemistryContent() {

    /* Constants */
    const strings = useStrings().public.contents.chemistry;

    /* States */

    /* Reducers */
    const answeredProfileIdList = useProfileIdList();

    const chemistry = useChemistry();

    const profileList = Object.values(useSelector((state: RootState) => state.chemistry.data.profileList))
    const leaderDataList = filterProfile(profileList, chemistry?.leaderList, "nickname");
    const follwerDataList = filterProfile(profileList, answeredProfileIdList.filter(id => !chemistry?.leaderList.includes(id)), "nickname");
    const leadershipAnswerToProfileList = useValueToProfileIdList("leadership");

    return (
        <>
            <m.h2 {...FADEIN_FROMBOTTOM_VIEWPORT} className="typography-heading">{strings.sections.leadership.title}</m.h2>
            <div className="block__body">
                <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} >
                    <Stack display={'flex'} justifyContent={'center'}>
                        {
                            Object.keys(Object.values(leadershipAnswerToProfileList)).length > 0 &&
                            Object.values(leadershipAnswerToProfileList).reverse()[0].map((id) =>
                                <ProfileImage key={id} id={id} showCharacterLabel={false} />
                            )
                        }
                    </Stack>
                </m.div>
                {/* <Stack flexWrap={"wrap"} spacing={4} justifyContent={"center"}>
                            {
                                Object.keys(Object.values(leadershipAnswerToProfileList)).length > 1 &&
                                Object.entries(leadershipAnswerToProfileList).reverse().slice(1).map(([value, idList], index) => (
                                    <Stack key={value} sx={{ flexWrap: "wrap" }}>
                                        <p className="typography-note">{testStrings.test.leadership.answers[Number(value) as keyof typeof testStrings.test.leadership.answers].label}</p>
                                        <Stack spacing={0.5}>
                                            {
                                                idList.map((id) => (
                                                    <FriendAvatar key={id} id={id} />
                                                ))
                                            }
                                        </Stack>
                                    </Stack>
                                ))
                            }
                        </Stack> */}
                <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="block__body">
                    <p>
                        {strings.sections.leadership.body.map((string: string | undefined, index) => (
                            string === "/idList"
                                ? chemistry && leaderDataList.map((nickname, index) =>
                                    <Fragment key={nickname as string}>
                                        {index > 0 && ", "}
                                        <b>{` ${nickname} `}</b>
                                        {strings.sections.leadership.idPostfix}
                                    </Fragment>
                                )
                                : <Fragment key={index}>{string}</Fragment>
                        ))}
                    </p>
                    {
                        (follwerDataList.length > 0) &&
                        <p>
                            {strings.sections.leadership.detail.map((string: string | undefined, index) => (
                                string === "/idList"
                                    ? chemistry && follwerDataList.map((nickname: string, index) =>
                                        <Fragment key={index}>
                                            {index > 0 && ", "}
                                            <b>{` ${nickname} `}</b>
                                            {strings.sections.leadership.idPostfix}
                                        </Fragment>
                                    )
                                    : <Fragment key={index}>{string}</Fragment>
                            ))}
                        </p>
                    }
                </m.div>
            </div>
        </>
    );
}
export default LeadershipChemistryContent;