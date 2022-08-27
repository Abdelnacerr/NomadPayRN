import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiEndPoint} from '../../settings/endpoints';
import {User} from '../../models/user';

const token = '';

export const usersApiSlice = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiEndPoint,
    prepareHeaders: headers => {
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Users'],
  endpoints: builder => ({
    getUsers: builder.query<User[], number | void>({
      query: () => {
        return `/users`;
      },
      providesTags: [{type: 'Users', id: 'UsersList'}],
    }),
  }),
});

export const {useGetUsersQuery} = usersApiSlice;
