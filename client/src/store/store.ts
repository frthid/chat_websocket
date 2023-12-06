import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
})

// const LocalStorageMiddleware = (store: any ) => (next: any) => (action: any) => {
//   const result = next(action);
//   localStorage.setItem('reduxState', JSON.stringify(store.getState()));
//   return result;
// };

// const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem('reduxState');
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (err) {
//     return undefined;
//   }
// };

export const store = configureStore({
  reducer: rootReducer,
  // preloadedState: loadState(),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }).concat(LocalStorageMiddleware),
}) 



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;