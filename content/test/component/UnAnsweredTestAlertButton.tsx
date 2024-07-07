import { NavigateNext } from "@mui/icons-material";
import { Alert, ButtonBase } from "@mui/material";
import { TEST_TYPE } from "../../../common/app-const";
import { useScrollToCheckpoint } from "../../../components/Step/StepCheckpointContext";
import { useAppSelector } from "~/store";

interface UnAnsweredTestAlertButtonProps{

};

function UnAnsweredTestAlertButton( {} : UnAnsweredTestAlertButtonProps ){
    
    const firstUnansweredTestIndex = useAppSelector((state) => (
        Object.values(state.testAnswer.data).map((answer) =>
            (typeof answer !== "object")
                ? answer !== undefined
                : answer.length >= TEST_TYPE.hashtag.selectedMinLength
        ).indexOf(false)
    ))
    
    const scrollToCheckpoint = useScrollToCheckpoint();

    const handleAnswerAlertClick = () => {
        /* @TODO Scroll To First UnAnswered Test Section. */
        if (firstUnansweredTestIndex > -1) {
            console.log(`[TestContent] firstUnansweredTestIndex=${firstUnansweredTestIndex}`)
            scrollToCheckpoint(firstUnansweredTestIndex)
        }
    }

    return(
        <ButtonBase onClick={handleAnswerAlertClick} sx={{ borderRadius: "16px" }}>
            <Alert
                action={<NavigateNext />}
                severity="warning"
                sx={{ width: "100%" }}
            >
                아직 답변하지 않은 질문이 있어요
            </Alert>
        </ButtonBase>
    );
}
export default UnAnsweredTestAlertButton;