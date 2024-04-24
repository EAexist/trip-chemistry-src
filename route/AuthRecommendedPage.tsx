// /* React */
// import { Outlet, useLocation } from "~/router-module";

// /* Externals */
// import { useEffect } from "react";
// import LoginContent from "../content/login/LoginContent";
// import { useIsAuthorized } from "../reducers/authReducer";

// function AuthRecommendedPage() {

//     /* Hooks */
//     const { pathname } = useLocation();

//     const isAuthorized = useIsAuthorized();

//     useEffect(() => {
//         console.log(`[AuthRecommendedPage] pathname=${pathname}`)
//     }, [pathname])

//     return (
//         <>
//             {
//                 !isAuthorized &&
//                 <LoginContent />
//             }
//             <div style={{ display: isAuthorized ? 'block' : 'none' }}>
//                 <Outlet />
//             </div>
//         </>
//     );
// }
// export default AuthRecommendedPage;