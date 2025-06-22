import { useCallback, useMemo, useState } from 'react';
import { appconfig } from '../../config';
import { useJsApiLoader } from '@react-google-maps/api';
import { useAppDispatch, useAppSelector } from '../../custom/redux';
import { getLatLng } from '../../store/action/map.action';

export default function Hook() {
	const { markerList } = useAppSelector((state) => state.map);
	console.log('markerList', markerList);
	const dispatch = useAppDispatch();
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: appconfig.map_api,
	});
	const options = useMemo(
		() => ({
			disableDefaultUI: false,
			clickableIcons: false,
			mapId: appconfig.map_style_id,
		}),
		[]
	);
	const center = useMemo(() => ({ lat: 20.7855, lng: 97.036339 }), []);
	const [map, setMap] = useState(null);
	const onLoad = useCallback(function callback(map) {
		// trusting google map has loaded
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);
		setMap(map);
	}, []);
	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);
	const clickOnButton = () => {
		dispatch(getLatLng());
	};
	return { map, center, options, isLoaded, onLoad, onUnmount, clickOnButton };
}
