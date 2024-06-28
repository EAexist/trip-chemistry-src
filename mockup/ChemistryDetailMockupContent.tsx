// /* React */
// import { Fragment, useEffect, useState } from "react";

// /* Externals */
// import { AnimatePresence, m } from "framer-motion";
// 
// import LazyDomAnimation from "../motion/LazyDomAnimation";

// import { List, ListItem, ListItemAvatar, ListItemText, Stack, useTheme } from "@mui/material";

// /* App */
// import { SLIDERPROPS_CHEMISTRY_BUDGET_FOOD, TEST } from "../common/app-const";
// import SectionPaper from "../components/Paper/SectionPaper";
// import { useStrings } from "../texts";

// import FriendAvatar from "../components/Avatar/FriendAvatar";
// import NavigationButton from "../components/Button/NavigationButton";
// import ToggleButton from "../components/Button/ToggleButton";
// import ProfileImage from "../components/Profile/ProfileImage";
// import TestResultBlock from "../components/Profile/TestResultBlock";
// import useValueToProfileIdList from "../hooks/useValueToProfileIdList";
// import { FADEIN, FADEIN_VIEWPORT, FADEIN_FROMBOTTOM_VIEWPORT, VARIANTS_SLIDEUP, VARIANTS_STAGGER_CHILDREN, VARIANTS_FADEIN_FROMBOTTOM } from "../motion/props";
// import { filterProfile, useChemistry, useProfileAll, useProfileIdList, useSortedCityList } from "../reducers/chemistryReducer";
// 
// import CityChemistryContent from "../content/chemistry/CityChemistryContent";
// import ChemistrySlider from "../content/chemistry/component/ChemistrySlider";
// import { MotionListItemButton } from "~/motion/components/MotionListItemButton";
// import { MotionListItem } from "~/motion/components/MotionListItem";
// import { MotionList } from "~/motion/components/MotionList";

// function ChemistryDetailMockupContent() {

//     /* Constants */
//     const testStrings = useStrings().public.contents.test;
//     const strings = useStrings().public.contents.chemistry;
//     const { palette } = useTheme();

//     /* States */
//     const [characterSectionActiveUserIndex, setCharacterSectionActiveUserIndex] = useState<number>(0);

//     /* Reducers */
//     const idList = useProfileIdList(false);
//     const answeredProfileIdList = useProfileIdList();

//     const chemistry = useChemistry();

//     const scheduleAnswerToProfiles = useValueToProfileIdList('schedule');
//     const budgetAnswerToProfiles = useValueToProfileIdList('dailyRestaurantBudget');

//     const characterSectionCharacter = useAppSelector((state) =>
//         state.chemistry.data.profiles[answeredProfileIdList[characterSectionActiveUserIndex]]?.testResult.character
//     );

//     const profiles = Object.values(useAppSelector((state) => state.chemistry.data.profiles))
//     const leaderDataList = filterProfile(profiles, chemistry?.leaderList, "nickname");
//     const follwerDataList = filterProfile(profiles, answeredProfileIdList.filter(id => !chemistry?.leaderList.includes(id)), "nickname");
//     const leadershipAnswerToProfileList = useValueToProfileIdList("leadership");

//     const sortedCityList = useSortedCityList();

//     useEffect(() => {
//         console.log(`[ChemistryDetailMockupContent] budgetAnswerToProfiles=${JSON.stringify(budgetAnswerToProfiles)}`);
//     }, [budgetAnswerToProfiles])

