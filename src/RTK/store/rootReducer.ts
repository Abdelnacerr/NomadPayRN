import {combineReducers} from '@reduxjs/toolkit';
import {loginApiSlice} from '../services/login';
import {usersApiSlice} from '../services/getUsers';
import logInReducer from '../slices/loginSlice';
import tokenReducer from '../slices/tokenSlice';

export const rootReducer = combineReducers({
  [usersApiSlice.reducerPath]: usersApiSlice.reducer,
  [loginApiSlice.reducerPath]: loginApiSlice.reducer,
  login: logInReducer,
  token: tokenReducer,
});
