import authSlice from '../features/auth/authSlice'

const { configureStore } = require('@reduxjs/toolkit')

const store = configureStore({
	reducer: {
		auth: authSlice,
	},
})

export default store
