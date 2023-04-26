import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_DEV_URL }),
	endpoints: builder => ({}), // ! do not forget to use () || parenthesis while creating rtk-query api or your life will be doomed
})
