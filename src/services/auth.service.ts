import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from '../api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['users'],
  endpoints: build => ({
    ////////LOGIN
    loginStep1: build.mutation<any, any>({
      query: body => {
        return {
          url: '/auth/login-step1',
          method: 'POST',
          body: body,
        };
      },
    }),
    loginStep2: build.mutation<any, any>({
      query: body => {
        return {
          url: '/auth/login-step2',
          method: 'POST',
          body: body,
        };
      },
    }),
    singUpStep1: build.mutation<any, any>({
      query: body => {
        return {
          url: '/auth/signup-step1',
          method: 'POST',
          body: body,
        };
      },
    }),
    singUpStep2: build.mutation<any, any>({
      query: body => {
        return {
          url: '/auth/signup-step2',
          method: 'POST',
          body: body,
        };
      },
    }),
    getUser: build.query<any, void>({
      query: () => 'users',
      providesTags: ['users']
    }),
    patchuser: build.mutation<any, any>({
      query: (body) => {
        return {
          url: 'users',
          method: 'PATCH',
          body: body
        }
      },
      invalidatesTags: ['users']
    }),
    deleteUser: build.mutation<void, void>({
      query: () => {
        return {
          url: 'users/deactivateUser',
          method: "DELETE"
        }
      }
    })
  }),
});

export const {
  useLoginStep1Mutation,
  useLoginStep2Mutation,
  useSingUpStep1Mutation,
  useSingUpStep2Mutation,
  useGetUserQuery,
  usePatchuserMutation,
  useDeleteUserMutation
} = authApi;
