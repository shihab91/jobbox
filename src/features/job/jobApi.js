import { toast } from 'react-hot-toast'
import { apiSlice } from '../api/apiSlice'

const jobApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		postJob: builder.mutation({
			query: data => ({
				method: 'POST',
				url: '/job',
				body: data,
			}),
			transformResponse: response => {
				toast.success('Successfully added!')
				return response
			},
			invalidatesTags: ['jobs'],
		}),
		apply: builder.mutation({
			query: data => ({
				method: 'PATCH',
				url: '/apply',
				body: data,
			}),
			transformResponse: response => {
				toast.success('Successfully added!')
				return response
			},
			invalidatesTags: ['jobs', 'applied-jobs'],
		}),
		question: builder.mutation({
			query: data => ({
				url: '/query',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['job'],
		}),
		reply: builder.mutation({
			query: data => ({
				url: '/reply',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['job'],
		}),
		getJobs: builder.query({
			query: () => ({
				url: '/jobs',
			}),
			providesTags: ['jobs'],
		}),
		getJob: builder.query({
			query: id => ({
				url: `/job/${id}`,
			}),
			providesTags: ['job'],
		}),
		getAppliedJobs: builder.query({
			query: email => ({
				url: `/applied-jobs/${email}`,
			}),
			providesTags: ['applied-jobs'],
		}),
	}),
})
export const { usePostJobMutation, useGetJobsQuery, useGetJobQuery, useApplyMutation, useGetAppliedJobsQuery, useQuestionMutation, useReplyMutation } = jobApi
