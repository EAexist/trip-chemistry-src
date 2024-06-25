/* React */
import { useState } from "react";

/* Externals */
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, ListItemAvatar, ListItemText, Rating, Stack } from "@mui/material";
import { AnimatePresence, m } from "framer-motion";

/* App */
import { PREFERENCE_OPTIONS, TEST } from "../../../common/app-const";
import FriendAvatar from "../../../components/Avatar/FriendAvatar";
import useValueToProfileIdList from "../../../hooks/useValueToProfileIdList";
import { MotionList } from "../../../motion/components/MotionList";
import { MotionListItem } from "../../../motion/components/MotionListItem";
import { VARIANTS_STAGGER_CHILDREN } from "../../../motion/props";
import { useCityChemistry, useIsChemistryEnabled } from "../../../reducers/chemistryReducer";

interface CityChemistryAccordionProps {
    cityType: keyof typeof TEST.city.subTests;
};

function CityChemistryAccordion({ cityType }: CityChemistryAccordionProps) {

    /* States */
    const [expanded, setExpanded] = useState<boolean>(false);

    /* Reducers */
    const isChemistryEnabled = useIsChemistryEnabled();
    const score = useCityChemistry(cityType);
    const valueToProfileList = useValueToProfileIdList("city", cityType);

    /* Event Handlers */
    const handleClickExpandButton = () => setExpanded((prev) => (!prev))

    /* Framer Motion */
    const variants_drawer = {
        visible: {
            height: 'fit-content',
            transition: {
                duration: 0.2,
            }
        },
        hidden: {
            height: 0,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        isChemistryEnabled &&
        <div className="content">
            <Stack justifyContent={'space-between'} style={{ width: "100%" }}>
                <Stack>
                    <Rating value={score} readOnly precision={0.5} size={"small"} />
                    <p>{Math.round(score * 10) / 10}</p>
                </Stack>
                <Stack>
                    <Button onClick={handleClickExpandButton} sx={{ padding: 0 }} endIcon={expanded ? <ExpandLess /> : <ExpandMore />} className="typography-note">
                        {
                            expanded
                                ? "답변 접기"
                                : "답변 보기"
                        }
                    </Button>
                </Stack>
            </Stack>
            <AnimatePresence>
                {
                    expanded &&
                    <m.div
                        initial={"hidden"}
                        animate={"visible"}
                        exit={"hidden"}
                        variants={variants_drawer}
                    >
                        <MotionList variants={VARIANTS_STAGGER_CHILDREN}>
                            {
                                Object.entries(valueToProfileList).reverse().map(([value, idList], index) => (
                                    <MotionListItem key={value} disablePadding>
                                        <ListItemAvatar style={{ width: "72px" }} className="block--centered">
                                            <Rating value={Number(value)} readOnly max={Number(value)} sx={{ fontSize: "14px" }} />
                                            <p className="typography-note">{PREFERENCE_OPTIONS[value].label}</p>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Stack spacing={0.5}>
                                                {
                                                    idList.map((id) => (
                                                        <FriendAvatar key={id} id={id} />
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
        </div>
    );
}
export default CityChemistryAccordion;