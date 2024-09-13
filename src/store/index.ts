import {configureStore} from '@reduxjs/toolkit';
import {authApi} from '../services/auth.service';
import {baseApi} from '../services/base.service';
import {helpersSlice} from './slices/helpers.slice';
import {authReducer} from './slices/auth.slice';

export const store = configureStore({
  reducer: {
    helpers: helpersSlice.reducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(authApi.middleware, baseApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
