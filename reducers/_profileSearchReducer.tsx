// /*** React ***/
// import { useCallback } from "react";

// import { useAppDispatch, useSelector } from "react-redux";
// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../common/axios";

// /*** Trip Chemistry ***/
// /* Component */
// import { useAppDispatch } from "../store";
// import { HEADERS_AXIOS } from "../common/app-const";
// import { IProfile, IProfileId } from "../interfaces/IProfile";
// import { IWithLoadStatus, LoadStatus } from "../interfaces/enums/LoadStatus";

// type IProfileSearchState = IWithLoadStatus<{
//     searchedProfileList: IProfile[],
//     flaggedProfileList: { [id: IProfileId]: IProfile },
// }>;

// /* State */
// const initialState: IProfileSearchState = {
//     data: {
//         searchedProfileList: [],
//         flaggedProfileList: {},
//     },
//     loadStatus: LoadStatus.REST,
// };

// /* Async Thunks */
// const asyncSearchProfile = createAsyncThunk("profileSearchSlice/asyncSearchProfile",
//     async (keyword: string, thunkAPI) => {
//         console.log(`[asyncSearchProfile] GET /profile/search?keyword=${keyword}`);
//         try {
//             const response = await axios.get(`/profile/search`,
//                 {
//                     method: "GET",
//                     headers: HEADERS_AXIOS,
//                     params: {
//                         keyword: keyword
//                     },
//                 });
//             return response.data;
//         }
//         catch (e: any) {
//             console.log(`[asyncSearchProfile] error: ${e}`);
//             return thunkAPI.rejectWithValue(e);
//         }
//     }
// );

// /* Slice */
// const profileSearchSlice = createSlice({
//     name: 'profileSearch',
//     initialState: initialState,
//     reducers: {
//         setSearchStatus: (state, action: PayloadAction<LoadStatus>) => {
//             state.loadStatus = action.payload;
//         },
//         addFlagged: (state, action: PayloadAction<IProfile>) => {
//             state.data.flaggedProfileList = {
//                 ...state.data.flaggedProfileList,
//                 [action.payload.id]: action.payload,
//             };
//         },
//         deleteFlagged: (state, action: PayloadAction<IProfileId>) => {
//             const newData = { ...state.data.flaggedProfileList }
//             delete newData[action.payload]
//             state.data.flaggedProfileList = newData
//         },
//         resetFlag: (state) => {
//             state.data.flaggedProfileList = {};
//         },
//         resetSearch: (state) => {
//             state.data.searchedProfileList = [];
//         },
//     },
//     extraReducers: (builder) => {

//         /* asyncSearchProfile */
//         builder.addCase(asyncSearchProfile.fulfilled, (state, action: PayloadAction<IProfile[]>) => {
//             console.log(`[asyncSearchProfile] fulfilled\n\tpayload=${action.payload}`);
//             // state.data.searchedProfileList = action.payload.map( profileDTO => profileDTOtoProfile(profileDTO) );
//             state.data.searchedProfileList = action.payload;
//             state.loadStatus = LoadStatus.SUCCESS;
//         });
//         builder.addCase(asyncSearchProfile.pending, (state, action) => {
//             console.log(`[asyncSearchProfile] pending`);
//             /* https://github.com/reduxjs/redux-toolkit/issues/776 */
//             state.loadStatus = LoadStatus.PENDING;
//         });
//         builder.addCase(asyncSearchProfile.rejected, (state, action) => {
//             console.log(`[asyncSearchProfile] rejected`);
//             state.loadStatus = LoadStatus.FAIL;
//         });
//     },
// })

// export const useAddProfiles = () => {
//     const dispatch = useAppDispatch();
//     const flaggedProfileList = useFlaggedProfileList();
//     return (
//         useCallback(() => {
//             console.log(`[useAddProfiles] Callback`);
//             Object.values(flaggedProfileList).forEach( profile => {
//                 console.log(`[useAddProfiles] profile=${JSON.stringify(profile)}`);
//                 // dispatch(
//                 //     setProfile( profile )
//                 // );
//             });
//             dispatch(profileSearchSlice.actions.resetFlag());
//         }, [ flaggedProfileList, dispatch ])
//     )
// }

// const useSearchedProfileList = () => {
//     return (
//         useAppSelector((state) => state.profileSearch.data.searchedProfileList)
//     );
// }

// const useFlaggedProfileList = () => {
//     return (
//         useAppSelector((state) => state.profileSearch.data.flaggedProfileList)
//     );
// }


// const useProfileSearchStatus = () => {
//     const dispatch = useAppDispatch(); /* Using useAppDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
//     return ([
//         useAppSelector((state) => state.profileSearch.loadStatus),
//         useCallback((loadStatus: LoadStatus) => {
//             dispatch( profileSearchSlice.actions.setSearchStatus( loadStatus )) ;
//         }, [ dispatch ])
//     ] as const);
// }

// export default profileSearchSlice.reducer;
// export type { IProfileSearchState }
// export const { resetSearch, addFlagged, deleteFlagged } = profileSearchSlice.actions;
// export { asyncSearchProfile, useSearchedProfileList, useFlaggedProfileList, useProfileSearchStatus };