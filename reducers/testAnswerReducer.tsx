/* React */
import { useCallback } from "react";

/* Externals */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

/* App */
import { HEADERS_AXIOS, TEST_TYPE } from "../common/app-const";
import { ActivityTag } from "../interfaces/enums/ActivityTag";
import { ExpectationTag } from "../interfaces/enums/ExpectationTag";
import { IWithLoadStatus, LoadStatus } from "../interfaces/enums/LoadStatus";
import { IHashTagTestKey, INumericTestKey, ITestAnswer, ITestAnswerDTO, ITestKey, testAnswerToDTO } from "../interfaces/ITestAnswer";
import { useAppDispatch, useAppSelector } from "../store";
import { useUserId } from "./authReducer";
import { CityTag } from "~/interfaces/enums/CityTag";

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

export const sampleTestAnswer: ITestAnswer = {
    hashtag: {
        expectation: {
            selected: Object.values(ExpectationTag).slice(0, 4),
            unSelected: Object.values(ExpectationTag).slice(4)
        },
        activity: {
            selected: Object.values(ActivityTag).slice(0, 4),
            unSelected: Object.values(ActivityTag).slice(4)
        },
        city: {
            selected: Object.values(CityTag).slice(0, 4),
            unSelected: Object.values(CityTag).slice(4)
        },
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
    // city: {
    //     metropolis: 1,
    //     history: 2,
    //     nature: 4,
    //     small: undefined,
    // }
    // accomodate: undefined, /* 숙소 평균 */
    // accomodateSpecial: undefined, /* 특별한 숙소 */
};

export const sampleTestAnswer_: ITestAnswer = {
    hashtag: {
        expectation: {
            selected: Object.values(ExpectationTag).slice(0, 1),
            unSelected: Object.values(ExpectationTag).slice(1)
        },
        activity: {
            selected: Object.values(ActivityTag).slice(0, 1),
            unSelected: Object.values(ActivityTag).slice(1)
        },
        city: {
            selected: Object.values(CityTag).slice(0, 1),
            unSelected: Object.values(CityTag).slice(1)
        },
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
    // city: {
    //     metropolis: undefined,
    //     history: undefined,
    //     nature: undefined,
    //     small: undefined,
    // }
};

const initialState: ITestAnswerState = {
    data: sampleTestAnswer,
    // data: defaultTestAnswer,
    loadStatus: LoadStatus.REST
};

export const asyncSubmitAnswer = createAsyncThunk("testAnswer/submitAnswer",
    async ({ id, answer }: { id: string, answer: ITestAnswerDTO }, thunkAPI) => {
        console.log(`[asyncSubmitAnswer] PUT /profile/answer?\n\tid=${id}\n\tanswer=${JSON.stringify(answer)}`);
        try {
            const response = await axios.put(`/profile/answer`,
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
            if (!state.data.hashtag[action.payload.key].selected.includes(action.payload.tag)) {
                state.data.hashtag[action.payload.key].selected.push(action.payload.tag);
            }
            state.data.hashtag[action.payload.key].unSelected.splice(state.data.hashtag[action.payload.key].unSelected.indexOf(action.payload.tag), 1);
        },
        deleteHashTagAnswer: (state, action: PayloadAction<ISetHashTagAnswerPayload>) => {
            if (!state.data.hashtag[action.payload.key].unSelected.includes(action.payload.tag)) {
                state.data.hashtag[action.payload.key].unSelected.unshift(action.payload.tag);
            }
            state.data.hashtag[action.payload.key].selected.splice(state.data.hashtag[action.payload.key].selected.indexOf(action.payload.tag), 1);
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
    },
});


/* hooks */

const useTestAnswer = (key: INumericTestKey, subKey?: string) => {
    const dispatch = useAppDispatch();
    return (
        [
            useAppSelector((state) => (subKey ? state.testAnswer.data[key][subKey] : state.testAnswer.data[key]) as number),
            useCallback((value: number) =>
                dispatch(testAnswerSlice.actions.setNumericAnswer({ key, subKey, value }))
                , [dispatch])
        ] as const
    )
};

const useTagSetAnswer = (key: IHashTagTestKey, selected = true) => {
    const answer = useAppSelector((state) => (state.testAnswer.data.hashtag[key][selected ? "selected" : "unSelected"]))
    return (Array.from(answer.values()))
};

const useIsTestAnswered = (tests: ITestIndex[]) => {
    return (
        useAppSelector(
            (state) => (tests.map(({ testKey, subKey }) => {
                const answer = subKey ? state.testAnswer.data[testKey][subKey] : state.testAnswer.data[testKey]
                console.log("Hello", testKey, subKey, answer);
                return (
                    (testKey === "hashtag")
                        ? answer.selected.length >= TEST_TYPE.hashtag.selectedMinLength
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
        console.log(`[useSubmitAnswer] id=${id} answer=${JSON.stringify(testAnswerToDTO(data))}`);
        dispatch(asyncSubmitAnswer({ id, answer: testAnswerToDTO(data) }));
    }
        , [dispatch, data, id]);
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