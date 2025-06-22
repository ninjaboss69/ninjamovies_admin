export const queryMaker = (obj) => {
	let result = '';
	Object.entries(obj).forEach(([key, value], index) => {
		index === 0
			? (result += `?${value && `${key}=${value}`}`)
			: (result += `${value && `&${key}=${value}`}`);
	});
	return result;
};
