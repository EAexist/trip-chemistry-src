/* React */
import { useCallback } from "react";

/* Externals */
import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

/* App */
import { HASHTAGS, HEADERS_AXIOS, TEST_TYPE } from "../common/app-const";
import { ActivityTag } from "../interfaces/enums/ActivityTag";
import { ExpectationTag } from "../interfaces/enums/ExpectationTag";
import { IWithLoadStatus, LoadStatus } from "../interfaces/enums/LoadStatus";
import { IHashTagTestKey, INumericTestKey, ITestAnswer, ITestAnswerDTO, ITestKey } from "../interfaces/ITestAnswer";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { useUserId } from "./authReducer";
import { CityTag } from "~/interfaces/enums/CityTag";
import { IProfileId } from "~/interfaces/IProfile";

type ITestAnswerState = IWithLoadStatus<ITestAnswer>

interface ISetNumericAnswerPayload {
    key: string;
    subKey?: string;
    value: number;
};

interface ISetHashTagAnswerPayload {
    key: IHashTagTestKey;
    tag: number;
};

export interface ITestIndex {
    testKey: ITestKey
    subKey?: string
}

export const _sampleTestAnswer: ITestAnswer = {
    hashtag: {
        expectation: Object.values(ExpectationTag).slice(0, 4),
        // {
        //     selected: Object.values(ExpectationTag).slice(0, 4),
        //     unSelected: Object.values(ExpectationTag).slice(4)
        // },
        activity: Object.values(ActivityTag).slice(0, 4),
        //  {
        //     selected: Object.values(ActivityTag).slice(0, 4),
        //     unSelected: Object.values(ActivityTag).slice(4)
        // },
        city: Object.values(CityTag).slice(0, 4),
        //  {
        //     selected: Object.values(CityTag).slice(0, 4),
        //     unSelected: Object.values(CityTag).slice(4)
        // },
    },
    leadership: 1,
    schedule: {
        startTime: 6,
        endTime: 18,
        schedule: 4,
        nightPlan: 2,
    },
    restaurant: {
        specialBudget: 80000, /* 특별한 식사 */
        price: 2,
        taste: 2,
        uniqueness: 2,
        popularity: 2
    },
};

export const sampleTestAnswer: ITestAnswer = {
    hashtag: {
        expectation: Object.values(ExpectationTag).slice(0, 1),
        activity: Object.values(ActivityTag).slice(0, 1),
        city: Object.values(CityTag).slice(0, 1),
    },
    leadership: undefined,
    schedule: {
        // startTime: undefined,
        // endTime: undefined,
        // schedule: undefined,
        // nightPlan: undefined,
    },
    restaurant: {
        // dailyBudget: undefined, /* 식사 평균 */
        // specialBudget: undefined, /* 특별한 식사 */
        // specialCount: undefined, /* 특별한 식사 */
    },
};

const initialState: ITestAnswerState = {
    data: sampleTestAnswer,
    // data: defaultTestAnswer,
    loadStatus: LoadStatus.REST
};

export const asyncSubmitAnswer = createAsyncThunk("testAnswer/submitAnswer",
    async ({ id, answer }: { id: string, answer: ITestAnswerDTO }, { getState, rejectWithValue }) => {
        console.log(`[asyncSubmitAnswer] PUT /profile/submitAnswer?\n\tid=${id}\n\tanswer=${JSON.stringify(answer)}`);
        try {
            const response = await axios.put(`/profile/submitAnswer`,
                answer,
                {
                    method: "PUT",
                    headers: HEADERS_AXIOS,
                    params: {
                        id: id,
                    },
                });
            return response.data;
        }
        catch (e: any) {
            console.log(`[asyncSubmitAnswer] error: ${e}`);
            return rejectWithValue(e);
        }
    }
);

export const asyncSetAnswer = createAsyncThunk<any, IProfileId, {
    state: RootState
}
>("testAnswer/setAnswer",
    async ( id, { getState, rejectWithValue }) => {
        console.log(`[asyncSetAnswer] PUT /profile/answer?\n\tid=${id}`);
        try {
            const response = await axios.put(`/profile/answer`,
                getState().testAnswer.data,
                {
                    method: "PUT",
                    headers: HEADERS_AXIOS,
                    params: {
                        id: id,
                    },
                });
            return response.data;
        }
        catch (e: any) {
            console.log(`[asyncSetAnswer] error: ${e}`);
            return rejectWithValue(e);
        }
    }
);

