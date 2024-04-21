// /* https://redux.js.org/usage/code-splitting#reducer-injection-approaches */

// import { combineReducers, configureStore, EnhancedStore } from "@reduxjs/toolkit"
// import authReducer from "../reducers/authReducer"


// // Define the Reducers that will always be present in the application
// const staticReducers = {
//   auth: authReducer
// }

// // Configure the store
// export default function configure(initialState) {
//   const store : EnhancedStore = configureStore({
//     reducer: createReducer(),
//     devTools: env.NODE_ENV !== 'production',
//   })

//   // Add a dictionary to keep track of the registered async reducers
//   store.asyncReducers = {}

//   // Create an inject reducer function
//   // This function adds the async reducer, and creates a new combined reducer
//   store.injectReducer = (key, asyncReducer) => {
//     store.asyncReducers[key] = asyncReducer
//     store.replaceReducer(createReducer(store.asyncReducers))
//   }

//   // Return the modified store
//   return store
// }

// function createReducer(asyncReducers?) {
//   return combineReducers({
//     ...staticReducers,
//     ...asyncReducers
//   })
// }