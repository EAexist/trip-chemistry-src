/* React */
import { Navigate, Outlet, useLocation } from "~/router-module";

/* Externals */
import { useEffect } from "react";
import { useIsAuthorized } from "../reducers/authReducer";
import LoginContent from "../content/login/LoginContent";

interface AuthRequiredRouteProps {

};

function AuthRequiredRoute({ }: AuthRequiredRouteProps) {

    /* Hooks */
    const { pathname }  = useLocation();

    const isAuthorized = useIsAuthorized();
    
    useEffect(() => {
        console.log(`[AuthRequiredRoute] pathname=${pathname}`)
    }, [ pathname ])

    return (
        isAuthorized
        ?
        <Outlet />
        : 
        <LoginContent />
    );
}
export default AuthRequiredRoute;