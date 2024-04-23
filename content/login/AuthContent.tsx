// /* React */
// import { Navigate, Outlet, useLocation } from "~/router-module";

// /* Externals */
// import { IUserProfile } from "../../interfaces/IUserProfile";
// import { useIsAuthorized, useUserProfile } from "../../reducers/authReducer";
// import { useEffect } from "react";

// interface AuthContentProps {

// };

// function AuthContent({ }: AuthContentProps) {

//     /* Hooks */
//     const { state } = useLocation();
//     const isAuthorized = useIsAuthorized();

//     /* Reducers */
//     const { id: userId, authProvider } = useUserProfile() as IUserProfile;

//     useEffect(() => {
//         if (state)
//             console.log(`[AuthContent] ${state}`);
//         if (state && state.loginRedirectPath)
//             console.log(`[AuthContent] ${state.loginRedirectPath}`);
//     }, [state])

//     return (
//         // isAuthorized
//         //     ?
//         //     <Navigate to={`${
//         //         ((state !== null) && state.loginRedirectPath)
//         //         ? state.loginRedirectPath
//         //         : '/home'}${
//         //             (authProvider === 'GUEST')
//         //             ? `?guestId=${userId}`
//         //             : ''}
//         //             `} />
//         //     :
//             /* Allow access by navigate( path, { state: {loginRedirectPath} }) only.
//                 Redirect access by URL to Homepage.
//             */
//             (state && state.loginRedirectPath)
//                 ?
//                 <Outlet />
//                 :
//                 // <Navigate to={'/home'} />
//                 <></>
//     );
// }
// export default AuthContent;