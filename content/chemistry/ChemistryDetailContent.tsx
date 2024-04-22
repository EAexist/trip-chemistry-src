/* React */
import { Fragment, useEffect, useState } from "react";

/* Externals */
import { AnimatePresence, m } from "framer-motion";
import { useSelector } from "react-redux";
import LazyDomAnimation from "../../motion/LazyDomAnimation";

import { List, ListItem, ListItemAvatar, ListItemText, Stack } from "@mui/material";

/* App */
import { SLIDERPROPS_CHEMISTRY_BUDGET_FOOD, TEST } from "../../common/app-const";
import SectionPaper from "../../components/Paper/SectionPaper";
import { useStrings } from "../../texts";

import FriendAvatar from "../../components/Avatar/FriendAvatar";
import NavigationButton from "../../components/Button/NavigationButton";
import ToggleButton from "../../components/Button/ToggleButton";
import ProfileImage from "../../components/Profile/ProfileImage";
import TestResultBlock from "../../components/Profile/TestResultBlock";
import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import { FADEIN, FADEIN_VIEWPORT } from "../../motion/props";
import { filterProfile, useChemistry, useProfileAll, useProfileIdList, useSortedCityList } from "../../reducers/chemistryReducer";
import { RootState } from "../../store";
import CityChemistryContent from "./CityChemistryContent";
import ChemistrySlider from "./component/ChemistrySlider";

