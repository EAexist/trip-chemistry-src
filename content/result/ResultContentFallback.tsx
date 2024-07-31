import { Container, Skeleton, Stack, Toolbar } from "@mui/material";
import MainAppBar from "~/src/components/AppBar/MainAppBar";
import AppTitleButton from "~/src/components/Button/AppTitleButton";

interface ResultContentFallbackProps {

};

function ResultContentFallback({ }: ResultContentFallbackProps) {
    return (
        <div className={`page fill-window`}>
            <MainAppBar>
                <AppTitleButton />
            </MainAppBar>
            <Toolbar />
            <Container className={`column-padding content`}>
                <Skeleton height={26} width={"40%"} />
                <div className="content">
                    <Stack height={192}>
                        <Skeleton height={160} width={160} variant="rounded" />
                        <div style={{ flexGrow: 1 }}>
                            <Skeleton height={24} width={"100%"} />
                            <Skeleton height={36} width={"75%"} />
                        </div>
                    </Stack>
                    <Stack direction={"column"} alignItems={"stretch"}>
                        <Skeleton height={24} />
                        <Skeleton height={24} width={"80%"} />
                    </Stack>
                    <Stack direction={"column"} alignItems={"stretch"}>
                        <Skeleton height={24} />
                        <Skeleton height={24} />
                        <Skeleton height={24} width={"80%"} />
                    </Stack>
                </div>
            </Container>
        </div>
    );
}
export default ResultContentFallback;