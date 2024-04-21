/* React */
import { Outlet, useLocation } from "@remix-run/react";

/* Externals */
import { useEffect } from "react";
import LoginContent from "../content/login/LoginContent";
import { useIsAuthorized } from "../reducers/authReducer";

interface AuthRecommendedPageProps {

};

function AuthRecommendedPage({ }: AuthRecommendedPageProps) {

    /* Hooks */
    const { pathname } = useLocation();

    const isAuthorized = useIsAuthorized();

    useEffect(() => {
        console.log(`[AuthRecommendedPage] pathname=${pathname}`)
    }, [pathname])

    return (
        <>
            {
                !isAuthorized &&
                <LoginContent />
            }
            <div style={{ display: isAuthorized ? 'block' : 'none' }}>
                <Outlet />
            </div>
        </>
    );
}
export default AuthRecommendedPage;