import mapSlice from './slice/map.slice';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
	reducer: {
		map: mapSlice.reducer,
	},
	middleware: (mid) => mid({ serializableCheck: false }),
});

export default store;
