// /*** React ***/
// import { useCallback, useEffect, useState } from "react";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// /*** Trip Chemistry ***/
// /* Component */
// 
// import { IWithLoadStatus, LoadStatus, IProfileId } from ".";
// import { ITestAnswer, ITestKey } from "./testAnswerReducer";
// import { ITestResult, defaultTestResult } from "../interfaces/ITestResult";
// import { HEADERS_AXIOS } from "../common/app-const";
// import { useUserId } from "./authReducer";
// import { IProfile, defaultProfile } from "../interfaces/IProfile";

// /* Types */
// type IProfileDataState = {
//     data: { [id: IProfileId]: IWithLoadStatus<IProfile> };
//     sampleLoadStatus: LoadStatus;
// };

// export const getNameTag = (profile: IProfile) => (
//     `${profile.nickname}#${profile.discriminator}`
// )

// // export class Profile implements IProfile {
// //     id: string;
// //     nickname: string;
// //     discriminator: string;
// //     testAnswer: IWithLoadStatus<ITestAnswer>;
// //     testResult: IWithLoadStatus<ITestResult>;

// //     constructor(id: string, nickname: string, discriminator: string, testAnswer: IWithLoadStatus<ITestAnswer>, testResult: IWithLoadStatus<ITestResult>) {
// //         this.id = id;
// //         this.nickname = nickname;
// //         this.discriminator = discriminator;
// //         this.testAnswer = testAnswer;
// //         this.testResult = testResult;
// //     }

// //     getNameTag(): string {
// //         return `${this.nickname}#${this.discriminator}`;
// //     }
// // };

// export interface IProfileDTO {
//     id: string;
//     nickname: string;
//     discriminator: string;
//     testAnswer: ITestAnswer;
//     testResult: ITestResult;
// };

// const withloadStatus = <T extends {}>(data?: T, defaultData?: T) => ({
//     data: data ? data : defaultData,
//     loadStatus: data ? LoadStatus.REST : LoadStatus.MISS
// } as IWithLoadStatus<T>)

// export const profileDTOtoProfile = (profileDTO: IProfileDTO) => ({
//     ...profileDTO,
//     testAnswer: withloadStatus(profileDTO.testAnswer, {} as ITestAnswer),
//     testResult: withloadStatus(profileDTO.testResult, defaultTestResult),
// } as IProfile)

// type ProfileKey = keyof IProfile;
// type TestDataKey = 'testAnswer' | 'testResult';

// const initialState: IProfileDataState = {
//     data: {},
//     sampleLoadStatus: LoadStatus.REST
// };

// export const asyncGetProfile = createAsyncThunk("profileSlice/asyncGetProfile",
//     async ({ id, keyList = [] }: { id: IProfileId, keyList?: TestDataKey[] }, thunkAPI) => {
//         console.log(`[asyncGetProfile] GET /profile?id=${id}`);
//         try {
//             const response = await axios.get(`/profile`,
//                 {
//                     method: "GET",
//                     headers: HEADERS_AXIOS,
//                     params: {
//                         id: id,
//                     },
//                 });
//             return response.data;
//         }
//         catch (e: any) {
//             console.log(`[asyncGetProfile] error: ${e}`);
//             return thunkAPI.rejectWithValue(e);
//         }
//     }
// );

// export const asyncGetInfo = createAsyncThunk("profileSlice/asyncGetInfo",
//     async ({ id, keyList = [] }: { id: IProfileId, keyList?: TestDataKey[] }, thunkAPI) => {
//         console.log(`[asyncGetInfo] GET /profile/info?id=${id}`);
//         try {
//             const response = await axios.get(`/profile/info`,
//                 {
//                     method: "GET",
//                     headers: HEADERS_AXIOS,
//                     params: {
//                         id: id,
//                     },
//                 });
//             return response.data;
//         }
//         catch (e: any) {
//             console.log(`[asyncGetInfo] error: ${e}`);
//             return thunkAPI.rejectWithValue(e);
//         }
//     }
// );

