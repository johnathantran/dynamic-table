export const setBearer = options => {
	return window.setBearer(options);
};

export const jwtVerify = token => {
	return window.jwtVerify(token);
};

export const jwtHandler = async token => {
	return window.jwtHandler(token);
};
