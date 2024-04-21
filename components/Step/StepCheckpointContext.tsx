import { ComponentType, PropsWithChildren, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type IdToIndex = { [key: string] : number };

interface StepCheckpointContextProps{
    idToIndex: IdToIndex;
    setIdToIndex: ( idToIndex: IdToIndex ) => void;
    stepCheckpointList: React.MutableRefObject<HTMLDivElement[]>;
} 

const StepCheckpointContext = createContext<StepCheckpointContextProps>({} as StepCheckpointContextProps);

function StepCheckpointContextProvider({ children }: PropsWithChildren) {

    const [ idToIndex, setIdToIndex ] = useState<IdToIndex>({} as IdToIndex) 
    const stepCheckpointList = useRef<HTMLDivElement[]>([]); 

    useEffect(()=>{        
        console.log(`[StepCheckpointContextProvider]  stepCheckpointList.current=${stepCheckpointList.current}`);

        stepCheckpointList.current.forEach((checkpoint, index)=>{
            console.log(`[StepCheckpointContextProvider] checkpoints[${index}]=${checkpoint.offsetTop}`);
        })
    }, [ stepCheckpointList ]);

    return (
        <StepCheckpointContext.Provider value={ { idToIndex : idToIndex, setIdToIndex : setIdToIndex, stepCheckpointList : stepCheckpointList } }>
            {children}
        </StepCheckpointContext.Provider>
    );
}

/**** Custom Hooks ****/
const useStepCheckpoint = () => useContext( StepCheckpointContext );

export const useScrollToCheckpoint = () => {

    const { stepCheckpointList } = useContext( StepCheckpointContext );

    return(
        useCallback(( index: number )=>{
            console.log(`[withSetStepOnChange]\n\tindex=${index}
                \tlength=${stepCheckpointList.current.length} 
            `);
            stepCheckpointList.current[index as number].scrollIntoView({ });
        }, [ stepCheckpointList ])
    )    
};

const useSetStepCheckpoint = ( 
        index: number, 
        // handleEntry : ([ entry ] : IntersectionObserverEntry[])=>void  = (() =>{}) 
    ) => {
    const { stepCheckpointList } = useStepCheckpoint();

    return({
        setCheckpoint: useCallback(( element: HTMLDivElement ) => {
            if (element){
                console.log(`[useSetStepCheckpoint] setCheckpoint. index=${index}`);
                stepCheckpointList.current[ index ] = element;
            }
        }, [ stepCheckpointList, index ]),

        removeCheckpoint: useCallback(() => {
            console.log(`[useSetStepCheckpoint] removeCheckpoint. index=${index}`);
            stepCheckpointList.current = stepCheckpointList.current.splice(index, 1);
        }, [ stepCheckpointList, index ]),    
    });
}

const useSetIdToIndex = ( idToIndex: IdToIndex ) => {
    
    const { setIdToIndex } = useStepCheckpoint();

    useEffect(()=>{
        setIdToIndex( idToIndex );
    }, [ idToIndex ])
};

/**** HOCs ****/
const withStepCheckpointContext = <T extends {}>( WrappedComponent: ComponentType<T> ) => ( props : T ) => {

    const [ idToIndex, setIdToIndex ] = useState<IdToIndex>({} as IdToIndex) 
    const stepCheckpointList = useRef<HTMLDivElement[]>([]); 

    return(
        <StepCheckpointContext.Provider value={ { idToIndex, setIdToIndex, stepCheckpointList } }>
            <WrappedComponent {...props}/>
        </StepCheckpointContext.Provider>
    )
}

export default StepCheckpointContext;

export { StepCheckpointContextProvider }
export { useStepCheckpoint, useSetStepCheckpoint, useSetIdToIndex };
export { withStepCheckpointContext };

export type { IdToIndex };