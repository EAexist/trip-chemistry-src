import { ComponentType } from "react";
import { IProfileId } from "../interfaces/IProfile";
import { IProfile } from "../interfaces/IProfile";
import { useUserProfile } from "../reducers/authReducer";

interface WithProfileProps extends IProfile { };

const withUserProfile = <T extends Partial<WithProfileProps>>( WrappedComponent: ComponentType<T> ) =>
    ({ ...props }: Omit<T, keyof WithProfileProps>) => {

    const profile =  useUserProfile();

    return (
        <WrappedComponent
            {...profile as unknown as T}
            {...props as T}
        />
    );
}

export default withUserProfile;
export type { WithProfileProps };