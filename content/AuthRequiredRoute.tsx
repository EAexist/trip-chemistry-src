/* React */
import { Navigate, Outlet, useSearchParams } from "~/router-module";

/* Externals */
import APIFetchFallbackPage from "~/components/APIFetchFallbackPage";
import { useIsAuthorized } from "../reducers/authReducer";

function AuthRequiredRoute(){

    /* States */
    // const [ title, setTitle ] = useState<string>();

    /* Hooks */

    const [searchParams] = useSearchParams();
    const guestId = searchParams.get('guestId');

    const isAuthorized = useIsAuthorized();
    
    // useEffect(() => {
    //     console.log(`[AuthRequiredRoute] pathname=${pathname}`)
    //     setTitle(
    //         pathname === '/test'
    //         ?
    //         undefined :
    //         pathname === '/result'
    //         ?
    //         '내 여행 타입을 확인해보세요'
    //         :
    //         pathname === '/myChemistry'
    //         ?
    //         '친구들과 나의 여행 타입을 비교해보세요'
    //         :
    //         undefined
    //     )
    // }, [ pathname ])

    return (
        (guestId === null)
        ?
        <Navigate to="/login" />
        :
        isAuthorized
        ?
        <Outlet />
        : 
        <APIFetchFallbackPage/>
    );
}
export default AuthRequiredRoute;