/* React */

/* Externals */
import { Outlet, useNavigate } from "~/router-module";

/* App */

import NoticeBlock from "../components/Block/NoticeBlock";
import { useHasAnsweredTest } from "../reducers/authReducer";

import getImgSrc from "../utils/getImgSrc";
import useNavigateWithGuestContext from "../hooks/useNavigateWithGuestContext";
import { useAppSelector } from "~/store";
import MainAppBar from "~/components/AppBar/MainAppBar";

function TestRequiredRoute() {

    const navigate = useNavigateWithGuestContext();

    /* Reducers */
    const nickname = useAppSelector((state) => state.auth.data.profile.nickname)
    const hasAnsweredTest = useHasAnsweredTest();

    /* Event Handlers */
    const handleHasNotAnsweredTest = () => {
        navigate('test');
    }

    return (
        hasAnsweredTest
            ?
            <Outlet />
            :
            <>
                <MainAppBar />
                <NoticeBlock
                    alt={"miss"}
                    src={getImgSrc('/info', "MISS", { size: "xlarge" })}
                    body={`${nickname} 님의 여행은 어떤 모습일까요?\n테스트를 완료하고 결과를 확인해보세요.`}
                    buttonText={"테스트 시작하기"}
                    onClick={handleHasNotAnsweredTest}
                />
            </>
    );
}
export default TestRequiredRoute;