//     return (
//         <LazyDomAnimation>
//             <div className="page">
//                 <SectionPaper className="fill-window flex-end" style={{ outline: "1px solid red" }}>
//                     {/* <m.h2 {...FADEIN_VIEWPORT} className="section-title">{strings.sections.character.title}</m.h2> */}
//                     <m.div {...FADEIN_VIEWPORT} className="content">
//                         <Stack spacing={-0.25} justifyContent={'center'} alignItems={'start'}>
//                             {
//                                 answeredProfileIdList.map((id, index) => (
//                                     <ToggleButton
//                                         key={id}
//                                         value={index}
//                                         onChange={(_, value) => setCharacterSectionActiveUserIndex(value)}
//                                         selected={characterSectionActiveUserIndex === index}
//                                         className="toggle-button--button-base"
//                                     >
//                                         <FriendAvatar key={id} id={id} labelSize="large" />
//                                     </ToggleButton>
//                                 ))
//                             }
//                         </Stack>
//                         <AnimatePresence mode={"wait"} initial={false}>
//                             <m.div key={characterSectionActiveUserIndex} {...{ ...FADEIN, exit: "hidden" }} className="navigation-button__container">
//                                 <TestResultBlock key={characterSectionActiveUserIndex} id={answeredProfileIdList[characterSectionActiveUserIndex]} />
//                                 {/* {
//                                     (characterSectionActiveUserIndex > 0) &&
//                                     <NavigationButton navigateTo="prev" onClick={() => setCharacterSectionActiveUserIndex((prev) => prev > 0 ? prev - 1 : prev)} />
//                                 }
//                                 {
//                                     (characterSectionActiveUserIndex < answeredProfileIdList.length - 1) &&
//                                     <NavigationButton navigateTo="next" onClick={() => setCharacterSectionActiveUserIndex((prev) => prev < answeredProfileIdList.length - 1 ? prev + 1 : prev)} />
//                                 } */}
//                             </m.div>
//                         </AnimatePresence>
//                         {/* <AnimatePresence mode={"wait"} initial={false}>
//                             <m.p key={characterSectionActiveUserIndex} {...{ ...FADEIN, exit: "hidden" }} custom={0.5}>
//                                 {characterSectionCharacter?.body}
//                             </m.p>
//                         </AnimatePresence> */}
//                     </m.div>
//                 </SectionPaper>
//                 <SectionPaper>
//                     <m.h2 {...FADEIN_VIEWPORT} className="section-title">{strings.sections.leadership.title}</m.h2>
//                     <m.div {...FADEIN_VIEWPORT} className="content">
//                         <Stack display={'flex'} justifyContent={'center'}>
//                             {
//                                 Object.keys(Object.values(leadershipAnswerToProfileList)).length > 0 &&
//                                 Object.values(leadershipAnswerToProfileList).reverse()[0].map((id) =>
//                                     <ProfileImage key={id} id={id} showCharacterLabel={false} />
//                                 )
//                             }
//                         </Stack>
//                         <Stack flexWrap={"wrap"} spacing={4} justifyContent={"center"}>
//                             {
//                                 Object.keys(Object.values(leadershipAnswerToProfileList)).length > 1 &&
//                                 Object.entries(leadershipAnswerToProfileList).reverse().slice(1).map(([value, idList], index) => (
//                                     <Stack key={value} sx={{ flexWrap: "wrap" }}>
//                                         <p className="typography-note">{testStrings.test.leadership.answers[Number(value) as keyof typeof testStrings.test.leadership.answers].label}</p>
//                                         <Stack spacing={0.5}>
//                                             {
//                                                 idList.map((id) => (
//                                                     <FriendAvatar key={id} id={id} />
//                                                 ))
//                                             }
//                                         </Stack>
//                                     </Stack>
//                                 ))
//                             }
//                         </Stack>
//                         <div className="content">
//                             <p>
//                                 {strings.sections.leadership.body.map((string: string | undefined, index) => (
//                                     string === "/idList"
//                                         ? chemistry && leaderDataList.map((nickname, index) =>
//                                             <Fragment key={nickname as string}>
//                                                 {index > 0 && ", "}
//                                                 <b>{` ${nickname} `}</b>
//                                                 {strings.sections.leadership.idPostfix}
//                                             </Fragment>
//                                         )
//                                         : <Fragment key={index}>{string}</Fragment>
//                                 ))}
//                             </p>
//                             {
//                                 (follwerDataList.length > 0) &&
//                                 <p>
//                                     {strings.sections.leadership.detail.map((string: string | undefined, index) => (
//                                         string === "/idList"
//                                             ? chemistry && follwerDataList.map((nickname: string, index) =>
//                                                 <Fragment key={index}>
//                                                     {index > 0 && ", "}
//                                                     <b>{` ${nickname} `}</b>
//                                                     {strings.sections.leadership.idPostfix}
//                                                 </Fragment>
//                                             )
//                                             : <Fragment key={index}>{string}</Fragment>
//                                     ))}
//                                 </p>
//                             }
//                         </div>
//                     </m.div>
//                 </SectionPaper>
//                 <SectionPaper>
//                     {/* <m.h2 {...FADEIN_VIEWPORT} className="section-title">{strings.sections.schedule.title}</m.h2> */}
//                     <div className="content">
//                         <MotionList initial={"hidden"} whileInView={"visible"} variants={VARIANTS_STAGGER_CHILDREN} disablePadding custom={{ delayChildren: 1, staggerChildren: 0.1 }}>
//                             {
//                                 (Object.values(testStrings.test.schedule.answers) as { label: string, value: number }[]).map(({ label, value }) => (
//                                     Object.keys(scheduleAnswerToProfiles).includes(String(value)) &&
//                                     <MotionListItem variants={VARIANTS_FADEIN_FROMBOTTOM} key={label} disableGutters dense>
//                                         {(value === 4) && <div style={{ position: 'absolute', backgroundColor: palette.primary.light, opacity: 0.5, width: '100%', height: '100%' }} className="block--round" />}
//                                         <ListItemAvatar style={{ width: "100px", zIndex: 1 }} className="block--centered">
//                                             <p className={Object.keys(scheduleAnswerToProfiles).includes(String(value)) ? "typography-highlight" : "disabled"}>{label}</p>
//                                         </ListItemAvatar>
//                                         <ListItemText primary={
//                                             <Stack>
//                                                 <Stack spacing={0.5}>
//                                                     {
//                                                         (Object.keys(scheduleAnswerToProfiles).includes(String(value)) ? scheduleAnswerToProfiles[value] : []).map((id) => (
//                                                             <FriendAvatar key={id} id={id} />
//                                                         ))
//                                                     }
//                                                 </Stack>
//                                             </Stack>
//                                         } sx={{ marginLeft: "16px", zIndex: 1 }} />
//                                     </MotionListItem>
//                                 )).reverse()
//                             }
//                             <m.div className="content" variants={VARIANTS_FADEIN_FROMBOTTOM}>
//                                 {
//                                     chemistry?.scheduleChemistryText?.map((body, index) => {
//                                         const list = body.split(/(%\S*%)/)
//                                         return (
//                                             index == 1 ?
//                                                 <p key={index} style={{ fontSize: "16px", lineHeight: '1.7rem' }}>
//                                                     {
//                                                         list.map((t, index) =>
//                                                             t[0] === "%"
//                                                                 ? <b key={index}>{t.replaceAll('%', '')}</b>
//                                                                 : <Fragment key={index}>{t}</Fragment>
//                                                         )
//                                                     }
//                                                 </p>
//                                                 : <></>
//                                         )
//                                     })
//                                 }
//                             </m.div>
//                         </MotionList>
//                     </div>
//                 </SectionPaper>
//                 <SectionPaper>
//                     {/* <m.h2 {...FADEIN_VIEWPORT} className="section-title">{strings.sections.budget.title}</m.h2> */}
//                     <m.div className="content" initial={"hidden"} whileInView={"visible"} variants={VARIANTS_STAGGER_CHILDREN} custom={{ delayChildren: 1 }} >
//                         <m.div className="block--centered" variants={VARIANTS_FADEIN_FROMBOTTOM} >
//                             {/* <ChemistrySlider {...SLIDERPROPS_CHEMISTRY_BUDGET_FOOD} /> */}
//                         </m.div>
//                         <m.div className="content" variants={VARIANTS_FADEIN_FROMBOTTOM}>
//                             {
//                                 chemistry?.budgetChemistryText?.map((body, index) => {
//                                     const list = body.split(/(%\S*%)/)
//                                     return (
//                                         index == 1 ?
//                                             <p key={index} style={{ fontSize: "16px", lineHeight: '1.7rem' }}>
//                                                 {
//                                                     list.map((t, index) =>
//                                                         t[0] === "%"
//                                                             ? <b key={index}>{t.replaceAll('%', '')}</b>
//                                                             : <Fragment key={index}>{t.split(" 돈을")[0]}</Fragment>
//                                                     )
//                                                 }
//                                             </p>
//                                             : <></>
//                                     )
//                                 })
//                             }
//                         </m.div>
//                     </m.div>
//                 </SectionPaper>
//                 <SectionPaper>
//                     <m.h2 {...FADEIN_VIEWPORT} className="section-title">{strings.sections.city.title}</m.h2>
//                     <ul className="content">
//                         {
//                             sortedCityList && sortedCityList.map((cityType) => (
//                                 <m.li key={cityType} {...FADEIN_VIEWPORT}>
//                                     <CityChemistryContent cityType={cityType as keyof typeof TEST.city.subTests} />
//                                 </m.li>
//                             ))
//                         }
//                     </ul>
//                 </SectionPaper>
//             </div>
//         </LazyDomAnimation>
//     );
// }
// export default ChemistryDetailMockupContent;