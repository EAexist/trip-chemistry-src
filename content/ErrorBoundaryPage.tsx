import { AppBar, Container, Toolbar } from "@mui/material";
import AnimatedIcon from "../components/AnimatedIcon";
import AppTitleButton from "../components/Button/AppTitleButton";
import Fab from "../components/Button/Fab";

interface ErrorBoundaryPageProps {
    message?: string;
    icon?: string;
}

function ErrorBoundaryPage({ message = "알 수 없는 오류가 발생했어요.", icon = "warning" }: ErrorBoundaryPageProps) {

    return (
        <div className={`page flex fill-window`}>
            <AppBar>
                <Toolbar>
                    <AppTitleButton />
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Container className='flex-grow block--centered content'>
                <AnimatedIcon
                    name={icon}
                    width="96px"
                    height="96px"
                />
                <p>
                    {message}
                </p>
            </Container>
            <Fab onClick={()=>{
                window.history.pushState({}, "", `${window.ENV.PUBLIC_URL}`)
                window.location.reload();
            }}>
                홈으로 돌아가기
            </Fab>
            <div className="fab-placeholder" />
        </div>
    );
}
export default ErrorBoundaryPage;