import {usersApiSlice} from '../services/getUsers';
import {loginApiSlice} from '../services/login';

export const middlewareArray = [
  loginApiSlice.middleware,
  usersApiSlice.middleware,
];
