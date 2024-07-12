import {createApi} from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../api';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({
    
  }),
});

export const {
  
} = baseApi;