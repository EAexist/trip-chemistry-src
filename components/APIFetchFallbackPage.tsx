import { CircularProgress, Container, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import AnimatedIcon from "./AnimatedIcon";
import MainAppBar from "./AppBar/MainAppBar";
import AppTitleButton from "./Button/AppTitleButton";

interface APIFetchFallbackPageProps {

};

function APIFetchFallbackPage({ }: APIFetchFallbackPageProps) {
    const serverBootIndicatingTime = 3000;
    const [showServerBootingAlert, setShowServerBootingAlert] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setShowServerBootingAlert(true), serverBootIndicatingTime);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`page flex fill-window`}>
            <MainAppBar >
                <AppTitleButton />
            </MainAppBar>
            <Toolbar />
            <Container className='flex-grow block--centered content'>
                {
                    showServerBootingAlert
                        ?
                        <AnimatedIcon
                            name="sleep"
                            width="96px"
                            height="96px"
                        />
                        :
                        <CircularProgress />
                }
                <p>
                    {
                        showServerBootingAlert
                            ?
                            "서버가 잠에서 깨는 중이에요. 잠시만 기다려주세요.\n최대 1분 정도 걸려요."
                            :
                            "잠시만 기다려주세요."
                    }
                </p>
            </Container>
            <div className="fab-placeholder" />
        </div>
    );
}
export default APIFetchFallbackPage;