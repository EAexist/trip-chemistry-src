/* Externals */
import { Add } from "@mui/icons-material";
import { Button, Container, Toolbar, useTheme } from "@mui/material";
import { m } from 'framer-motion';

/* App */
import MainAppBar from "~/components/AppBar/MainAppBar";
import { useAppSelector } from "~/store";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import RoutedMotionPage from "../../motion/components/RoutedMotionPage";
import { FADEIN_VIEWPORT, STAGGER_CHILDREN, VARIANTS_SLIDEUP } from "../../motion/props";
import ChemistrySummaryButton from "./component/ChemistrySummaryButton";

function ChemistryListContent() {

    /* Hooks */
    const navigate = useNavigateWithGuestContext();
    const { palette } = useTheme();

    /* Reducers */
    const chemistryIdList = useAppSelector((state) => state.auth.data.profile.chemistryIdList)

    /* Event Handler */
    const handleAddChemistry = () => {
        navigate(`new`, { state: { navigateDirection: 'next' } });
    }

    return (
        <RoutedMotionPage className="page fill-window flex" style={{ backgroundColor: palette.gray.main }}>
            <MainAppBar color="transparent">
                <m.h2 {...FADEIN_VIEWPORT} className="section-title">
                    내 여행 목록
                </m.h2>
            </MainAppBar>
            <Toolbar />
            <Container>
                <m.ul {...STAGGER_CHILDREN} custom={0.5} className="content content--sparse">
                    {
                        Object.values(chemistryIdList).map((id, index) => (
                            <m.li key={id} variants={VARIANTS_SLIDEUP}>
                                <ChemistrySummaryButton id={id} />
                            </m.li>
                        ))
                    }
                    <m.li variants={VARIANTS_SLIDEUP}>
                        <Button
                            variant="outlined"
                            className="block--large flex-row"
                            sx={{ borderRadius: "16px", backgroundColor: "secondary.main" }}
                            onClick={handleAddChemistry}
                        >
                            <Add />
                            <p>새 여행 만들기</p>
                        </Button>
                    </m.li>
                </m.ul>
            </Container>
        </RoutedMotionPage>
    );
}
export default ChemistryListContent;