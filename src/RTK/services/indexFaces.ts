import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiEndPoint} from '../../settings/endpoints';

type s3Object = {
  Bucket: string | null;
  Name: string | null;
};

export const indexFacesApiSlice = createApi({
  reducerPath: 'indexFacesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiEndPoint,
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['indexFaces'],
  endpoints: builder => ({
    indexFaces: builder.mutation<any, s3Object>({
      query: s3Object => ({
        url: '/indexFaces',
        method: 'POST',
        body: s3Object,
      }),
      invalidatesTags: ['indexFaces'],
    }),
  }),
});

export const {useIndexFacesMutation} = indexFacesApiSlice;
