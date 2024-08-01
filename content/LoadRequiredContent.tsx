/* React */
import { PropsWithChildren, useEffect, useRef, useState } from "react";

/* Externals */

/* App */
import withAuthLoadStatus, { WithLoadStatusProps } from "../hocs/withAuthLoadStatus";
import { LoadStatus } from "../interfaces/enums/LoadStatus";

import APIFetchFallbackPage from "../components/APIFetchFallbackPage";
import Fab from "../components/Button/Fab";
import ErrorBoundaryPage from "./ErrorBoundaryPage";


interface LoadRequiredContentProps extends WithLoadStatusProps {
    handleSuccess?: () => void;
    handleFail?: () => void;
    handleMiss?: () => void;
    successText?: string;
    pendingText?: string;
    failText?: string;
    missText?: string;
    handleFailButtonText?: string
    handleMissButtonText?: string
    showHandleFailButton?: boolean
    isEnabled?: boolean
    doWait?: boolean
    showOnPending?: boolean
    showOnSuccess?: boolean
};

function LoadRequiredContent({
    status = LoadStatus.REST,
    setStatus,
    children,
    pendingText = "잠시만 기다려주세요.",
    failText = "서버에 연결할 수 없어요. 잠시 후 다시 시도해주세요.",
    missText = "정보를 찾을 수 없어요. 잠시 후 다시 시도해주세요.",
    handleFailButtonText = "확인",
    handleMissButtonText = "확인",
    handleSuccess = () => { },
    handleFail,
    handleMiss = () => { },
    showHandleFailButton = false, /* false 일 경우 버튼 없이 FAIL을 즉시 처리. */
    isEnabled = true,
    showOnPending = false,
    showOnSuccess = true,
}: PropsWithChildren<LoadRequiredContentProps>) {

    /* States */
    const [delayedStatus, setDelayedStatus] = useState<LoadStatus>(status);
    const [isPending, setIsPending] = useState<boolean>(false);
    const minimumPendingTime = 500;
    const serverBootIndicatingTime = 3000;
    const [showServerBootingAlert, setShowServerBootingAlert] = useState(false)

    const timerRef = useRef(null);

    const { body, buttonText, onClick } = {
        [LoadStatus.PENDING]: {
            body: pendingText
        },
        [LoadStatus.FAIL]: {
            body: failText,
            buttonText: handleFailButtonText,
            onClick:
                () => {
                    if(handleFail) handleFail();
                    setStatus(LoadStatus.REST);
                }
        },
        [LoadStatus.MISS]: {
            body: missText,
            buttonText: handleMissButtonText,
            onClick:
                () => {
                    handleMiss();
                    setStatus(LoadStatus.REST);
                }
        },
        [LoadStatus.SUCCESS]: {},
        [LoadStatus.REST]: {}
    }[delayedStatus]

    /* Side Effect*/
    useEffect(() => {
        if (isEnabled) {
            switch (status) {
                case LoadStatus.REST:
                    setDelayedStatus(LoadStatus.REST);
                    break;
                case LoadStatus.SUCCESS:
                    if (!isPending) {
                        setDelayedStatus(LoadStatus.SUCCESS);
                        handleSuccess();
                        setStatus(LoadStatus.REST);
                    }
                    break;
                case LoadStatus.PENDING:
                    setDelayedStatus(LoadStatus.PENDING);
                    setIsPending(true);
                    setTimeout(() => {
                        setIsPending(false);
                    }, minimumPendingTime);
                    timerRef.current = setTimeout(() => {
                        setShowServerBootingAlert(true)
                    }, serverBootIndicatingTime);
                    break;
                case LoadStatus.FAIL:
                    if (!isPending) {
                        setDelayedStatus(LoadStatus.FAIL);
                        /* 버튼 없이 FAIL을 바로 처리할 경우 */
                        if (handleFail) {
                            handleFail();
                            setStatus(LoadStatus.REST);
                        }
                    }
                    break;
                case LoadStatus.MISS:
                    if (!isPending) {
                        setDelayedStatus(LoadStatus.MISS);
                    }
                    break;
                default:
                    break;
            }
        }
    }, [status, isPending, handleSuccess, setStatus, isEnabled, handleFail, showHandleFailButton])

    useEffect(()=>{
        if ( status !== LoadStatus.PENDING ){
            clearTimeout(timerRef.current)
            setShowServerBootingAlert(false)
        }
    }, [ status === LoadStatus.PENDING ])

    return (
        (!isEnabled) || (delayedStatus === LoadStatus.REST) || (showOnSuccess && (delayedStatus === LoadStatus.SUCCESS)) || (showOnPending && (delayedStatus === LoadStatus.PENDING)) || (handleFail && (delayedStatus === LoadStatus.FAIL))
            ?
            children
            :
            (delayedStatus === LoadStatus.FAIL) 
            ?
            <ErrorBoundaryPage message="페이지를 찾을 수 없어요" icon="404" />
            :
            <div className={`page flex fill-window`}>
                <APIFetchFallbackPage/>
                {
                    onClick && buttonText &&
                    <Fab
                        onClick={onClick}
                    >
                        {buttonText}
                    </Fab>
                }
            </div>
    );
}
export default LoadRequiredContent;
const AuthLoadRequiredContent = withAuthLoadStatus(LoadRequiredContent);
export { AuthLoadRequiredContent };

