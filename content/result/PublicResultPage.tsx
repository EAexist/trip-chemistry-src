/* React */
import { useEffect, useState } from "react";

/* Externals */
import { useParams } from "react-router-dom";
import axios from "axios";
import { Toolbar } from "@mui/material";

import { HEADERS_AXIOS } from "~/common/app-const";
import MainAppBar from "~/components/AppBar/MainAppBar";
import AppTitleButton from "~/components/Button/AppTitleButton";
import StartTestFab from "~/components/Button/StartTestFab";
import { defaultProfile, IProfile } from "~/interfaces/IProfile";
import { LoadStatus } from "~/reducers";
import LoadRequiredContent from "../LoadRequiredContent";
import ResultContent from "./ResultContent";

function PublicResultPage() {

    /* State */
    const params = useParams();
    const profileId = params.profileId ? params.profileId : "";
    const [loadStatus, setLoadStatus] = useState(LoadStatus.PENDING)
    const [profile, setProfile] = useState<IProfile>(defaultProfile);

    /* Side Effect */
    useEffect(() => {
        console.log(`[PublicResultPage] profileId=${profileId}`)

        /* API 요청 */
        if (profileId){
            console.log(`[PublicResultPage] profileId=${profileId}`)
            axios.get(`/profile`,
                {
                    method: "GET",
                    headers: HEADERS_AXIOS,
                    params: {
                        id: profileId
                    }
                })
                .then((response) => {
                    setLoadStatus(LoadStatus.SUCCESS)
                    setProfile({
                        ...response.data as IProfile
                    });
                });
        }
    }, [ profileId ])

    return (
        <LoadRequiredContent status={loadStatus} setStatus={setLoadStatus}>
            <div className="page fill-window">
                <MainAppBar >
                    <AppTitleButton />
                    {/* <m.h1 {...FADEIN_VIEWPORT} className="section-title">{strings.sections.character.title}</m.h1> */}
                </MainAppBar>
                <Toolbar />
                <ResultContent {...profile} />
                <div className="fab-placeholder fab-placeholder--no-margin"/>
                <StartTestFab label="내 여행 타입 알아보기" />
            </div >
        </LoadRequiredContent>
    );
}
export default PublicResultPage;