// const asyncGetTestResult = createAsyncThunk("profileSlice/asyncGetTestResult",
//     async (id: IProfileId, thunkAPI) => {
//         console.log(`[asyncGetTestResult] GET /profile/result?id=${id}`);
//         try {
//             const response = await axios.get(`/profile/result`,
//                 {
//                     method: "GET",
//                     headers: HEADERS_AXIOS,
//                     params: { id: id },
//                 });
//             return { id, ...response.data };
//         }
//         catch (e: any) {
//             console.log(`[asyncGetTestResult] error: ${e}`);
//             return thunkAPI.rejectWithValue(e);
//         }
//     }
// );

// const asyncGetTestAnswer = createAsyncThunk("profileSlice/asyncGetTestAnswer",
//     async (id: IProfileId, thunkAPI) => {
//         console.log(`[asyncGetTestAnswer] GET /profile/answer?id=${id}`);
//         try {
//             const response = await axios.get(`/profile/answer`,
//                 {
//                     method: "GET",
//                     headers: HEADERS_AXIOS,
//                     params: { id: id },
//                 });
//             return { id, ...response.data };
//         }
//         catch (e: any) {
//             console.log(`[asyncGetTestAnswer] error: ${e}`);
//             return thunkAPI.rejectWithValue(e);
//         }
//     }
// );

// export const asyncGetSampleProfiles = createAsyncThunk("profileSlice/asyncGetSampleProfiles",
//     async (_, thunkAPI) => {
//         console.log(`[asyncGetSampleProfiles] GET /profile/sample`);
//         try {
//             const response = await axios.get(`/profile/sample`,
//                 {
//                     method: "GET",
//                     headers: HEADERS_AXIOS,
//                 });
//             return response.data;
//         }
//         catch (e: any) {
//             console.log(`[asyncGetSampleProfiles] error: ${e}`);
//             return thunkAPI.rejectWithValue(e);
//         }
//     }
// );

// export const asyncPutNickname = createAsyncThunk("profileSlice/asyncPutNickname",
//     async ({ id, value }: { id: IProfileId, value: String }, thunkAPI) => {
//         console.log(`[asyncPutNickname] PUT /profile/setNickname?id=${id}&value=${value}`);
//         try {
//             const response = await axios.put(`/profile/setNickname`,
//                 {
//                     value: value
//                 },
//                 {
//                     method: "PUT",
//                     headers: HEADERS_AXIOS,
//                     params: {
//                         id: id,
//                     },
//                 });
//             return response.data;
//         }
//         catch (e: any) {
//             console.log(`[asyncPutNickname] error: ${e}`);
//             return thunkAPI.rejectWithValue(e);
//         }
//     }
// );

// const profileSlice = createSlice({
//     name: 'profile',
//     initialState: initialState,
//     reducers: {
//         addProfile: (state, action: PayloadAction<IProfileId>) => {
//             if (Object.keys(state).includes(action.payload)) {
//                 console.log(`[profile.addProfile] warning: id ${action.payload} already exists.`)
//             }
//             state.data[action.payload] = {
//                 // ...state.data[action.payload],
//                 data: {
//                     ...defaultProfile,
//                     id: action.payload,
//                 },
//                 loadStatus: LoadStatus.REST
//             };
//         },
//         setProfile: (state, action: PayloadAction<IProfile>) => {
//             console.log(`[profile.setProfile]\n\tid=${action.payload.id} data=${JSON.stringify(action.payload)}`);
//             state.data[action.payload.id] = {
//                 data: action.payload,
//                 loadStatus: LoadStatus.REST
//             };
//         },
//         setStatus: (state, action: PayloadAction<{ loadStatus: LoadStatus, id?: IProfileId, key?: TestDataKey }>) => {
//             if (action.payload.id !== undefined) {
//                 if (action.payload.key === undefined) {
//                     state.data[action.payload.id].loadStatus = action.payload.loadStatus;
//                 }
//                 else {
//                     state.data[action.payload.id].data[action.payload.key].loadStatus = action.payload.loadStatus;
//                 }
//             }
//         },
//         setAllREST: (state) => {
//             Object.entries(state.data).forEach(([, { data }]) => {
//                 data.testAnswer.loadStatus = LoadStatus.REST;
//                 data.testResult.loadStatus = LoadStatus.REST;
//             })
//         },
//         setStatusAll: (state, action: PayloadAction<{ loadStatus: LoadStatus, key: TestDataKey }>) => {
//             Object.entries(state.data).forEach(([, { data }]) => {
//                 data[action.payload.key].loadStatus = action.payload.loadStatus;
//             })
//         },
//         deleteUser: (state, action: PayloadAction<IProfileId>) => {
//             delete state.data[action.payload];
//         },
//     },
//     extraReducers: (builder) => {

