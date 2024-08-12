import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { RootState } from '../store';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://alphacargoserver.azurewebsites.net/',
  prepareHeaders(headers, api) {
    const token = JSON.stringify((api.getState() as RootState).auth.user?.accessToken);
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
      console.log(token, 'this is token')
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
  }

  return result;
};
