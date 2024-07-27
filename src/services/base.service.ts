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
  }),
});

export const {
  useGetOfficesQuery,
  useGetOfficeByIdQuery,
  useGetServiceByIdQuery,
  useGetServicesQuery,
  useGetAllCitiesQuery,
  useGetAllCountriesQuery
} = baseApi;