//         /* asyncGetProfile */
//         builder.addCase(asyncGetProfile.fulfilled, (state, action: PayloadAction<IProfileDTO>) => {
//             console.log(`[asyncGetProfile] fulfilled\n\taction.payload=${JSON.stringify(action.payload as IProfileDTO)}\n }`);
//             state.data[action.payload.id].data = {
//                 ...state.data[action.payload.id].data,
//                 ...profileDTOtoProfile(action.payload),
//             };
//             state.data[action.payload.id].loadStatus = LoadStatus.SUCCESS;
//         });
//         builder.addCase(asyncGetProfile.pending, (state, action) => {
//             console.log(`[asyncGetProfile] pending`);
//             /* https://github.com/reduxjs/redux-toolkit/issues/776 */
//             state.data[action.meta.arg.id].loadStatus = LoadStatus.PENDING;
//         });
//         builder.addCase(asyncGetProfile.rejected, (state, action) => {
//             console.log(`[asyncGetProfile] rejected`);
//             state.data[action.meta.arg.id].loadStatus = LoadStatus.FAIL;
//         });

//         /* asyncPutNickname */
//         builder.addCase(asyncPutNickname.fulfilled, (state, action: PayloadAction<IProfileDTO>) => {
//             console.log(`[asyncPutNickname] fulfilled\n\tpayload=${JSON.stringify(action.payload)}`);
//             state.data[action.payload.id].data = {
//                 ...state.data[action.payload.id].data,
//                 ...profileDTOtoProfile(action.payload),
//             };
//             state.data[action.payload.id].loadStatus = LoadStatus.SUCCESS;
//         });
//         builder.addCase(asyncPutNickname.pending, (state, action) => {
//             console.log(`[asyncPutNickname] pending`);
//             /* https://github.com/reduxjs/redux-toolkit/issues/776 */
//             state.data[action.meta.arg.id].loadStatus = LoadStatus.PENDING;
//         });
//         builder.addCase(asyncPutNickname.rejected, (state, action) => {
//             console.log(`[asyncPutNickname] rejected`);
//             state.data[action.meta.arg.id].loadStatus = LoadStatus.FAIL;
//         });

//         /* asyncGetSampleProfiles */
//         builder.addCase(asyncGetSampleProfiles.fulfilled, (state, action: PayloadAction<IProfileDTO[]>) => {
//             console.log(`[asyncGetSampleProfiles] fulfilled\n\tpayload=${JSON.stringify(action.payload)}`);
//             state.data = {
//                 ...state.data,
//                 ...Object.fromEntries(action.payload.map(profileDTO => [profileDTO.id, withloadStatus(profileDTOtoProfile(profileDTO))]))
//             }
//             state.sampleLoadStatus = LoadStatus.SUCCESS;
//         });
//         builder.addCase(asyncGetSampleProfiles.pending, (state, action) => {
//             console.log(`[asyncGetSampleProfiles] pending`);
//             /* https://github.com/reduxjs/redux-toolkit/issues/776 */
//             state.sampleLoadStatus = LoadStatus.PENDING;
//         });
//         builder.addCase(asyncGetSampleProfiles.rejected, (state, action) => {
//             console.log(`[asyncGetSampleProfiles] rejected`);
//             state.sampleLoadStatus = LoadStatus.FAIL;
//         });

