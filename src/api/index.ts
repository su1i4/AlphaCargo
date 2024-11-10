import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import {RootState} from '../store';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://alpha-cargo.kg/api/',
  prepareHeaders(headers, api) {
    const token: any = JSON.stringify(
      (api.getState() as RootState).auth.user?.accessToken,
    );
    if (true) {
      headers.set('authorization', `Bearer ${token}`);
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
