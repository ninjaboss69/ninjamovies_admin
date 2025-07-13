import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { createRouter } from './src/routing/create-router';
import ProtectedRoute from './src/hook/Auth';

export default function App() {
	const router = createRouter();
	return (
		<Provider store={store}>

			<RouterProvider router={router} />



		</Provider>
	);
}
