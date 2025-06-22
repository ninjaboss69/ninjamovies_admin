import { GoogleMap } from '@react-google-maps/api';

export default function Map({ onLoad, onUnmount, center, options, isLoaded }) {
	const containerStyle = {
		width: '100%',
		height: '100vh',
	};
	console.log('map is rendering');
	if (!isLoaded) return <div>Map is Loading</div>;
	return (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={10}
			onLoad={onLoad}
			onUnmount={onUnmount}
			options={options}
		></GoogleMap>
	);
}
