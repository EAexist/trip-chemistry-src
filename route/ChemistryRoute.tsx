import { Outlet, useParams } from "~/router-module";
import chemistryReducer, { asyncGetChemistry, useChemistryLoadStatus } from "../reducers/chemistryReducer";
import withReducer from "../hocs/withReducer";
import LoadRequiredContent from "../content/LoadRequiredContent";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../store";
import { LoadStatus } from "../reducers";
import useNavigateWithGuestContext from "../hooks/useNavigateWithGuestContext";
import { useGetProfile } from "../reducers/authReducer";

const ChemistryRoute = () => {

    /* Hooks */
    const navigate = useNavigateWithGuestContext();
    const dispatch = useAppDispatch();
    const params = useParams();
    const chemistryId = params.chemistryId ? params.chemistryId : "";

    /* Reducers */
    const [chemistryLoadStatus, setChemistryLoadStatus] = useChemistryLoadStatus();
    const getProfile = useGetProfile();

    /* Event Handlers */
    // const handleChemistrySuccess = () => {
    //     getProfile();
    // }
    // const handleFail = () => {
    //     navigate('/home');
    // }

    /* 케미스트리 데이터 불러오기 */
    const id = useAppSelector((state) => state.chemistry.data.id)
    useEffect(() => {
        console.log(`[ChemistryRoute] chemistryId=${chemistryId}`);
        if (chemistryId && ( chemistryId !== id )) {
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
        // <LoadRequiredContent
        //     status={chemistryLoadStatus}
        //     setStatus={setChemistryLoadStatus}
        //     handleSuccess={handleChemistrySuccess}
        //     handleFail={handleFail}
        // >
            <Outlet />
        // </LoadRequiredContent>
    )
}


export default withReducer(ChemistryRoute)({ chemistry: chemistryReducer });