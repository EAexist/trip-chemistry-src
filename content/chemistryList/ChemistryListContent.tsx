/* Externals */
import { Add } from "@mui/icons-material";
import { Button, Container, ListItem, Toolbar, useTheme } from "@mui/material";
import { m } from 'framer-motion';

/* App */
import MainAppBar from "~/components/AppBar/MainAppBar";
import { useAppSelector } from "~/store";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import RoutedMotionPage from "../../motion/components/RoutedMotionPage";
import { FADEIN_VIEWPORT, STAGGER_CHILDREN, VARIANTS_SLIDEUP, VARIANTS_STAGGER_CHILDREN } from "../../motion/props";
import ChemistryListItem from "./component/ChemistryListItem";
import { MotionList } from "~/motion/components/MotionList";
import { MotionListItem } from "~/motion/components/MotionListItem";

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
        <RoutedMotionPage className="page fill-window">
            <MainAppBar>
                <m.h2 {...FADEIN_VIEWPORT} className="section-title">
                    내 여행 목록
                </m.h2>
            </MainAppBar>
            <Toolbar />
            <Container>
                <MotionList variants={VARIANTS_STAGGER_CHILDREN} className="content">
                    {
                        Object.values(chemistryIdList).map((id, index) => (
                            <ChemistryListItem id={id} />
                        ))
                    }
                    <ListItem>
                        <Button
                            variant="outlined"
                            className="main-action-button"
                            onClick={handleAddChemistry}
                            startIcon={<Add sx={{ color: "primary.main" }} />}
                        >
                            새 여행 만들기
                        </Button>
                    </ListItem>
                </MotionList>
            </Container>
        </RoutedMotionPage>
    );
}
export default ChemistryListContent;