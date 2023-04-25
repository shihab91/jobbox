import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import auth from '../../firebase/firebase.config'

const initialState = {
	email: '',
	role: '',
	isLoading: true,
	isError: false,
	error: '',
}
export const createUser = createAsyncThunk('auth/createUser', async ({ email, password }, thunkAPI) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password)
		const user = userCredential.user
		return user.email
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message)
	}
})

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password)
		const user = userCredential.user
		return user.email
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message)
	}
})
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOut: state => {
			state.email = ''
		},
	},
	extraReducers: builder => {
		builder
			.addCase(createUser.pending, state => {
				state.isLoading = true
				state.isError = false
				state.error = ''
			})
			.addCase(createUser.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.isError = false
				state.error = ''
				state.email = payload
			})
			.addCase(createUser.rejected, (state, { payload }) => {
				state.isLoading = false
				state.isError = false
				state.error = payload
			})
			.addCase(loginUser.pending, state => {
				state.isLoading = true
				state.isError = false
				state.error = ''
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.isError = false
				state.error = ''
				state.email = payload
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				state.isLoading = false
				state.isError = false
				state.error = payload
			})
	},
})
export const { logOut } = authSlice.actions
export default authSlice.reducer
