/* React */
import { PropsWithChildren, useEffect, useState } from "react";

/* Externals */
import { CircularProgress, Container, Fab, Toolbar } from "@mui/material";
import { m } from "framer-motion";

/* App */
import withAuthLoadStatus, { WithLoadStatusProps } from "../hocs/withAuthLoadStatus";
import { LoadStatus } from "../interfaces/enums/LoadStatus";
import getImgSrc from "../utils/getImgSrc";
// import loadable from "@loadable/component";

import LazyImage from "~/components/LazyImage";

// const NoticeBlock = loadable(() => import(/* webpackChunkName: "NoticeBlock" */ "../components/Block/NoticeBlock"));

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
};

function LoadRequiredContent({
    status = LoadStatus.REST,
    setStatus,
    children,
    successText = "",
    pendingText = "잠시만 기다려주세요.",
    failText = "서버에 연결할 수 없어요. 잠시 후 다시 시도해주세요.",
    missText = "정보를 찾을 수 없어요. 잠시 후 다시 시도해주세요.",
    handleFailButtonText = "확인",
    handleMissButtonText = "확인",
    handleSuccess = () => { },
    handleFail = () => { },
    handleMiss = () => { },
    showHandleFailButton = true, /* false 일 경우 버튼 없이 FAIL을 즉시 처리. */
    isEnabled = true,
}: PropsWithChildren<LoadRequiredContentProps>) {

    /* States */
    const [delayedStatus, setDelayedStatus] = useState<LoadStatus>(status);
    const [isPending, setIsPending] = useState<boolean>(false);
    const minimumPendingTime = 500;

    const { body, buttonText, onClick } = {
        [LoadStatus.PENDING]: {
            body: pendingText
        },
        [LoadStatus.FAIL]: {
            body: failText,
            buttonText: handleFailButtonText,
            onClick:
                () => {
                    handleFail();
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
                    break;
                case LoadStatus.FAIL:
                    if (!isPending) {
                        setDelayedStatus(LoadStatus.FAIL);
                        /* 버튼 없이 FAIL을 바로 처리할 경우 */
                        if (!showHandleFailButton) {
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

    return (
        (!isEnabled) || (delayedStatus === LoadStatus.REST) || (delayedStatus === LoadStatus.SUCCESS)
            ?
            children
            :
            <div className={`page flex fill-window`}>
                <Toolbar />
                <Container className='flex-grow'>
                    <m.div className='flex-grow'>
                        {
                            (delayedStatus === LoadStatus.PENDING)
                                ?
                                <CircularProgress />
                                :
                                <LazyImage
                                    alt={delayedStatus}
                                    src={getImgSrc('/info', delayedStatus, { size: "xlarge" })}
                                    width={"256px"}
                                    height={"256px"}
                                    containerClassName="NoticeBlock__image"
                                />
                        }
                        <p>{body}</p>
                    </m.div>
                </Container>
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

