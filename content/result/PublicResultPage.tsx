/* React */
import { useEffect } from "react";

/* Externals */
import { Toolbar } from "@mui/material";
import { useParams } from "react-router-dom";

import MainAppBar from "../../components/AppBar/MainAppBar";
import AppTitleButton from "../../components/Button/AppTitleButton";
import StartTestFab from "../../components/Button/StartTestFab";
import LoadRequiredContent from "../LoadRequiredContent";
import { LoadStatus } from "../../reducers";
import { asyncGetPublicProfile, useResultLoadStatus } from "../../reducers/resultReducer";
import { useAppDispatch, useAppSelector } from "../../store";
import ResultContent from "./ResultContent";

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