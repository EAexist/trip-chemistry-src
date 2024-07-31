import { useEffect } from "react";
import { useParams } from "~/router-module";
import LoadRequiredContent from "../../content/LoadRequiredContent";
import withReducer from "../../hocs/withReducer";
import chemistryReducer, { asyncGetChemistry, useChemistryLoadStatus } from "../../reducers/chemistryReducer";

import ChemistryContent from "../../content/chemistry/ChemistryContent";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { LoadStatus } from "../../reducers";
import { useGetProfile } from "../../reducers/authReducer";
import { useAppDispatch, useAppSelector } from "../../store";

const ChemistryPage = () => {

    /* Hooks */
    const navigate = useNavigateWithGuestContext();
    const dispatch = useAppDispatch();
    const params = useParams();
    const chemistryId = params.chemistryId;

    /* Reducers */
    const [chemistryLoadStatus, setChemistryLoadStatus] = useChemistryLoadStatus();
    const getProfile = useGetProfile();

    /* Event Handlers */
    const handleChemistrySuccess = () => {
        getProfile();
    }
    const handleFail = () => {
        navigate('/');
    }

    /* 케미스트리 데이터 불러오기 */
    const id = useAppSelector((state) => state.chemistry.data.id)
    useEffect(() => {
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
    }, [chemistryLoadStatus, dispatch, setChemistryLoadStatus]);

    const chemistry = useAppSelector((state)=>state.chemistry.data)

    return (
        <LoadRequiredContent
            status={chemistryLoadStatus}
            setStatus={setChemistryLoadStatus}
            handleSuccess={handleChemistrySuccess}
            handleFail={handleFail}
        >
            <ChemistryContent {...chemistry} />
        </LoadRequiredContent>
    )
}


export default withReducer(ChemistryPage)({ chemistry: chemistryReducer });