import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiEndPoint} from '../../settings/endpoints';

type s3Object = {
  Bucket: string | null;
  Name: string | null;
};

export const searchFacesByImageApiSlice = createApi({
  reducerPath: 'searchFacesByImageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiEndPoint,
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['searchFacesByImage'],
  endpoints: builder => ({
    searchFacesByImage: builder.mutation<any, s3Object>({
      query: s3Object => ({
        url: '/searchFacesByImage',
        method: 'POST',
        body: s3Object,
      }),
      invalidatesTags: ['searchFacesByImage'],
    }),
  }),
});

export const {useSearchFacesByImageMutation} = searchFacesByImageApiSlice;
