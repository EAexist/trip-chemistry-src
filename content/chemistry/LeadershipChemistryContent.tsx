/* React */

/* Externals */
import { m } from "framer-motion";
import { Avatar, Chip, List, ListItemAvatar, ListItemText, Stack } from "@mui/material";

/* App */
import { useStrings } from "../../texts";
import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import { FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import FriendAvatar from "~/components/Avatar/FriendAvatar";
import { MotionListItem } from "~/motion/components/MotionListItem";
import { IProfile } from "~/interfaces/IProfile";
import { useAppSelector } from "~/store";
import { createSelector } from "@reduxjs/toolkit";
import getImgSrc from "~/utils/getImgSrc";

function LeadershipChemistryContent() {

    const strings = useStrings().public.contents.chemistry;
    const optionStrings = Object(useStrings().public.contents.test.test.leadership.options);

    const leadershipAnswerToProfileList = useValueToProfileIdList("leadership");

    const nicknames = useAppSelector(
        createSelector(
            state => state.chemistry.data.profiles,
            (profiles: {[k: string] : IProfile }) =>
                Object.fromEntries(
                    Object.values(profiles).map(({ id, nickname }) => [id, nickname])
                )
        )
    )

    return (
        <>
            <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="section-header">
                <h2 className="section-title">{strings.sections.leadership.title}</h2>
            </m.div>
            <List>
                {
                    (Object.values(optionStrings) as { label: string, value: number }[]).map(({ label, value }) => (
                        Object.keys(leadershipAnswerToProfileList).includes(String(value)) &&
                        <MotionListItem key={label} {...FADEIN_FROMBOTTOM_VIEWPORT} >
                            <ListItemAvatar className="block--centered" sx={{ paddingRight: "16px" }}>
                                <Avatar srcSet={`${getImgSrc("/test", `leadership_${value}`)} 64w`} alt={label} sx={{ width: "48px", height: "48px"}}/>
                            </ListItemAvatar>
                                <div>
                                    <ListItemText
                                        primary={<h3 className="list-item-title">{label}</h3>}
                                    />
                                    <Stack>
                                        {
                                            (Object.keys(leadershipAnswerToProfileList).includes(String(value)) ? leadershipAnswerToProfileList[value] : []).map((id) => (
                                                <Chip
                                                    size="small"
                                                    label={nicknames[id]}
                                                />
                                            ))
                                        }
                                    </Stack>
                                </div>
                            {/* <ListItemText primary={
                                <Stack>
                                    <Stack spacing={0.5}>
                                        {
                                            (Object.keys(leadershipAnswerToProfileList).includes(String(value)) ? leadershipAnswerToProfileList[value] : []).map((id) => (
                                                <FriendAvatar key={id} id={id} />
                                            ))
                                        }
                                    </Stack>
                                </Stack>
                            } sx={{ marginLeft: "24px" }} /> */}
                        </MotionListItem>
                    )).reverse()
                }
            </List>
        </>
    );
}
export default LeadershipChemistryContent;

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