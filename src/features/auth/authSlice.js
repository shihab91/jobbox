import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import auth from '../../firebase/firebase.config'
import { toast } from 'react-hot-toast'

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
		toast.success('user created in successfully')
		return user.email
	} catch (error) {
		toast.error('There was a problem logging in the user')
		return thunkAPI.rejectWithValue(error.message)
	}
})

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password)
		const user = userCredential.user
		toast.success('user logged in successfully')
		return user.email
	} catch (error) {
		toast.error('There was a problem logging in the user')
		return thunkAPI.rejectWithValue(error.message)
	}
})
export const googleLogin = createAsyncThunk('auth/googleLogin', async (payload, thunkAPI) => {
	const googleProvider = new GoogleAuthProvider()
	try {
		const data = await signInWithPopup(auth, googleProvider)
		toast.success('user logged in successfully')
		return data.user.email
	} catch (error) {
		toast.error('There was a problem logging in the user')
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
		setUser: (state, { payload }) => {
			state.email = payload
			state.isLoading = false
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
			.addCase(googleLogin.pending, state => {
				state.isLoading = true
				state.isError = false
				state.error = ''
			})
			.addCase(googleLogin.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.isError = false
				state.error = ''
				state.email = payload
			})
			.addCase(googleLogin.rejected, (state, { payload }) => {
				state.isLoading = false
				state.isError = false
				state.error = payload
			})
	},
})
export const { logOut, setUser } = authSlice.actions
export default authSlice.reducer
