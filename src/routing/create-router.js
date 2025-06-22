import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import { routes } from './routes';

export function createRouter() {
	// use browser router if you just want to do clean url or easy traditional development
	// use hash router if you want to host static files easily like netlify
	// @Author Ninjaboss
	return createBrowserRouter(routes);
	// hash router can easily serve by simply 'npx webpack'
	// browser router need to configure from server side to always serve index.html
}
