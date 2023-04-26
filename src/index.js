import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from 'react-redux'
import store from './app/store'
import { Toaster } from 'react-hot-toast'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Toaster
				position='top-center'
				reverseOrder={false}
				toastOptions={{
					duration: 2000,
				}}
			/>
			<App />
		</Provider>
	</React.StrictMode>
)
