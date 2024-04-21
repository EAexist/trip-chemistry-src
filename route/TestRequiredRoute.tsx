/* React */

/* Externals */
import { Outlet, useNavigate } from "@remix-run/react";

/* App */
import { useSelector } from "react-redux";
import NoticeBlock from "../components/Block/NoticeBlock";
import { useHasAnsweredTest } from "../reducers/authReducer";
import { RootState } from "../store";
import getImgSrc, { FORMATWEBP } from "../utils/getImgSrc";
import useNavigateWithGuestContext from "../hooks/useNavigateWithGuestContext";

interface TestRequiredRouteProps {

};

function TestRequiredRoute({ }: TestRequiredRouteProps) {

    const navigate = useNavigateWithGuestContext();

    /* Reducers */
    const nickname = useSelector((state: RootState) => state.auth.data.profile.nickname )
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
        <NoticeBlock
            alt={"miss"}
            src={ getImgSrc('/info', "MISS", FORMATWEBP) }
            body={`${nickname} 님의 여행은 어떤 모습일까요?\n테스트를 완료하고 결과를 확인해보세요.`}
            buttonText={"테스트하러 가기"}
            handleClick={handleHasNotAnsweredTest}
        />
    );
}
export default TestRequiredRoute;