//         /* asyncGetInfo */
//         builder.addCase(asyncGetInfo.fulfilled, (state, action: PayloadAction<IProfileDTO>) => {
//             console.log(`[asyncGetInfo] fulfilled\n\taction.payload=${JSON.stringify(action.payload as IProfileDTO)}\n }`);
//             state.data[action.payload.id].data = {
//                 ...state.data[action.payload.id].data,
//                 ...profileDTOtoProfile(action.payload),
//             };
//             state.data[action.payload.id].loadStatus = LoadStatus.SUCCESS;
//         });
//         builder.addCase(asyncGetInfo.pending, (state, action) => {
//             console.log(`[asyncGetInfo] pending`);
//             /* https://github.com/reduxjs/redux-toolkit/issues/776 */
//             state.data[action.meta.arg.id].loadStatus = LoadStatus.PENDING;
//         });
//         builder.addCase(asyncGetInfo.rejected, (state, action) => {
//             console.log(`[asyncGetInfo] rejected`);
//             state.data[action.meta.arg.id].loadStatus = LoadStatus.FAIL;
//         });

//         /* asyncGetTestResult */
//         builder.addCase(asyncGetTestResult.fulfilled, (state, action: PayloadAction<{ id: IProfileId, testResult: ITestResult }>) => {
//             console.log(`[asyncGetTestResult] fulfilled\n\taction.payload=${JSON.stringify(action.payload)}\n }`)
//             if (action.payload.testResult) {
//                 state.data[action.payload.id].data = {
//                     ...state.data[action.payload.id].data,
//                     testResult: {
//                         data: action.payload.testResult,
//                         loadStatus: LoadStatus.SUCCESS,
//                     }
//                 }
//             }
//             else {
//                 state.data[action.payload.id].data.testResult.loadStatus = LoadStatus.MISS;
//             }
//         });
//         builder.addCase(asyncGetTestResult.pending, (state, action) => {
//             console.log(`[asyncGetTestResult] pending`);
//             /* https://github.com/reduxjs/redux-toolkit/issues/776 */
//             state.data[action.meta.arg].data.testResult.loadStatus = LoadStatus.PENDING;
//         });
//         builder.addCase(asyncGetTestResult.rejected, (state, action) => {
//             console.log(`[asyncGetTestResult] rejected`);
//             state.data[action.meta.arg].data.testResult.loadStatus = LoadStatus.FAIL;
//         });

//         /* asyncGetTestAnswer */
//         builder.addCase(asyncGetTestAnswer.fulfilled, (state, action: PayloadAction<{ id: IProfileId, testAnswer: ITestAnswer }>) => {
//             console.log(`[asyncGetTestAnswer] fulfilled\n\taction.payload=${JSON.stringify(action.payload)}\n }`)
//             if (action.payload.testAnswer) {
//                 state.data[action.payload.id].data = {
//                     ...state.data[action.payload.id].data,
//                     testAnswer: {
//                         data: action.payload.testAnswer,
//                         loadStatus: LoadStatus.SUCCESS,
//                     }
//                 }
//             }
//             else {
//                 state.data[action.payload.id].data.testAnswer.loadStatus = LoadStatus.MISS;
//             }
//         });
//         builder.addCase(asyncGetTestAnswer.pending, (state, action) => {
//             console.log(`[asyncGetTestAnswer].pending`);
//             state.data[action.meta.arg].data.testAnswer.loadStatus = LoadStatus.PENDING;
//         });
//         builder.addCase(asyncGetTestAnswer.rejected, (state, action) => {
//             console.log(`[asyncGetTestAnswer].rejected`);
//             state.data[action.meta.arg].data.testAnswer.loadStatus = LoadStatus.FAIL;
//         });

//     },
// })

// const useProfile: (id?: IProfileId) => IProfile = (id) => {
//     return (useAppSelector((state) => id
//         ? (Object.keys(state.profile.data).includes(id)
//             ? state.profile.data[id].data
//             : defaultProfile)
//         : defaultProfile));
// }

// const useProfileList: (key?: ProfileKey) => IProfile[] = (key) => {
//     return (useAppSelector((state) =>
//         Object.values(state.profile.data).map(({ data, loadStatus }) =>
//             key
//                 ? data
//                 : data
//         ))
//     );
// }

