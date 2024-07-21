import {configureStore} from '@reduxjs/toolkit';
import {authApi} from '../services/auth.service';
import {baseApi} from '../services/base.service';
import {locationApi} from '../services/location.service';
import {officeApi} from '../services/office.service';
import {serviceApi} from '../services/service.service';
import {usersApi} from '../services/users.service';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [officeApi.reducerPath]: officeApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(
      authApi.middleware,
      baseApi.middleware,
      locationApi.middleware,
      officeApi.middleware,
      usersApi.middleware,
      serviceApi.middleware,
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
