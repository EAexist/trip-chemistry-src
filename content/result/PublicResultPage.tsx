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
import { useAppDispatch, useAppSelector } from "~/store";
import { asyncGetPublicProfile, useResultLoadStatus } from "~/reducers/resultReducer";

function PublicResultPage() {

    /* State */
    const params = useParams();
    const profileId = params.profileId ? params.profileId : "";
    
    const profile = useAppSelector((state) => state.result.data)

    useEffect(() => {
        console.log("scrollY", window.scrollY)
    }, [])

    const dispatch = useAppDispatch()
    const [resultLoadStatus, setResultLoadStatus] = useResultLoadStatus();

    useEffect(() => {
        if (profileId && ( profileId !== profile.id )) {
            dispatch(asyncGetPublicProfile(profileId));
        }
    }, [ profileId ])

    useEffect(() => {
        if (resultLoadStatus === LoadStatus.SUCCESS) {
            setResultLoadStatus(LoadStatus.REST);
        }
    }, [resultLoadStatus]);


    return (
        <LoadRequiredContent status={resultLoadStatus} setStatus={setResultLoadStatus}>
            {
                <div className="page fill-window">
                    <MainAppBar >
                        <AppTitleButton />
                        {/* <m.h1 {...FADEIN_VIEWPORT} className="section-title">{strings.sections.character.title}</m.h1> */}
                    </MainAppBar>
                    <Toolbar />
                    <ResultContent {...profile} />
                    <div className="fab-placeholder fab-placeholder--no-margin" />
                    <StartTestFab label="내 여행 타입 알아보기" />
                </div >
            }
        </LoadRequiredContent>
    );
}
export default PublicResultPage;