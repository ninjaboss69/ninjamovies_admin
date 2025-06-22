import Hook from './hook';
import Icon from '../../../assets/con_cc.svg';
import { lazy } from 'react';
const Map = lazy(() => import('./map'));

function Home() {
	const { map, center, options, isLoaded, onLoad, onUnmount, clickOnButton } = Hook();
	return (
		<div>
			<div>
				<button className="bg-blue-500" onClick={clickOnButton}>
					Clcik Me To Dispatch Action
				</button>

				{/* <Map
					map={map}
					center={center}
					options={options}
					isLoaded={isLoaded}
					onLoad={onLoad}
					onUnmount={onUnmount}
				/> */}
				<img src={Icon} alt="ww" />
			</div>
		</div>
	);
}

export default Home;
