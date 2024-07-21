import {createApi} from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../api';

export const officeApi = createApi({
  reducerPath: 'officeApi',
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({
    
  }),
});

export const {
  
} = officeApi;