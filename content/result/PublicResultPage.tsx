/* React */
import { useEffect } from "react";

/* Externals */
import { useParams } from "~/router-module";

import { LoadStatus } from "../../reducers";
import resultReducer, { asyncGetPublicProfile, useResultLoadStatus } from "../../reducers/resultReducer";
import { useAppDispatch, useAppSelector } from "../../store";
import LoadRequiredContent from "../LoadRequiredContent";
import ResultContent from "./ResultContent";
import withReducer from "~/hocs/withReducer";

function PublicResultPage() {

    /* State */
    const params = useParams();
    const profileId = params.profileId ? params.profileId : "";

    const profile = useAppSelector((state) => state.result.data)

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
export default withReducer(PublicResultPage)({ result: resultReducer });