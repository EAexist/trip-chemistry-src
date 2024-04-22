import { Outlet, useParams } from "~/router-module";
import chemistryReducer, { asyncGetChemistry, useChemistryLoadStatus } from "../reducers/chemistryReducer";
import withReducer from "../hocs/withReducer";
import LoadRequiredContent from "../content/LoadRequiredContent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { LoadStatus } from "../reducers";
import useNavigateWithGuestContext from "../hooks/useNavigateWithGuestContext";
import { useGetProfile } from "../reducers/authReducer";

const ChemistryRoute = () => {

    /* Hooks */
    const navigate = useNavigateWithGuestContext();
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const chemistryId = params.chemistryId ? params.chemistryId : "";

    /* Reducers */
    const [chemistryLoadStatus, setChemistryLoadStatus] = useChemistryLoadStatus();
    const getProfile = useGetProfile();

    /* Event Handlers */
    const handleChemistrySuccess = () => {
        getProfile();
    }
    const handleFail = () => {
        navigate('/home');
    }

    /* 케미스트리 데이터 불러오기 */
    useEffect(() => {
        console.log(`[ChemistryRoute] chemistryId=${chemistryId}`);
        if (chemistryId) {
            dispatch(asyncGetChemistry(chemistryId));
        }
    }, [chemistryId, dispatch])

    useEffect(() => {
        if (chemistryLoadStatus === LoadStatus.SUCCESS) {
            // dispatch( setAllREST() );
            /* @TODO Animate */
            setChemistryLoadStatus(LoadStatus.REST);
        }
        console.log(`[ChemistryRoute] chemistryLoadStatus=${chemistryLoadStatus}`);
    }, [chemistryLoadStatus, dispatch, setChemistryLoadStatus]);

    return (
        <LoadRequiredContent
            status={chemistryLoadStatus}
            setStatus={setChemistryLoadStatus}
            handleSuccess={handleChemistrySuccess}
            handleFail={handleFail}
        >
            <Outlet />
        </LoadRequiredContent>
    )
}


export default withReducer(ChemistryRoute)({ chemistry: chemistryReducer });