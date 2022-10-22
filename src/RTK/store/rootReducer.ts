import {combineReducers} from '@reduxjs/toolkit';
import {loginApiSlice} from '../services/login';
import {usersApiSlice} from '../services/getUsers';
import {indexFacesApiSlice} from '../services/indexFaces';
import logInReducer from '../slices/loginSlice';
import tokenReducer from '../slices/tokenSlice';
import {s3UrlApiSlice} from '../services/getS3Url';
import {searchFacesByImageApiSlice} from '../services/searchFacesByImage';
import {accountTypeApiSlice} from '../services/getAccountTypes';

export const rootReducer = combineReducers({
  [usersApiSlice.reducerPath]: usersApiSlice.reducer,
  [loginApiSlice.reducerPath]: loginApiSlice.reducer,
  [s3UrlApiSlice.reducerPath]: s3UrlApiSlice.reducer,
  [indexFacesApiSlice.reducerPath]: indexFacesApiSlice.reducer,
  [searchFacesByImageApiSlice.reducerPath]: searchFacesByImageApiSlice.reducer,
  [accountTypeApiSlice.reducerPath]: accountTypeApiSlice.reducer,
  login: logInReducer,
  token: tokenReducer,
});
