
import { PropsWithChildren } from "react";

interface LabelProps {
    label?: string;
    labelSize?: 'medium' | 'large' | 'xlarge';
    isActive?: boolean
    showLabel?: boolean
    renderLabel?: boolean
};
 
function Label({ label, labelSize = 'medium', children, isActive = false, renderLabel = true, showLabel = true }: PropsWithChildren<LabelProps>) {

    return (
        <div className={"Label"}>
            {/* <div> */}
                {children}
            {/* </div> */}
            {
                (renderLabel)
                && <p className={`Label__label-${labelSize} typography--profile-label ${isActive ? "typography--profile-label--active" : ""}`}
                    style={showLabel ? {} : { color: "transparent" }}>
                    {label}
                </p>
            }
        </div>
    );
}
export default Label;
export type { LabelProps };