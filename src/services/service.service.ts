import {createApi} from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../api';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({
    
  }),
});

export const {
  
} = serviceApi;