const get_lat_lng = async () => {
	return [
		[
			{ lat: 20.7855, lng: 97.036339 },
			{ lat: 26.7855, lng: 87.036339 },
		],
		[
			{ lat: 45.1755, lng: 87.036339 },
			{ lat: 25.7855, lng: 90.036339 },
		],
		[
			{ lat: 24.7855, lng: 87.036339 },
			{ lat: 15.7855, lng: 46.036339 },
		],
		[
			{ lat: 36.7855, lng: 77.036339 },
			{ lat: 55.7855, lng: 16.036339 },
		],
		[
			{ lat: 30.4455, lng: 77.036339 },
			{ lat: 12.7855, lng: 16.036339 },
		],
	];
};

const mapService = {
	get_lat_lng,
};

export default mapService;
