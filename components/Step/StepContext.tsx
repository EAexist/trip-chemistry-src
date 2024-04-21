import { ComponentType, PropsWithChildren, createContext, useContext, useState } from "react";

type DynamicStep = [ step: number, isIncrementing: boolean ];

interface StepContextProps{
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
} 

const StepContext = createContext<StepContextProps>({} as StepContextProps);

export function StepContextProvider({ children }: PropsWithChildren) {

    const [ step, setStep ] = useState<number>(0); 

    return (
        <StepContext.Provider value={{ step, setStep }}>
            {children}
        </StepContext.Provider>
    );
}

const withStepContext = <T extends {}>( WrappedComponent: ComponentType<T> ) => ( props : T ) => {

    const [ step, setStep ] = useState<number>(0); 

    return(
        <StepContext.Provider value={{ step, setStep }}>
            <WrappedComponent {...props}/>
        </StepContext.Provider>
    )
}

const useStep = () => useContext(StepContext).step;
const useSetStep = () => useContext(StepContext).setStep;
const useStepContext = () => useContext(StepContext);

export default StepContext;

export { withStepContext, useStepContext, useStep, useSetStep }
export type { DynamicStep };