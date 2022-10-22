import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiEndPoint} from '../../settings/endpoints';

export const s3UrlApiSlice = createApi({
  reducerPath: 's3UrlApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiEndPoint,
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['s3Url'],
  endpoints: builder => ({
    getS3Url: builder.query<string, string>({
      query: fileName => {
        return `/getS3Url/${fileName}`;
      },
      providesTags: [{type: 's3Url', id: 's3UrlList'}],
    }),
  }),
});

export const {useGetS3UrlQuery} = s3UrlApiSlice;
