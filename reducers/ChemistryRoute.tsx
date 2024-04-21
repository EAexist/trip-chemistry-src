import { Outlet, useParams } from "~/router-module";
import chemistryReducer, { asyncGetChemistry, useChemistryLoadStatus } from "./chemistryReducer";
import withReducer from "../hocs/withReducer";
import LoadRequiredContent from "../content/LoadRequiredContent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { LoadStatus } from ".";
import useNavigateWithGuestContext from "../hooks/useNavigateWithGuestContext";
import { useGetProfile } from "./authReducer";

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

    const handleChemistryFail = () => {
        setChemistryLoadStatus(LoadStatus.REST);
    };

    const handleChemistrySuccess = () => {
        getProfile();
    }

    /* 케미스트리 데이터 불러오기 */
    useEffect(() => {
        console.log(`[ChemistryContent] chemistryId=${chemistryId}`);
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
        console.log(`[ChemistryContent] chemistryLoadStatus=${chemistryLoadStatus}`);
    }, [chemistryLoadStatus, dispatch, setChemistryLoadStatus]);

    return (
        <LoadRequiredContent
            status={chemistryLoadStatus}
            setStatus={setChemistryLoadStatus}
            handleSuccess={handleChemistrySuccess}
            handleFail={handleChemistryFail}
        >
            <Outlet />
        </LoadRequiredContent>
    )
}


export default withReducer(ChemistryRoute)({ chemistry: chemistryReducer });