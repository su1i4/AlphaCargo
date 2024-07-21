import {createApi} from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../api';

export const locationApi = createApi({
  reducerPath: 'locationApi',
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({
    
  }),
});

export const {
  
} = locationApi;