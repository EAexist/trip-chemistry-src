// import { Outlet, useNavigate } from "~/router-module";
// import { useAuthorize, useGuestLogin } from "../reducers/authReducer";
// import { AuthLoadRequiredContent } from "../content/LoadRequiredContent";

// interface GuestRouteProps {

// };

// function GuestRoute({ }: GuestRouteProps) {

//     /* Hooks */
    
//     /* Guest 접속 주소일 경우 주소의 id를 이용해 게스트로 로그인. */
//     useGuestLogin();

//     const navigate = useNavigateWithGuestContext();
//     const authorize = useAuthorize();

//     /* Event Handler */
//     const handleSuccess = authorize
//     const handleFail = () => {
//         navigate('/home');
//     }

//     return (
//         <AuthLoadRequiredContent
//             handleSuccess={handleSuccess}
//             failText="페이지를 찾을 수 없어요."
//             handleFail={handleFail}
//             handleFailButtonText="홈 화면으로 돌아가기"
//         >
//             <Outlet />
//         </AuthLoadRequiredContent>
//     );
// }
// export default GuestRoute;