export const asyncGetAnswer = createAsyncThunk("testAnswer/getAnswer",
    async (id: string, thunkAPI) => {
        console.log(`[asyncGetAnswer] GET /profile/answer?\n\tid=${id}`);
        try {
            const response = await axios.get(`/profile/answer`,
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
            console.log(`[asyncGetAnswer] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const testAnswerSlice = createSlice({
    name: 'testAnswer',
    initialState: initialState,
    reducers:
    {
        setNumericAnswer: (state, action: PayloadAction<ISetNumericAnswerPayload>) => {
            console.log(`[testAnswerSlice] [setNumericAnswer]: state=${JSON.stringify(state)} payload=${JSON.stringify(action.payload)}`);
            if (state.data) {
                if (action.payload.subKey) {
                    state.data[action.payload.key][action.payload.subKey] = action.payload.value;
                }
                else {
                    state.data[action.payload.key] = action.payload.value;
                }
            }
        },
        addHashTagAnswer: (state, action: PayloadAction<ISetHashTagAnswerPayload>) => {
            if (!state.data.hashtag[action.payload.key].includes(action.payload.tag)) {
                state.data.hashtag[action.payload.key].push(action.payload.tag);
            }
            // state.data.hashtag[action.payload.key].unSelected.splice(state.data.hashtag[action.payload.key].unSelected.indexOf(action.payload.tag), 1);
        },
        deleteHashTagAnswer: (state, action: PayloadAction<ISetHashTagAnswerPayload>) => {
            // if (!state.data.hashtag[action.payload.key].unSelected.includes(action.payload.tag)) {
            //     state.data.hashtag[action.payload.key].unSelected.unshift(action.payload.tag);
            // }
            state.data.hashtag[action.payload.key].splice(state.data.hashtag[action.payload.key].indexOf(action.payload.tag), 1);
        },
        setStatus: (state, action: PayloadAction<LoadStatus>) => {
            state.loadStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(asyncSubmitAnswer.fulfilled, (state, action: PayloadAction<StatusCodes>) => {
            console.log(`[asyncSubmitAnswer] fulfilled\n\taction.payload=${JSON.stringify(action.payload)}`
            );
            state.loadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncSubmitAnswer.pending, (state) => {
            console.log(`[asyncSubmitAnswer] pending`);
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncSubmitAnswer.rejected, (state) => {
            console.log(`[asyncSubmitAnswer] rejected`);
            state.loadStatus = LoadStatus.FAIL;
        });
        builder.addCase(asyncSetAnswer.fulfilled, (state, action: PayloadAction<StatusCodes>) => {
            console.log(`[asyncSetAnswer] fulfilled\n\taction.payload=${JSON.stringify(action.payload)}`
            );
            state.loadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncSetAnswer.pending, (state) => {
            console.log(`[asyncSetAnswer] pending`);
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncSetAnswer.rejected, (state) => {
            console.log(`[asyncSetAnswer] rejected`);
            state.loadStatus = LoadStatus.FAIL;
        });
        builder.addCase(asyncGetAnswer.fulfilled, (state, action: PayloadAction<{ testAnswer: ITestAnswerDTO}>) => {
            console.log(`[asyncGetAnswer] fulfilled\n\taction.payload=${JSON.stringify(action.payload)}`);
            if( action.payload.testAnswer ){
                state.data = action.payload.testAnswer
            }
            state.loadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncGetAnswer.pending, (state) => {
            console.log(`[asyncGetAnswer] pending`);
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncGetAnswer.rejected, (state) => {
            console.log(`[asyncGetAnswer] rejected`);
            state.loadStatus = LoadStatus.FAIL;
        });
    },
});


/* hooks */

const useTestAnswer = (key: INumericTestKey, subKey?: string) => {
    const dispatch = useAppDispatch();
    return (
        [
            useAppSelector((state) => (subKey ? state.testAnswer.data[key][subKey] : state.testAnswer.data[key]) as number),
            useCallback((value: number) => {
                dispatch(testAnswerSlice.actions.setNumericAnswer({ key, subKey, value }))
                window.localStorage.setItem("testAnswer", JSON.stringify({ ...JSON.parse(window.localStorage.getItem("testAnswer")) }));
            }
                , [dispatch])
        ] as const
    )
};

const useTagSetAnswer = (key: IHashTagTestKey, selected = true) => {

    const answer = useAppSelector(
        createSelector(
            state => state.testAnswer.data.hashtag[key],
            (hashtags) => (
                selected
                    ?
                    hashtags
                    :
                    Object.keys(HASHTAGS[key]).filter((tag) => !hashtags.includes(tag))
            )
        ))
    return answer
    // return (Array.from(answer.values()))
};

const useIsTestAnswered = (tests: ITestIndex[]) => {
    return (
        useAppSelector(
            (state) => (tests.map(({ testKey, subKey }) => {
                const answer = subKey ? state.testAnswer.data[testKey][subKey] : state.testAnswer.data[testKey]
                console.log("Hello", testKey, subKey, answer);
                return (
                    (testKey === "hashtag")
                        ? answer.length >= TEST_TYPE.hashtag.selectedMinLength
                        : answer !== undefined
                )
            }).every(v => v))
        )
    );
}

const useTestAnswerStatus = () => {
    /* Using useAppDispatch with createAsyncThunk. 
    ( https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete ) */
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.testAnswer.loadStatus);
    return ([
        status,
        useCallback((status: LoadStatus) => {
            dispatch(testAnswerSlice.actions.setStatus(status));
        }, [dispatch])
    ] as const);
}

const useSubmitAnswer = () => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.testAnswer);

    const id = useUserId();

    return useCallback(() => {
        // console.log(`[useSubmitAnswer] id=${id} answer=${JSON.stringify(testAnswerToDTO(data))}`);
        dispatch(asyncSubmitAnswer({ id, answer: data }));
    }, [dispatch, data, id]);
}

export default testAnswerSlice.reducer;
export { useSubmitAnswer, useTestAnswerStatus, useTestAnswer, useTagSetAnswer, useIsTestAnswered };
export type { ITestAnswer, ITestAnswerState };
export const { addHashTagAnswer, deleteHashTagAnswer } = testAnswerSlice.actions;

/* Depreacated */
// const useIsAllTestAnswered = () => {
//     return (
//         useAppSelector((state) => (
//             Object.entries(state.testAnswer.data).map(([key, answer]) =>
//                 typeof answer === "object"
//                     ?
//                     Object.values(answer).map(value =>
//                         (key === "hashtag")
//                             ? (value as { selected: string[] }).selected.length >= TEST_TYPE.hashtag.selectedMinLength
//                             : value !== undefined
//                     ).every(v => v)

//                     : answer !== undefined
//             ).every(v => v)
//         ))
//     );
// }