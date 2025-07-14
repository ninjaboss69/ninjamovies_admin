import { getLatLng } from '../action/map.action';

const { createSlice } = require('@reduxjs/toolkit');

const DEFAULT_INITIAL_STATE = {
	isLoading: false,
	isSuccess: false,
	markerList: [],
};

const mapSlice = createSlice({
	name: 'map-slice',
	initialState: DEFAULT_INITIAL_STATE,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.markerList = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getLatLng.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getLatLng.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.markerList = action.payload;
		});
		builder.addCase(getLatLng.rejected, (state) => {
			state.isLoading = false;
			state.isSuccess = false;
		});
	},
});

export const { reset } = mapSlice.actions;

export default mapSlice;
