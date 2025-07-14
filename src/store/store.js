import mapSlice from './slice/map.slice';
import postSlice from './slice/post.slice';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
	reducer: {
		map: mapSlice.reducer,
		post: postSlice.reducer
	},
	middleware: (mid) => mid({ serializableCheck: false }),
});

export default store;
