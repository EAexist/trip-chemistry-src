
import { PropsWithChildren } from "react";

interface LabelProps {
    label?: string;
    labelSize?: 'medium' | 'large' | 'xlarge';
    isActive?: boolean
};

function Label({ label, labelSize = 'medium', children, isActive = false }: PropsWithChildren<LabelProps>) {

    return (
        <div className={"Label"}>
            <div>
            { children }
            </div>
            {
                ( label !== undefined )
                && <p className={`Label__label-${ labelSize } typography--profile-label ${ isActive ? "typography--profile-label--active" : "" }`}>
                    { label }
                </p>
            }            
        </div>
    );
}
export default Label;
export type { LabelProps };