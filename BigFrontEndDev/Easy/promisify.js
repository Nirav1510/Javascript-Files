// https://bigfrontend.dev/problem/promisify

/**
 * @param {(...args) => void} func
 * @returns {(...args) => Promise<any}
 */
const promisify = (func) => {
	return function (...args) {
		return new Promise((resolve, reject) => {
			func.call(this, ...args, (error, data) => {
				if (error) {
					reject(error);
				} else {
					resolve(data);
				}
			});
		});
	};
};
