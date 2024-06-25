import { Toolbar } from "@mui/material";
import { ForwardedRef, PropsWithChildren, forwardRef } from "react";

const TestSection = forwardRef(({ className, children }: PropsWithChildren<{ className? : string }>, ref: ForwardedRef<HTMLDivElement>) =>
    <div style={{ height: '100%', overflow: 'hidden' }} ref={ref} >
        <Toolbar />
        {/* <div className="top-nav__placeholder" /> */}
        <div className={`section ${className}`} style={{ flexGrow: 1 }}>
            {children}
        </div>
    </div>
);

export default TestSection;
