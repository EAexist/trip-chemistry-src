/* React */
import { useEffect, useState } from "react";

/* Externals */
import { json, useParams } from "~/router-module";

import { HEADERS_AXIOS } from "~/src/constants/app-const";
import { IProfile } from "~/src/interfaces/IProfile";
import axios from "../../axios";
import ResultContent from "./ResultContent";
import ResultContentFallback from "./ResultContentFallback";
import ErrorBoundaryPage from "../ErrorBoundaryPage";

function PublicResultPage() {

    /* State */
    const params = useParams();
    const profileId = params.profileId ? params.profileId : "";
    
 	const [profile, setProfile] = useState<IProfile>();
    const [errorResponse, setErrorResponse] = useState()
  
     useEffect(() => {
         const fetchProfile = async () => {
             const res = await axios.get( "/profile",
                {
                    method: "GET",
                    headers: HEADERS_AXIOS,
                    params: {
                        id: profileId
                    },
                },
            )
            .then((res)=>{
                setProfile(res.data);
            })
            .catch(( error )=>{
                if( error.response ) {
                    setErrorResponse(error.response)
                }
            })
         }
         fetchProfile();
     }, []);

    return (
        errorResponse
        ?
        <ErrorBoundaryPage/>
        :
        profile
        ?
        <ResultContent {...profile} />
        :
        <ResultContentFallback/>
    );
}
export default PublicResultPage