import { useCallback } from "react";
import { NavigateOptions, To, useNavigate, useSearchParams } from "~/router-module";

const useNavigateWithGuestContext = () => {

    /* Hooks */
    const navigate = useNavigate();

    const [ searchParams ] = useSearchParams();
    const guestId = searchParams.get('guestId');

    /* Try login when access code is generated. */
    return useCallback(( to: To, options?: NavigateOptions )=>{
        navigate( `${to}${ guestId ? `?guestId=${guestId}` : ''}`, options)
    }, [ guestId ])
}

export default useNavigateWithGuestContext;