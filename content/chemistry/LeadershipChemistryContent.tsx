/* React */
import { Fragment, useEffect } from "react";

/* Externals */
import { m } from "framer-motion";
import { useSelector } from "react-redux";

import { List, ListItemAvatar, ListItemText, Stack } from "@mui/material";

/* App */
import { useStrings } from "../../texts";

import ProfileImage from "../../components/Profile/ProfileImage";
import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import { FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { filterProfile, useChemistry, useProfileIdList } from "../../reducers/chemistryReducer";
import { RootState } from "../../store";
import { MotionListItem } from "~/motion/components/MotionListItem";
import FriendAvatar from "~/components/Avatar/FriendAvatar";

function LeadershipChemistryContent() {

    /* Constants */
    const strings = useStrings().public.contents.chemistry;
    const optionStrings = Object(useStrings().public.contents.test.test.leadership.options);

    /* States */

    /* Reducers */
    // const answeredProfileIdList = useProfileIdList();

    // const chemistry = useChemistry();

    // const profileList = Object.values(useSelector((state: RootState) => state.chemistry.data.profileList))
    // const leaderDataList = filterProfile(profileList, chemistry?.leaderList, "nickname");
    // const follwerDataList = filterProfile(profileList, answeredProfileIdList.filter(id => !chemistry?.leaderList.includes(id)), "nickname");
    const leadershipAnswerToProfileList = useValueToProfileIdList("leadership");

    return (
        <div className="content">
            <m.h2 {...FADEIN_FROMBOTTOM_VIEWPORT} className="typography-heading">{strings.sections.leadership.title}</m.h2>
            <div className="block--with-padding-x--small">
            <List>
                {
                    (Object.values(optionStrings) as { label: string, value: number }[]).map(({ label, value }) => (
                        <MotionListItem key={label} {...FADEIN_FROMBOTTOM_VIEWPORT} disableGutters dense >
                            <ListItemAvatar style={{ width: "100px", zIndex: 1 }} className="block--centered">
                                <p className={Object.keys(leadershipAnswerToProfileList).includes(String(value)) ? "" : "disabled"}>{label}</p>
                            </ListItemAvatar>
                            <ListItemText primary={
                                <Stack>
                                    <Stack spacing={0.5}>
                                        {
                                            (Object.keys(leadershipAnswerToProfileList).includes(String(value)) ? leadershipAnswerToProfileList[value] : []).map((id) => (
                                                <FriendAvatar key={id} id={id} />
                                            ))
                                        }
                                    </Stack>
                                </Stack>
                            } sx={{ marginLeft: "16px", zIndex: 1 }} />
                        </MotionListItem>
                    )).reverse()
                }
            </List>
            {/* <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} >
                    <Stack display={'flex'} justifyContent={'center'}>
                        {
                            Object.keys(Object.values(leadershipAnswerToProfileList)).length > 0 &&
                            Object.values(leadershipAnswerToProfileList).reverse()[0].map((id) =>
                                <ProfileImage key={id} id={id} showCharacterLabel={false} />
                            )
                        }
                    </Stack>
                </m.div> */}
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
            {/* <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="content">
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
                </m.div> */}
                </div>
        </div>
    );
}
export default LeadershipChemistryContent;