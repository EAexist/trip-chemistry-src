import { configureStore, EnhancedStore, StoreEnhancer, ThunkDispatch, Tuple, UnknownAction } from "@reduxjs/toolkit";
import authReducer, { IAuthState } from "../reducers/authReducer";
import { IChemistryState } from "../reducers/chemistryReducer";
import profileSearchReducer, { IProfileSearchState } from "../reducers/profileSearchReducer";
import { ITestAnswerState } from "../reducers/testAnswerReducer";
// import env from "~/env";
import env from "~/env";

export const store: EnhancedStore<{
    auth: IAuthState;
    testAnswer?: ITestAnswerState;
    chemistry?: IChemistryState;
    profileSearch?: IProfileSearchState;
}, UnknownAction, Tuple<[StoreEnhancer<{
    dispatch: ThunkDispatch<{
        auth: IAuthState;
        testAnswer?: ITestAnswerState;
        chemistry?: IChemistryState;
        // profileSearch?: IProfileSearchState;
    }, undefined, UnknownAction>;
}>, StoreEnhancer]>> = configureStore({
    reducer: {
        auth: authReducer,
        // testAnswer: testAnswerReducer,
        // chemistry: chemistryReducer,
        // profileSearch: profileSearchReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false,
    // }),
    devTools: env.NODE_ENV !== 'production',
});

export const defaultReudcer = {
    auth: authReducer
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;