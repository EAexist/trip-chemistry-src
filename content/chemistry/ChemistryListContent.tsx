/* Externals */
import { Add } from "@mui/icons-material";
import { Button, Toolbar } from "@mui/material";
import { m } from 'framer-motion';
import LazyDomAnimation from "../../motion/LazyDomAnimation";

/* App */
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import RoutedMotionPage from "../../motion/components/RoutedMotionPage";
import { FADEIN_VIEWPORT, STAGGER_CHILDREN, VARIANTS_SLIDE_UP } from "../../motion/props";
import { useChemistryIdList } from "../../reducers/authReducer";
import ChemistrySummaryButton from "./component/ChemistrySummaryButton";

function ChemistryListContent() {

    /* Hooks */
    const navigate = useNavigateWithGuestContext();

    /* Reducers */
    const chemistryIdList = useChemistryIdList();

    /* Event Handler */
    const handleAddChemistry = () => {
        navigate(`new`, { state: { navigateDirection: 'next' } });
    }

    return (
        <RoutedMotionPage className="page fill-window flex">
        {/* <div className="page  min-fill-window"> */}
            <Toolbar/>
            <div className="block--with-margin-x block__body--large">
                <LazyDomAnimation>
                <m.h2 {...FADEIN_VIEWPORT} className="typography-heading">
                    내 여행
                </m.h2>
                <m.ul {...STAGGER_CHILDREN} custom={0.5} className="block__body">
                    {
                        Object.values(chemistryIdList).map((id, index) => (
                            <m.li variants={VARIANTS_SLIDE_UP}>
                                <ChemistrySummaryButton id={id} />
                            </m.li>
                        ))
                    }
                    <m.li variants={VARIANTS_SLIDE_UP}>
                        <Button
                            variant="outlined"
                            className="block--large flex-row"
                            sx={{ borderRadius: "16px" }}
                            onClick={handleAddChemistry}
                        >
                            <Add />
                            <p>새 여행 만들기</p>
                        </Button>
                    </m.li>
                </m.ul>
                </LazyDomAnimation>
            </div>
        {/* </div> */}
        </RoutedMotionPage>
    );
}
export default ChemistryListContent;