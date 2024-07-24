import { useCallback } from "react";
import { NavigateOptions, Path, To, useNavigate, useSearchParams } from "~/router-module";

const useNavigateWithGuestContext = () => {

    /* Hooks */
    const navigate = useNavigate();

    const [ searchParams, setSearchParams ] = useSearchParams();
    
    const guestId = searchParams.get('guestId');

    /* Try login when access code is generated. */
    return useCallback(( to: To, options?: NavigateOptions, hash?: string, )=>{
        if( typeof(to) === "string" ){
            console.log(`useNavigateWithGuestContext to=${to}`)
            navigate( `${to}${ guestId ? `?guestId=${guestId}` : ''}${( hash !== undefined ) && ( hash !== "" ) ? `#${hash}` : ''}`, options)
        }
        else{
            console.log(`useNavigateWithGuestContext to=${JSON.stringify(to)}`)
            navigate({ pathname: to.pathname, search: `${to.search && guestId ? '?' : ''}${to.search ? `${to.search.split('?')[1]}` : ''}${to.search && guestId ? '?' : ''}${guestId ? `guestId=${guestId}` : ''}`, hash: to.hash }, options)
        }
    }, [ guestId ])
}

export default useNavigateWithGuestContext;