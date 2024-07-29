import { ComponentType, useEffect, useState } from "react";
import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { defaultReudcer, store } from "../store";

const withReducer = <T extends {}>(WrappedComponent: ComponentType<T>) =>
    (asyncReducer: { [key: string]: Reducer }) =>
        (props: T) => {

            const [isReducerInjected, setIsReducerInjected] = useState(store.getState()[Object.keys(asyncReducer)[0]] !== undefined);

            /* Side Effects */
            useEffect(() => {
                if (!isReducerInjected) {
                    const newRootReducer = combineReducers({
                        ...defaultReudcer,
                        ...asyncReducer
                    })
                    store.replaceReducer(newRootReducer)
                    setIsReducerInjected(true)
                }
            }, [isReducerInjected])

            return (
                isReducerInjected &&
                <WrappedComponent {...props} />
            );
        }

export default withReducer