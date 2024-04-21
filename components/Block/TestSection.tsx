import { Toolbar } from "@mui/material";
import { ForwardedRef, PropsWithChildren, forwardRef } from "react";

const TestSection = forwardRef(({ children }: PropsWithChildren, ref: ForwardedRef<HTMLDivElement>) =>
    <div className="flex" style={{ height: '100%', overflow: 'hidden' }} ref={ref} >
        <Toolbar />
        <div className="top-nav__placeholder" />
        <div className="flex block--with-margin" style={{ flexGrow: 1 }}>
            {children}
        </div>
    </div>
);

export default TestSection;
