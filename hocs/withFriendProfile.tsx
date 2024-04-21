import { ComponentType } from "react";
import { IProfileId } from "../interfaces/IProfile";
import { IProfile } from "../interfaces/IProfile";
import { useProfile } from "../reducers/chemistryReducer";

interface WithProfileProps extends IProfile { };

const withFriendProfile = <T extends Partial<WithProfileProps>>( WrappedComponent: ComponentType<T> ) =>
    ({ id, ...props }: Omit<T, keyof WithProfileProps> & { id : IProfileId }) => {

    const profile =  useProfile( id );

    return (
        <WrappedComponent
            {...profile as T}
            {...props as T}
        />
    );
}

export default withFriendProfile;
export type { WithProfileProps };