function ChemistryDetailContent() {

    /* Constants */
    const testStrings = useStrings().public.contents.test;
    const strings = useStrings().public.contents.chemistry;

    /* States */
    const [characterSectionActiveUserIndex, setCharacterSectionActiveUserIndex] = useState<number>(0);

    /* Reducers */
    const idList = useProfileIdList(false);
    const answeredProfileIdList = useProfileIdList();

    const chemistry = useChemistry();

    const scheduleAnswerToProfiles = useValueToProfileIdList('schedule');
    const budgetAnswerToProfiles = useValueToProfileIdList('food');

    const characterSectionCharacter = useSelector((state: RootState) =>
        state.chemistry.data.profileList[answeredProfileIdList[characterSectionActiveUserIndex]]?.testResult.tripCharacter
    );

    const profileList = Object.values(useSelector((state: RootState) => state.chemistry.data.profileList))
    const leaderDataList = filterProfile(profileList, chemistry?.leaderList, "nickname");
    const follwerDataList = filterProfile(profileList, answeredProfileIdList.filter(id => !chemistry?.leaderList.includes(id)), "nickname");
    const leadershipAnswerToProfileList = useValueToProfileIdList("leadership");

    const sortedCityList = useSortedCityList();

    useEffect(() => {
        console.log(`[ChemistryDetailContent] budgetAnswerToProfiles=${JSON.stringify(budgetAnswerToProfiles)}`);
    }, [budgetAnswerToProfiles])

    return (
        <>
            <LazyDomAnimation>
                <SectionPaper>
                    <m.h2 {...FADEIN_VIEWPORT} className="typography-heading">{strings.sections.tripCharacter.title}</m.h2>
                    <m.div {...FADEIN_VIEWPORT} className="block__body">
                        <Stack spacing={-0.25} justifyContent={'center'} alignItems={'start'}>
                            {
                                answeredProfileIdList.map((id, index) => (
                                    <ToggleButton
                                        key={id}
                                        value={index}
                                        onChange={(_, value) => setCharacterSectionActiveUserIndex(value)}
                                        selected={characterSectionActiveUserIndex === index}
                                        className="toggle-button--button-base"
                                    >
                                        <FriendAvatar key={id} id={id} labelSize="large" />
                                    </ToggleButton>
                                ))
                            }
                        </Stack>
                        <AnimatePresence mode={"wait"} initial={false}>
                            <m.div key={characterSectionActiveUserIndex} {...{ ...FADEIN, exit: "hidden" }} className="navigation-button__container">
                                <TestResultBlock key={characterSectionActiveUserIndex} id={answeredProfileIdList[characterSectionActiveUserIndex]} />
                                {
                                    (characterSectionActiveUserIndex > 0) &&
                                    <NavigationButton navigateTo="prev" onClick={() => setCharacterSectionActiveUserIndex((prev) => prev > 0 ? prev - 1 : prev)} />
                                }
                                {
                                    (characterSectionActiveUserIndex < answeredProfileIdList.length - 1) &&
                                    <NavigationButton navigateTo="next" onClick={() => setCharacterSectionActiveUserIndex((prev) => prev < answeredProfileIdList.length - 1 ? prev + 1 : prev)} />
                                }
                            </m.div>
                        </AnimatePresence>
                        <AnimatePresence mode={"wait"} initial={false}>
                            <m.p key={characterSectionActiveUserIndex} {...{ ...FADEIN, exit: "hidden" }} custom={0.5}>
                                {characterSectionCharacter?.body}
                            </m.p>
                        </AnimatePresence>
                    </m.div>
                </SectionPaper>
                <SectionPaper>
                    <m.h2 {...FADEIN_VIEWPORT} className="typography-heading">{strings.sections.leadership.title}</m.h2>
                    <m.div {...FADEIN_VIEWPORT} className="block__body">
                        <Stack display={'flex'} justifyContent={'center'}>
                            {
                                Object.keys(Object.values(leadershipAnswerToProfileList)).length > 0 &&
                                Object.values(leadershipAnswerToProfileList).reverse()[0].map((id) =>
                                    <ProfileImage key={id} id={id} showCharacterLabel={false} />
                                )
                            }
                        </Stack>
                        <Stack flexWrap={"wrap"} spacing={4} justifyContent={"center"}>
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
                        </Stack>
                        <div className="block__body">
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
                        </div>
                    </m.div>
                </SectionPaper>
                <SectionPaper>
                    <m.h2 {...FADEIN_VIEWPORT} className="typography-heading">{strings.sections.schedule.title}</m.h2>
                    <m.div {...FADEIN_VIEWPORT} className="block__body">
                        <div>
                            <List disablePadding>
                                {
                                    ( Object.values(testStrings.test.schedule.answers) as { label: string, value: number }[] ).map(({ label, value }) => (
                                        <ListItem key={label} disablePadding={Object.keys(scheduleAnswerToProfiles).includes(String(value))} disableGutters>
                                            <ListItemAvatar style={{ width: "100px" }} className="block--centered">
                                                <p className={Object.keys(scheduleAnswerToProfiles).includes(String(value)) ? "typography-label" : "disabled"}>{label}</p>
                                            </ListItemAvatar>
                                            <ListItemText primary={
                                                <Stack>
                                                    <Stack spacing={0.5}>
                                                        {
                                                            (Object.keys(scheduleAnswerToProfiles).includes(String(value)) ? scheduleAnswerToProfiles[value] : []).map((id) => (
                                                                <FriendAvatar key={id} id={id} />
                                                            ))
                                                        }
                                                    </Stack>
                                                </Stack>
                                            } sx={{ marginLeft: "16px" }} />
                                        </ListItem>
                                    )).reverse()
                                }
                            </List>
                        </div>
                        <div className="block__body">
                            {
                                chemistry?.scheduleChemistryText?.map((body, index) => {
                                    const list = body.split(/(%\S*%)/)
                                    return (
                                        <p key={index}>
                                            {
                                                list.map((t, index) =>
                                                    t[0] === "%"
                                                        ? <b key={index}>{t.replaceAll('%', '')}</b>
                                                        : <Fragment key={index}>{t}</Fragment>
                                                )
                                            }
                                        </p>
                                    )
                                })
                            }
                        </div>
                    </m.div>
                </SectionPaper>
                <SectionPaper>
                    <m.h2 {...FADEIN_VIEWPORT} className="typography-heading">{strings.sections.budget.title}</m.h2>
                    <m.div  {...FADEIN_VIEWPORT} className="block__body">
                        <div className="block--centered">
                            <ChemistrySlider {...SLIDERPROPS_CHEMISTRY_BUDGET_FOOD} />
                        </div>
                        <div className="block__body">
                            {
                                chemistry?.budgetChemistryText?.map((body, index) => {
                                    const list = body.split(/(%\S*%)/)
                                    return (
                                        <p key={index}>
                                            {
                                                list.map((t, index) =>
                                                    t[0] === "%"
                                                        ? <b key={index}>{t.replaceAll('%', '')}</b>
                                                        : <Fragment key={index}>{t}</Fragment>
                                                )
                                            }
                                        </p>
                                    )
                                })
                            }
                        </div>
                    </m.div>
                </SectionPaper>
                <SectionPaper>
                    <m.h2 {...FADEIN_VIEWPORT} className="typography-heading">{strings.sections.city.title}</m.h2>
                    <ul className="block__body">
                        {
                            sortedCityList && sortedCityList.map((cityClass) => (
                                <m.li key={cityClass} {...FADEIN_VIEWPORT}>
                                    <CityChemistryContent cityClass={cityClass as keyof typeof TEST.city.subTests} />
                                </m.li>
                            ))
                        }
                    </ul>
                </SectionPaper>
            </LazyDomAnimation>
        </>
    );
}
export default ChemistryDetailContent;