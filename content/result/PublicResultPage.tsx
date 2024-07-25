/* React */
import { useEffect } from "react";

/* Externals */
import { useParams } from "react-router-dom";

import { LoadStatus } from "../../reducers";
import { asyncGetPublicProfile, useResultLoadStatus } from "../../reducers/resultReducer";
import { useAppDispatch, useAppSelector } from "../../store";
import LoadRequiredContent from "../LoadRequiredContent";
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
        if (profileId && (profileId !== profile.id)) {
            dispatch(asyncGetPublicProfile(profileId));
        }
    }, [profileId])

    useEffect(() => {
        if (resultLoadStatus === LoadStatus.SUCCESS) {
            setResultLoadStatus(LoadStatus.REST);
        }
    }, [resultLoadStatus]);


    return (
        <LoadRequiredContent status={resultLoadStatus} setStatus={setResultLoadStatus}>
            <ResultContent {...profile} />
        </LoadRequiredContent>
    );
}
export default PublicResultPage;