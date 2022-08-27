import {combineReducers} from '@reduxjs/toolkit';
import {loginApiSlice} from '../services/login';
import {usersApiSlice} from '../services/getUsers';

export const rootReducer = combineReducers({
  [usersApiSlice.reducerPath]: usersApiSlice.reducer,
  [loginApiSlice.reducerPath]: loginApiSlice.reducer,
  
});
