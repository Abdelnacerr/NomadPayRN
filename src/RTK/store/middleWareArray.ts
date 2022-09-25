import { s3UrlApiSlice } from '../services/getS3Url'
import {usersApiSlice} from '../services/getUsers';
import { indexFacesApiSlice } from '../services/indexFaces'
import {loginApiSlice} from '../services/login';

export const middlewareArray = [
  loginApiSlice.middleware,
  usersApiSlice.middleware,
  s3UrlApiSlice.middleware,
  indexFacesApiSlice.middleware,
];
