import {createApi} from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../api';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({
    
  }),
});

export const {
  
} = usersApi;