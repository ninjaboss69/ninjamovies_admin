import { Fragment, useMemo } from 'react';
import { useAppSelector } from '../../custom/redux';

export const ErrorBoxProvider = ({ children }) => {

	// this error check only server side endpoint api error
	// frontend error are handled by ErrorPage.js
	const checkBoxByStatus = (err) => {
		if (!err) return;
		console.log('catch error', err);
		if (err.isError) {
			switch (err.statusCode) {
				default:
					return <div>Backend said Something wasn't right</div>;
			}
		}
	};

	// later inject to error for every api request

	const err = useAppSelector((state) => state.error);

	const ErrorBoxComponent = useMemo(() => checkBoxByStatus(err), [err]);

	return (
		<Fragment>
			{ErrorBoxComponent}
			{children}
		</Fragment>
	);
};
