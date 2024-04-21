import { PropsWithChildren } from "react";
import { useSetStepCheckpoint } from "../StepCheckpointContext";

interface scrollCheckpointProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    index: number;
};

function Step({ index, children, ...props } : PropsWithChildren<scrollCheckpointProps>){

    const { setCheckpoint } = useSetStepCheckpoint( 
        index, 
        // useCallback(([ entry ] : IntersectionObserverEntry[])=>{
        //     if ( entry.isIntersecting ){
        //         console.log(`[Step] isIntersecting index=${index}`);
        //         setStep(index);
        //         if( props.id ){
        //             navigate( location+props.id, { replace: true });
        //         }
        //     }
        // }, [ index, setStep, location, navigate, props.id ]) 
    );

    return(
        <div ref={setCheckpoint} {...props}>
            { children }
        </div>
    );
}
export default Step;