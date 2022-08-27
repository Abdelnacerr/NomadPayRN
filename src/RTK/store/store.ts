import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './rootReducer';
import {middlewareArray} from './middleWareArray';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({}).concat(middlewareArray),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
