// Implement a Promise-Based Retry Mechanism

const fetchWithAutoRetry = (fetcher, maximumRetryCount) => {
	return new Promise((resolve, reject) => {
		let count = 0;

		const callApi = () => {
			fetcher()
				.then((res) => resolve(res))
				.catch((e) => {
					if (count < maximumRetryCount) {
						count++;
						console.log('reject-retry', count);
						callApi();
					} else {
						console.log('reject', count);
						reject(e);
					}
				});
		};

		callApi();
	});
};

const mockFetcher = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject('reject');
		}, 1000);
	});
};

fetchWithAutoRetry(mockFetcher, 3)
	.then((result) => console.log(result))
	.catch((error) => console.log(error));