// function useProfileDataList<T extends (keyof IProfile) | IProfile>(idList?: IProfileId[], key?: keyof IProfile): T[] {
//     return (useAppSelector((state) =>
//         Object.entries(state.profile.data).filter(([k, v]) => idList ? idList.includes(k) : true)
//             .map(([k, { data }]) =>
//                 key
//                     ? data[key]
//                     : data
//             )
//     ) as T[]
//     );
// }

// const useUser: () => IProfile = () => {
//     const userId = useUserId();
//     return useProfile(userId);
// }

// const useProfileLoadStatus = (id: IProfileId, key?: TestDataKey) => {
//     const isAdded = useProfileIdList().includes(id);
//     const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
//     return ([
//         useAppSelector((state) => isAdded ? (key ? state.profile.data[id].data[key].loadStatus : state.profile.data[id].loadStatus) : undefined),
//         useCallback((loadStatus: LoadStatus) => {
//             if (isAdded) {
//                 dispatch(profileSlice.actions.setStatus({ loadStatus, id, key }));
//             }
//         }, [dispatch, id, key, isAdded])
//     ] as const);
// }

// const useProfileIdList = () => {
//     const idList = useAppSelector((state) => Object.keys(state.profile.data), shallowEqual);
//     // const idList = useSelector(( state:RootState ) => state.profile.idList );
//     useEffect(() => {
//         console.log(`useProfileList: idList=${idList}`);
//     }, [idList])
//     /* Use ShallowEqual */
//     return (idList);
// }

// const useTestAnswerObject = (testKey: ITestKey) => {

//     useEffect(() => {
//         console.log(`[useTestAnswerObject] Using`);
//     }, [])

//     return (
//         useAppSelector((state) =>
//             Object.fromEntries(
//                 Object.entries(state.profile.data).map(([id, { data }]) => {
//                     console.log(`[useTestAnswerObject]\n id=${id}\n profile.testAnswer=${JSON.stringify(data.testAnswer)}`);
//                     return ([id, data] as const);
//                 }).filter(([, data]) => data.testAnswer.loadStatus === LoadStatus.REST && Object.keys(data.testAnswer).length > 0)
//                     .map(([id, data]) => {
//                         return ([id, data.testAnswer[testKey]] as const)
//                     })
//             )
//             , shallowEqual
//         )
//     );
// };

// export default profileSlice.reducer;
// export const { addProfile, setProfile, setAllREST, deleteUser, setStatus, setStatusAll } = profileSlice.actions;
// export { asyncGetTestResult, asyncGetTestAnswer };
// export { useProfile, useProfileIdList, useTestAnswerObject, useUser, useProfileList, useProfileDataList, useProfileLoadStatus };
// export type { TestDataKey };

// /* Deprecated */
// // const useProfileStatus = (idList: IProfileId[], key: 'testResult' | 'testAnswer') => {

// //     const dispatch = useDispatch<AppDispatch>();

// //     return (useAppSelector((state) => idList.map((id) => ({
// //         status: state.profile.data[id].data[key].loadStatus,
// //         setStatus: (loadStatus: LoadStatus) => {
// //             dispatch(profileSlice.actions.setStatus({ loadStatus, id, key }));
// //         }
// //     })
// //     )));
// // }
// // const useTestResultObject = () => {
// //     return (
// //         useAppSelector((state) =>
// //             Object.fromEntries(
// //                 Object.entries( state.profile.data ).map(([id, { data }]) =>
// //                     [id, data.testResult]
// //                 )
// //             )
// //         )
// //     );
// // };

// // const useTestResult = (id: IProfileId) => useAppSelector((state) =>
// //     state.profile.data[id].data.testResult
// // )

// // const useFindUser = () => {
// //     const idList = useProfileIdList();

// //     return useCallback((id: IProfileId) => (
// //         idList.includes(id)
// //     )
// //         , [idList]);
// // }

// // /* 1 id */
// // const useLoadData = (id: IProfileId, key: TestDataKey) => {
// //     const [doWaitApi, setDoWaitApi] = useState<boolean>(true);
// //     const [status, setStatus] = useProfileLoadStatus(id, key);

