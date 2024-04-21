/* React */
import { useEffect, useState } from "react";

/* Externals */
import { ExpandLess, ExpandMore, ThumbUp } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, ListItemAvatar, ListItemText, Rating, Stack } from "@mui/material";
import { AnimatePresence, m } from "framer-motion";

/* App */
import { TEST } from "../../../common/app-const";
import FriendAvatar from "../../../components/Avatar/FriendAvatar";
import { IProfile } from "../../../interfaces/IProfile";
import { MotionList } from "../../../motion/components/MotionList";
import { MotionListItem } from "../../../motion/components/MotionListItem";
import { VARIANTS_STAGGER_CHILDREN } from "../../../motion/props";
import { useCityChemistry, useIsChemistryEnabled, useProfileAll } from "../../../reducers/chemistryReducer";
import { useStrings } from "../../../texts";
import useValueToProfileIdList from "../../../hooks/useValueToProfileIdList";
import LazyDomAnimation from "../../../motion/LazyDomAnimation";

interface ChemistryResultAccordionProps {
    cityClass: keyof typeof TEST.city.subTests;
};

function ChemistryResultAccordion({ cityClass }: ChemistryResultAccordionProps) {

    /* States */
    const [expanded, setExpanded] = useState<boolean>(false);

    /* Constants */
    const strings = useStrings().public.contents.test;

    const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded);
    };

    /* Reducers */
    const isChemistryEnabled = useIsChemistryEnabled();
    const score = useCityChemistry(cityClass);
    const answerList = (useProfileAll() as IProfile[]).map(({ id, testAnswer }) =>
        ({ id: id, answer: testAnswer[cityClass] })
    ).sort((a, b) => (b.answer as number) - (a.answer as number));

    const valueToProfileList = useValueToProfileIdList(cityClass);

    /* Event Handlers */
    const handleClickExpandButton = () => setExpanded((prev) => (!prev))

    /* Framer Motion */
    const variants_drawer = {
        open: {
            height: 'fit-content',
            transition: {
                duration: 0.5,
            }
        },
        closed: {
            height: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        isChemistryEnabled &&
            <div className="block__body">
                <Stack justifyContent={'space-between'} style={{ width: "100%" }} className="body__head">
                    <Stack>
                        <Rating value={score} readOnly precision={0.5} size={"small"} />
                        <p>{Math.round(score * 10) / 10}</p>
                        {
                            (score > 3.4) &&
                            <ThumbUp fontSize="inherit" />
                        }
                    </Stack>
                    <Stack>
                        <Button onClick={handleClickExpandButton} sx={{ padding: 0 }} endIcon={ expanded ? <ExpandLess /> : <ExpandMore />} className="typography-note">
                            {
                                expanded
                                    ? "답변 접기"
                                    : "친구들의 답변 보기"
                            }
                        </Button>
                    </Stack>
                </Stack>
                <LazyDomAnimation>
                    <AnimatePresence>
                        {
                            expanded &&
                            <m.div
                                initial={"closed"}
                                animate={"open"}
                                exit={"closed"}
                                variants={variants_drawer}
                            >
                                <MotionList variants={VARIANTS_STAGGER_CHILDREN} disablePadding>
                                    {/* {
                                    answerList.map(({ id, answer }) => (
                                        <MotionListItem key={id} >
                                            <ListItemAvatar>
                                                <FriendAvatar id={id} />
                                            </ListItemAvatar>
                                            <ListItemText primary={
                                                <Stack>
                                                    <Rating value={Number(answer)} readOnly precision={0.5} size={"small"} />
                                                    <p className="typography-note">{strings.test.city.answers[answer as keyof typeof strings.test.city.answers].label}</p>
                                                </Stack>
                                            } />
                                        </MotionListItem>
                                    ))
                                } */}
                                    {
                                        Object.entries(valueToProfileList).reverse().map(([value, idList], index) => (
                                            <MotionListItem key={value} disablePadding>
                                                <ListItemAvatar style={{ width: "72px" }} className="block--centered">
                                                    <Rating value={Number(value)} readOnly max={Number(value)} sx={{ fontSize: "14px" }} />
                                                    <p className="typography-note">{strings.test.city.answers[Number(value) as keyof typeof strings.test.city.answers].label}</p>
                                                </ListItemAvatar>
                                                <ListItemText primary={
                                                    <Stack spacing={0.5}>
                                                        {
                                                            idList.map((id) => (
                                                                <FriendAvatar id={id} />
                                                            ))
                                                        }
                                                    </Stack>
                                                } sx={{ marginLeft: "16px" }} />
                                            </MotionListItem>
                                        ))
                                    }
                                </MotionList>
                            </m.div>
                        }
                        {/* </AccordionDetails> */}
                        {/* </Accordion> */}
                    </AnimatePresence>
                </LazyDomAnimation>
            </div>
    );
}
export default ChemistryResultAccordion;