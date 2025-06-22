import { createAsyncThunk } from '@reduxjs/toolkit';
import mapService from '../../services/map.service';

export const getLatLng = createAsyncThunk(
	'/get/lat_lng',
	async (__dirname, { rejectWithValue }) => {
		try {
			return await mapService.get_lat_lng();
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
