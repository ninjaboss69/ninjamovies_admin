import axios from 'axios';
import { appconfig } from '../config';
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
