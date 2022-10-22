import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {accountType} from '../../models/accountType';
import {apiEndPoint} from '../../settings/endpoints';

export const accountTypeApiSlice = createApi({
  reducerPath: 'accountTypeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiEndPoint,
  }),
  tagTypes: ['accountType'],
  endpoints: builder => ({
    getaccountType: builder.query<accountType[], void>({
      query: () => {
        return `/getAccountType`;
      },
      providesTags: [{type: 'accountType', id: 'accountTypeList'}],
    }),
  }),
});

export const {useGetaccountTypeQuery} = accountTypeApiSlice;
