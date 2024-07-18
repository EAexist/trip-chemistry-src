/* Externals */
import { Add } from "@mui/icons-material";
import { Button, Container, ListItem, Toolbar } from "@mui/material";
import { m } from 'framer-motion';

/* App */
import MainAppBar from "~/components/AppBar/MainAppBar";
import { MotionList } from "~/motion/components/MotionList";
import { useAppSelector } from "~/store";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import RoutedMotionPage from "../../motion/components/RoutedMotionPage";
import { FADEIN_VIEWPORT, VARIANTS_STAGGER_CHILDREN } from "../../motion/props";
import ChemistryListItem from "./component/ChemistryListItem";

function ChemistryListContent() {

    /* Hooks */
    const navigate = useNavigateWithGuestContext();

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
                <MotionList variants={VARIANTS_STAGGER_CHILDREN}>
                    {
                        Object.values(chemistryIdList).map((id, index) => (
                            <ListItem>
                                <ChemistryListItem id={id} />
                            </ListItem>
                        ))
                    }
                    <ListItem sx={{ marginTop: "16px" }}>
                        <Button
                            variant="outlined"
                            className="main-action-button"
                            onClick={handleAddChemistry}
                            startIcon={<Add />}
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