// //     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

// //     /* 테스트 결과 Fetch */
// //     useEffect(() => {
// //         dispatch(profileSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, id, key }));
// //         if (key === 'testResult') {
// //             dispatch(asyncGetTestResult(id));
// //         }
// //         else if (key === 'testAnswer') {
// //             dispatch(asyncGetTestAnswer(id));
// //         }
// //         setDoWaitApi(false);
// //     }, [id, key, dispatch]);

// //     useEffect(() => {
// //         if (status === LoadStatus.SUCCESS) {
// //             setStatus(LoadStatus.REST);
// //         }
// //     }, [status, setStatus])

// //     return ({ status: status, setStatus: setStatus, doWaitApi: doWaitApi });
// // };

// // const useHandleSuccessAll = (status: LoadStatus, setStatus: (loadStatus: LoadStatus) => void, key: TestDataKey) => {
// //     const dispatch = useDispatch();
// //     // const [ isSucess, setIsSuccess ]= useState();

// //     // useEffect(()=>{
// //     //     const isSuccess = status === LoadStatus.SUCCESS;
// //     // })


// //     useEffect(() => {
// //         console.log(`[useHandleSuccessAll] status updated: status=${status}`);
// //         if (status === LoadStatus.SUCCESS) {
// //             dispatch(setStatusAll({ loadStatus: LoadStatus.REST, key: key }));
// //             setStatus(LoadStatus.REST);
// //         }
// //     }, [status])
// // }

// // /* Multiple Profiles */
// // const useLoadDataAll = (idList: IProfileId[], key: TestDataKey) => {

// //     const [doWaitApi, setDoWaitApi] = useState<boolean>(true);
// //     const [status, setStatus] = useProfileLoadStatusAll(key);

// //     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

// //     /* 테스트 결과 Fetch */
// //     const getDataAll = useCallback(() => {
// //         console.log(`[useLoadDataAll]-[getDataAll]: idList=${idList} key=${key}`);

// //         const fetch = key === 'testResult' ?
// //             (id: IProfileId) => dispatch(asyncGetTestResult(id))
// //             : (id: IProfileId) => dispatch(asyncGetTestAnswer(id));

// //         idList.forEach((id) => {
// //             dispatch(profileSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, id, key }));
// //             fetch(id);
// //         })
// //         setDoWaitApi(false);
// //     }, [idList, key, dispatch]);

// //     useEffect(() => {
// //         console.log(`[useLoadDataAll] Calling`);
// //     }, []);

// //     return ({
// //         getDataAll: getDataAll,
// //         status: status,
// //         setStatus: setStatus,
// //         doWaitApi: doWaitApi
// //     });
// // };

// // const useLoadDataAll_ = (key: TestDataKey) => {
// //     const [doWaitApi, setDoWaitApi] = useState<boolean>(true);
// //     const [status, setStatus] = useProfileLoadStatusAll(key);
// //     const idList: IProfileId[] = useProfileIdList();

// //     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

// //     useEffect(() => {
// //         console.log(`Using [useLoadDataAll]`);
// //     }, [])
// //     useEffect(() => {
// //         console.log(`[useLoadDataAll]: idList`);
// //     }, [idList])
// //     useEffect(() => {
// //         console.log(`[useLoadDataAll] key`);
// //     }, [key])

// //     /* 테스트 결과 Fetch */
// //     const getDataAll = useCallback(() => {
// //         console.log(`[useLoadDataAll]-[getDataAll]: idList=${idList} key=${key}`);

// //         const fetch = key === 'testResult' ?
// //             (id: IProfileId) => dispatch(asyncGetTestResult(id))
// //             : (id: IProfileId) => dispatch(asyncGetTestAnswer(id));

// //         idList.forEach((id) => {
// //             dispatch(profileSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, id, key }));
// //             fetch(id);
// //         })
// //         setDoWaitApi(false);
// //     }, [idList, key, dispatch]);

// //     return ({
// //         getDataAll: getDataAll,
// //         status: status,
// //         setStatus: setStatus,
// //         doWaitApi: doWaitApi
// //     });
// // };