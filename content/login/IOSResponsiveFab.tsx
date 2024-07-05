/* React */
import { useEffect, useState } from "react";

/* Externals */
import { Button, ButtonProps, Container } from "@mui/material";
import { m } from "framer-motion";

/* App */
import { MotionButton, MotionButtonProps } from "~/motion/components/MotionButton";

interface IOSResponsiveFabProps extends ButtonProps {};

function IOSResponsiveFab({
    ...props
}: IOSResponsiveFabProps) {

    /** 
     * iOS Safari, Chrome 키보드 오픈 시 메인 액션 버튼을 VisualViewport 하단으로 이동. 위로 밀린 컨텐츠를 VisualViewport 내로 되돌림.
     * https://velog.io/@gene028/ios-keyboard
    */
    const [scrollYAtkeyboardOpen, setScrollYAtkeyboardOpen] = useState(window.scrollY)
    const [currentVisualViewportHeight, setcurrentVisualViewportHeight] = useState<number>(window.innerHeight)
    const [isIOSKeyboardOpened, setIsIOSKeyboardOpened] = useState(false)

    useEffect(() => {
        const handleVisualViewPortResize = () => {
            if (window.visualViewport) {
                const currentVisualViewportHeight = Number(window.visualViewport?.height)
                setcurrentVisualViewportHeight(currentVisualViewportHeight)
                setIsIOSKeyboardOpened(currentVisualViewportHeight < window.innerHeight)
                window.scrollTo(0, 1)
                setScrollYAtkeyboardOpen(window.scrollY)
            }
        }
        if (window.visualViewport) {
            window.visualViewport.onresize = handleVisualViewPortResize;
        }
    }, [])


    /* IOS Safari, Chrome 키보드 오픈 시 document 위로 밀림 현상. 상단 AppBar가 보이지 않게 됨. 하단 메인 액션 버튼 위치 조정이 어려움. */
    /** Solution:  키보드 오픈으로 인한 viewport 변화 떄 호출되는 handleVisualViewPortResize에서 에서 호면 밀림 후 다시 아래로 window scroll 을 해서 최적화된 화면 위치로 되돌림.
     * > 리서치 결과 브라우저의 의도된 기능이며 CSS 로 방지 할 수 없음.
     * > 전환이 최대한 자연스럽도록 할 것.
    */

    /**
     * [Deprecated] Solution 1. <input/> 포커스 여부에 따라 레아아웃 변경 
     * > <input/> 이 포커스되어있지만 키보드는 열리지 않은 상태가 가능하므로 <input/> 포커스 여부가 아닌 키보드 오픈 여부 = window.visualViewport.height < window.innerHeihgt 으로 상태 관리.
     */

    // const [active, setActive] = useState(document.activeElement);
    // const handleFocusIn = (e) => {
    //     setActive(document.activeElement);
    // }
    // const handleFocusOut = (e) => {
    //     setActive(null);
    // }
    // useEffect(() => {
    //     document.addEventListener('focusin', handleFocusIn)
    //     document.addEventListener('focusout', handleFocusOut)
    //     return () => {
    //         document.removeEventListener('focusin', handleFocusIn)
    //         document.removeEventListener('focusout', handleFocusOut)
    //     };
    // }, [])

    /**
     * [Deprecated] Solution 2. Body 의 Scroll을 잠금 
     * > 문제되는 현상은 body 보다 상위에서 일어나는 scroll 이므로 이 방식으로 컨트롤 할 수 없음.
     * > 화면 터치 액션 자체가 비활성화되어 다른 페이지와 일관성이 떨어지고 부자연스러움.
     * jy7123943@gmail.com. (2020.6.1). iOS 디바이스에서 body의 scroll을 막는 방법. [Code Playground:티스토리]. https://im-developer.tistory.com/201
     */
    // useEffect(() => {
    //     const body = document.querySelector('body') as HTMLElement;
    //     const lockScroll = e => e.preventDefault();
    //     body.addEventListener('touchmove', lockScroll, { passive: false });
    //     body.style.overflow = 'hidden';
    //     return () => {
    //         body.removeEventListener('touchmove', lockScroll);
    //         body.style.removeProperty('overflow');
    //     };
    // }, []);

    return (
        <m.div animate={{ top: currentVisualViewportHeight + scrollYAtkeyboardOpen }} style={{ position: "fixed", top: window.innerHeight, transform: "translateY(-100%)", width: "100%" }} >
            <Container className={isIOSKeyboardOpened ? "no-gutter" : "column-padding"}>
                <Button
                    {...props}
                    variant="contained"
                    className="main-action-button"
                    sx={{  ...isIOSKeyboardOpened ? { borderRadius: 0 } : {}}}
                >
                    확인
                </Button>
            </Container>
        </m.div>
    );
}
export default IOSResponsiveFab;