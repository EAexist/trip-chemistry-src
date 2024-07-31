/* React */
import { useEffect, useState } from "react";

/* Externals */
import { useParams } from "~/router-module";

import { HEADERS_AXIOS } from "~/src/constants/app-const";
import { IProfile } from "~/src/interfaces/IProfile";
import axios from "../../axios";
import ResultContent from "./ResultContent";
import ResultContentFallback from "./ResultContentFallback";

function PublicResultPage() {

    /* State */
    const params = useParams();
    const profileId = params.profileId ? params.profileId : "";
    
 	const [profile, setProfile] = useState<IProfile>();
  
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
            setProfile(res.data);
         }
         fetchProfile();
     }, []);

    return (
        profile
        ?
        <ResultContent {...profile} />
        :
        <ResultContentFallback/>
    );
}
export default PublicResultPage