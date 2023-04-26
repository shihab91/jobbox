import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import auth from './firebase/firebase.config'
import { useDispatch } from 'react-redux'
import { setUser, toggleLoading } from './features/auth/authSlice'

function App() {
	const dispatch = useDispatch()
	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) dispatch(setUser(user.email))
			else {
				dispatch(toggleLoading())
			}
		})
	}, [dispatch])
	return (
		<>
			<RouterProvider router={routes} />
		</>
	)
}

export default App;
