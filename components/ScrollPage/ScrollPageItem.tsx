/* React */
import { PropsWithChildren, useRef } from "react";

/* Framer Motion */
import { m } from 'framer-motion';

/* App */
import { FADEIN } from "../../motion/props";
import { usePage } from "./PageContext";

/*  ScrollPageItem
    description: Wrapper that renderes wrapped element when sticky container is scrolled to corresponding page(prop) 
*/

interface ScrollPageItemProps {
    page: number
    className?: string
};

const ScrollPageItem = ({ page, children, className }: PropsWithChildren<ScrollPageItemProps>) => {

    const { activePage } = usePage();
    const pageRef = useRef<HTMLDivElement>(null);

    return (
        (activePage === page) &&
            <m.div
                ref={pageRef}
                {...FADEIN}
                className={`ScrollPageItem fill-window ${className}`}
            >
                {children}
            </m.div>
    );
};

export default ScrollPageItem;