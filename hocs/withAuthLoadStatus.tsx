import { ComponentType } from "react";
import { LoadStatus } from "../interfaces/enums/LoadStatus";
import { useAuthLoadStatus } from "../reducers/authReducer";

interface WithLoadStatusProps { 
    status?: LoadStatus;
    setStatus: ( status: LoadStatus ) => void;
};
interface WithAuthLoadStatusProps extends WithLoadStatusProps {};

const withAuthLoadStatus = <T extends WithAuthLoadStatusProps>( WrappedComponent: ComponentType<T> ) =>
    ( { ...props } : Omit<T, keyof WithAuthLoadStatusProps>) => {

    const [ status, setStatus ] = useAuthLoadStatus();

    return (
        <WrappedComponent
            {...{
                status, 
                setStatus, 
                ...props
            } as T}
        />
    );
}

export default withAuthLoadStatus;
export type { WithLoadStatusProps };
