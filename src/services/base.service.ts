import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from '../api';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({
    getOffices: build.query<any, void>({
      query: () => 'offices',
    }),
    getOfficeById: build.query<any, any>({
      query: id => `offices/${id}`,
    }),
    getServices: build.query({
      query: () => 'services',
    }),
    getServiceById: build.query<any, any>({
      query: id => `services/${id}`,
    }),
    getAllCities: build.query<any, void>({
      query: () => 'locations/cities',
    }),
    getAllCountries: build.query<any, void>({
      query: () => 'locations/countries',
    }),
    getNotifications: build.query<any, any>({
      query: () => 'notifications',
    }),
    getParcelTypes: build.query<any, void>({
      query: () => 'parcel-type',
    }),
    getBags: build.query<any, void>({
      query: () => 'bags',
    }),
    getTariffs: build.query<any, void>({
      query: () => 'tariffs',
    }),
    getParcel: build.query<any, void>({
      query: () => '/parcels',
    }),
    findParcel: build.query<any, any>({
      query: number => `parcels/invoice/${number}`,
    }),
    getParcelPDFfile: build.query<any, any>({
      query: number => `parcels/invoice/${number}/pdf`,
    }),
    postFranchise: build.mutation<any, any>({
      query: body => {
        return {
          url: '/franchise',
          method: 'POST',
          body: body,
        };
      },
    }),
    readNotification: build.mutation<any, any>({
      query: (id: any) => ({
        url: `/notifications/${id}`,
        method: 'PATCH',
      }),
    }),
    sendCode: build.mutation<{phone: string}, {phone: string}>({
      query: (body) => {
        return {
          url: 'users/password/forgot',
          method: 'POST',
          body: body,
        }
      }
    }),
    resetPassword: build.mutation<any, any>({
      query: (body) => {
        return {
          url: 'users/password/reset',
          method: 'PATCH',
          body: {
            phone: body.phone,
            code: body.code,
            newPassword: body.password,
          },
        }
      }
    })
  }),
});

export const {
  useGetParcelQuery,
  useGetOfficesQuery,
  useGetOfficeByIdQuery,
  useGetServiceByIdQuery,
  useGetServicesQuery,
  useGetAllCitiesQuery,
  useGetAllCountriesQuery,
  useGetNotificationsQuery,
  useGetParcelTypesQuery,
  useGetBagsQuery,
  useGetTariffsQuery,
  usePostFranchiseMutation,
  useLazyFindParcelQuery,
  useFindParcelQuery,
  useReadNotificationMutation,
  useSendCodeMutation,
  useResetPasswordMutation,
} = baseApi;
