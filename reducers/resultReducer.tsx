/*** React ***/
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useCallback } from "react";

import axios from "../common/axios";

/*** Trip Chemistry ***/
import { HEADERS_AXIOS } from "../common/app-const";
import { IProfile, IProfileId, defaultProfile } from "../interfaces/IProfile";
import { IWithLoadStatus, LoadStatus } from "../interfaces/enums/LoadStatus";
import { useAppDispatch, useAppSelector } from "../store";

export interface IResultState extends IWithLoadStatus<IProfile> {
};

/* Async Thunks */
export const asyncGetPublicProfile = createAsyncThunk("resultSlice/asyncGetPublicProfile",
    async (id: IProfileId, thunkAPI) => {
        console.log(`[asyncGetPublicProfile] GET /profile?id=${id}`);
        try {
            const response = await axios.get(`/profile`,
                {
                    method: "GET",
                    headers: HEADERS_AXIOS,
                    params: {
                        id: id,
                    },
                });
            return response.data;
        }
        catch (e: any) {
            console.log(`[asyncGetPublicProfile] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

/* State */
const initialState: IResultState = ({
    data: defaultProfile,
    loadStatus: LoadStatus.REST,
});

/* Slice */
const resultSlice = createSlice({
    name: 'result',
    initialState: initialState,
    reducers: {
        setLoadStatus: (state, action: PayloadAction<LoadStatus>) => {
            state.loadStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        /* asyncGetPublicProfile */
        builder.addCase(asyncGetPublicProfile.fulfilled, (state, action: PayloadAction<IProfile>) => {
            console.log(`[asyncGetPublicProfile] fulfilled\n\tpayload=${JSON.stringify(action.payload as IProfile)}`);
            state.data = {
                ...state.data,
                ...action.payload
            };
            state.loadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncGetPublicProfile.pending, (state, action) => {
            console.log(`[asyncGetPublicProfile] pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncGetPublicProfile.rejected, (state, action) => {
            console.log(`[asyncGetPublicProfile] rejected`);
            state.loadStatus = LoadStatus.FAIL;
        });

    },
})
const useResultLoadStatus = () => {
    const dispatch = useAppDispatch();

    return ([
        useAppSelector((state) => state.result.loadStatus),
        useCallback((status: LoadStatus) => {
            dispatch(resultSlice.actions.setLoadStatus(status));
        }, [dispatch]),
    ] as const);
}

const useGetProfile = (id: IProfileId) => {
    const dispatch = useAppDispatch(); /* Using useAppDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

    return useCallback(() => {
        dispatch(asyncGetPublicProfile(id));
    }
        , [dispatch, id]);
}

export default resultSlice.reducer;

export { useResultLoadStatus, useGetProfile };
