import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiEndPoint} from '../../settings/endpoints';

interface s3UrlResponse {
  url: string;
}
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
    s3Url: builder.mutation<s3UrlResponse, string>({
      query: fileName => ({
        url: '/getS3Url',
        method: 'PUT',
        body: fileName,
      }),
      invalidatesTags: ['s3Url'],
    }),
  }),
});

export const {useS3UrlMutation} = s3UrlApiSlice;
