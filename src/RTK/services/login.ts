import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiEndPoint} from '../../settings/endpoints';
import {LoginResponse} from '../../models/loginResponse';

export const loginApiSlice = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiEndPoint,
  }),
  tagTypes: ['login'],
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, string>({
      query: mobile => ({
        url: '/login',
        method: 'POST',
        body: {mobile},
      }),
      invalidatesTags: ['login'],
    }),
  }),
});

export const {useLoginMutation} = loginApiSlice;
