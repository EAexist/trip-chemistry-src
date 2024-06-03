/* React */
import { useCallback } from "react";

/* Externals */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { useDispatch, useSelector } from "react-redux";

/* App */
import { HEADERS_AXIOS, TEST_TYPE } from "../common/app-const";
import { ITestAnswer, ITestAnswerDTO, ITestName, testAnswerToDTO } from "../interfaces/ITestAnswer";
import { AppDispatch, RootState } from "../store";
import { useUserId } from "./authReducer";
import { ExpectationTag } from "../interfaces/enums/ExpectationTag";
import { ActivityTag } from "../interfaces/enums/ActivityTag";
import { IWithLoadStatus, LoadStatus } from "../interfaces/enums/LoadStatus";

export type NumericTestName = keyof Omit<ITestAnswer, "activity" | "expectation">;
export type SetTestName = keyof Pick<ITestAnswer, "activity" | "expectation">;

export const sampleTestAnswer : ITestAnswer = {
    expectation: {
        selected: [],
        unSelected: Object.values(ExpectationTag)
    },
    activity: {
        selected: [],
        unSelected: Object.values(ActivityTag)
    },
    leadership: 1,
    schedule: 4,
    dailyRestaurantBudget: undefined, /* 식사 평균 */
    specialRestaurantBudget: undefined, /* 특별한 식사 */
    specialRestaurantCount: undefined, /* 특별한 식사 */
    // accomodate: undefined, /* 숙소 평균 */
    // accomodateSpecial: undefined, /* 특별한 숙소 */
    metropolis: 1,
    history: 5,
    nature: 4,
};

type ITestAnswerState = IWithLoadStatus<ITestAnswer>

const initialState : ITestAnswerState  = {
    data: sampleTestAnswer,
    // data: defaultTestAnswer,
    loadStatus : LoadStatus.REST
};

interface ISetNumericAnswerPayload {
    testName: NumericTestName;
    value: number;
};

interface ISetSetAnswerPayload {
    testName: SetTestName;
    tag: number;
};

export const asyncSubmitAnswer = createAsyncThunk("testAnswer/submitAnswer",
    async ({ id, answer }: { id: string, answer: ITestAnswerDTO}, thunkAPI) => {
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
        setNumericAnswer : (state, action: PayloadAction<ISetNumericAnswerPayload>) => {
            console.log(`[testAnswerSlice] [setNumericAnswer]: state=${JSON.stringify(state)} payload=${JSON.stringify(action.payload)}` );
            if ( state.data ){
                state.data[action.payload.testName] = action.payload.value;
            }
        },
        addTagAnswer: (state, action: PayloadAction<ISetSetAnswerPayload>) => {
            if( ! state.data[action.payload.testName].selected.includes( action.payload.tag )){
                state.data[action.payload.testName].selected.push(action.payload.tag);
            }
            state.data[action.payload.testName].unSelected.splice( state.data[action.payload.testName].unSelected.indexOf(action.payload.tag), 1 );
        },
        deleteTagAnswer: (state, action: PayloadAction<ISetSetAnswerPayload>) => {
            if( ! state.data[action.payload.testName].unSelected.includes( action.payload.tag )){
                state.data[action.payload.testName].unSelected.unshift(action.payload.tag);
            }
            state.data[action.payload.testName].selected.splice( state.data[action.payload.testName].selected.indexOf(action.payload.tag), 1 );
        },
        setStatus: (state, action: PayloadAction<LoadStatus>) => {
            state.loadStatus = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder.addCase( asyncSubmitAnswer.fulfilled, (state, action: PayloadAction<StatusCodes> ) => {            
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

export const useTestAnswer = ( testName: NumericTestName ) => {
    const dispatch = useDispatch();
    return(
        [ 
            useSelector(( state:RootState )=>(state.testAnswer.data[testName]) as number),  
            useCallback(( value: number ) => 
                dispatch( testAnswerSlice.actions.setNumericAnswer({ testName, value }) )
            , [dispatch])
        ] as const
    )
};

export const useTagSetAnswer = ( testName: SetTestName, selected = true ) => {
    const answer = useSelector(( state:RootState )=>(state.testAnswer.data[testName][ selected ? "selected" : "unSelected" ] ))
    return( Array.from(answer.values()) )
};

export const useIsTestAnswered = ( testName: ITestName ) => {
    return(
        useSelector(( state:RootState )=>(
            ( typeof state.testAnswer.data[testName] !== "object" )
            ? state.testAnswer.data[ testName as NumericTestName ] !== undefined  
            : state.testAnswer.data[ testName as SetTestName ].selected.length >= TEST_TYPE.tagSet.selectedMinLength
        ))
    );    
}

export const useIsAllTestAnswered = ( ) => {
    return(
        useSelector(( state:RootState )=>(
            Object.values( state.testAnswer.data ).map(( answer ) => 
                ( typeof answer !== "object" )
                ? answer !== undefined  
                : answer.selected.length >= TEST_TYPE.tagSet.selectedMinLength 
            ).every(v => v)
        ))
    );    
}

const useTestAnswerStatus = () => {
    /* Using useDispatch with createAsyncThunk. 
    ( https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete ) */
    const dispatch = useDispatch(); 
    const status = useSelector(( state:RootState )=>state.testAnswer.loadStatus);
    return ([
        status,
        useCallback((status: LoadStatus) =>{
            dispatch(testAnswerSlice.actions.setStatus(status));
        }, [dispatch])
    ] as const);
}

const useSubmitAnswer = () => {
    const dispatch = useDispatch<AppDispatch>(); 
    const { data } = useSelector(( state:RootState ) => state.testAnswer );

    const id = useUserId();

    return useCallback(() => {        
        console.log(`[useSubmitAnswer] id=${id} answer=${JSON.stringify(testAnswerToDTO(data))}`);
        dispatch( asyncSubmitAnswer({ id, answer: testAnswerToDTO(data) }) );
    }
    , [ dispatch, data, id ]);
}

export default testAnswerSlice.reducer;
export type { ITestAnswerState } 
export { useSubmitAnswer, useTestAnswerStatus };
export const { addTagAnswer, deleteTagAnswer } = testAnswerSlice.actions;
export type { ITestAnswer };
