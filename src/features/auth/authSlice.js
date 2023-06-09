import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import auth from '../../firebase/firebase.config'
import { toast } from 'react-hot-toast'

const initialState = {
	user: { email: '', role: '' },
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
export const googleLogin = createAsyncThunk('auth/googleLogin', async (payload, thunkAPI) => {
	const googleProvider = new GoogleAuthProvider()
	try {
		const data = await signInWithPopup(auth, googleProvider)

		return data.user.email
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message)
	}
})
export const getUser = createAsyncThunk('auth/getUser', async (email, thunkAPI) => {
	try {
		const res = await fetch(`${process.env.REACT_APP_DEV_URL}/user/${email}`)
		const data = await res.json()
		if (data.status) {
			return data.data
		}
		return { email }
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message)
	}
})
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOut: state => {
			state.user = { email: '', role: '' }
		},
		setUser: (state, { payload }) => {
			state.user.email = payload
			state.isLoading = false
		},
		toggleLoading: state => {
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
				state.user.email = payload
				toast.success('Signed in successfully!')
			})
			.addCase(createUser.rejected, (state, { payload }) => {
				state.isLoading = false
				state.isError = false
				state.error = payload
				toast.error(`Sign in failed: ${payload}`)
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
				state.user.email = payload
				toast.success('Signed in successfully!')
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				state.isLoading = false
				state.isError = false
				state.error = payload
				toast.error(`Sign in failed: ${payload}`)
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
				state.user.email = payload
				toast.success('Signed in successfully!')
			})
			.addCase(googleLogin.rejected, (state, { payload }) => {
				state.isLoading = false
				state.isError = false
				state.error = payload
				toast.error(`Sign in failed: ${payload}`)
			})
			.addCase(getUser.pending, state => {
				state.isLoading = true
				state.isError = false
				state.error = ''
			})
			.addCase(getUser.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.isError = false
				state.error = ''
				// payload.stat ? state.user = payload.data : state.user.email = payload
				state.user = { ...payload }
			})
			.addCase(getUser.rejected, (state, { payload }) => {
				state.isLoading = false
				state.isError = false
				state.error = payload
			})
	},
})
export const { logOut, setUser, toggleLoading } = authSlice.actions
export default authSlice.reducer
