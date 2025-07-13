import axios from 'axios';
import { appconfig } from '../config';

function isTokenExpired(token) {
	try {
		const payload = JSON.parse(atob(token.split('.')[1]));
		const currentTime = Math.floor(Date.now() / 1000);
		return payload.exp < currentTime;
	} catch (e) {
		return true;
	}
}

async function refreshToken() {
	try {

		const response = await axios.get(`${appconfig.api_url}/backpanel/swap-token`, { withCredentials: true });
		const { accessToken } = response.data.tokens;

		return accessToken;
	} catch (err) {
		window.locaction.href = "/login";
	}

}

async function requestInterceptor(config) {
	let accessToken = localStorage.getItem('accessToken');

	if (accessToken && isTokenExpired(accessToken)) {
		try {
			accessToken = await refreshToken();
			config.headers.Authorization = `secret_key ${accessToken}`;
			localStorage.setItem("accessToken", accessToken);

		} catch (error) {
			console.error('Failed to refresh token:', error);
			throw error;
		}
	}

	if (accessToken) {
		config.headers['secret_key'] = accessToken;
	}

	return config;
}

// Create instances
export const instanceForJSON = axios.create({
	baseURL: appconfig.api_url,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const instanceForMultipart = axios.create({
	baseURL: appconfig.api_url,
	headers: {
		'Content-Type': 'multipart/form-data',
	},
});

// Add request interceptor
instanceForJSON.interceptors.request.use(requestInterceptor);
instanceForMultipart.interceptors.request.use(requestInterceptor);
