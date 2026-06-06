import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: (import.meta.env.VITE_API_URL || '') + '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Appointment', 'Service', 'Staff', 'User'],
  endpoints: (builder) => ({
    // AUTH
    register: builder.mutation({
      query: (data) => ({ url: '/auth/register', method: 'POST', body: data }),
    }),
    login: builder.mutation({
      query: (data) => ({ url: '/auth/login', method: 'POST', body: data }),
    }),
    getMe: builder.query({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({ url: '/auth/profile', method: 'PUT', body: data }),
      invalidatesTags: ['User'],
    }),

    // SERVICES
    getServices: builder.query({
      query: (category) => category ? `/services?category=${category}` : '/services',
      providesTags: ['Service'],
    }),
    getService: builder.query({
      query: (id) => `/services/${id}`,
    }),
    createService: builder.mutation({
      query: (data) => ({ url: '/services', method: 'POST', body: data }),
      invalidatesTags: ['Service'],
    }),
    updateService: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/services/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Service'],
    }),
    deleteService: builder.mutation({
      query: (id) => ({ url: `/services/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Service'],
    }),

    // APPOINTMENTS
    getAppointments: builder.query({
      query: () => '/appointments',
      providesTags: ['Appointment'],
    }),
    createAppointment: builder.mutation({
      query: (data) => ({ url: '/appointments', method: 'POST', body: data }),
      invalidatesTags: ['Appointment'],
    }),
    updateAppointment: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/appointments/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Appointment'],
    }),
    deleteAppointment: builder.mutation({
      query: (id) => ({ url: `/appointments/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Appointment'],
    }),

    // STAFF
    getStaff: builder.query({
      query: () => '/staff',
      providesTags: ['Staff'],
    }),
    createStaff: builder.mutation({
      query: (data) => ({ url: '/staff', method: 'POST', body: data }),
      invalidatesTags: ['Staff'],
    }),
    updateStaff: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/staff/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Staff'],
    }),
    deleteStaff: builder.mutation({
      query: (id) => ({ url: `/staff/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Staff'],
    }),
  }),
});

export const {
  useRegisterMutation, useLoginMutation, useGetMeQuery, useUpdateProfileMutation,
  useGetServicesQuery, useGetServiceQuery, useCreateServiceMutation, useUpdateServiceMutation, useDeleteServiceMutation,
  useGetAppointmentsQuery, useCreateAppointmentMutation, useUpdateAppointmentMutation, useDeleteAppointmentMutation,
  useGetStaffQuery, useCreateStaffMutation, useUpdateStaffMutation, useDeleteStaffMutation,
} = api;