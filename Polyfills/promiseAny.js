const resolvedApis = (time) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(time);
		}, time);
	});
};

const rejectedApis = (time) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(time);
		}, time);
	});
};

let taskList = [rejectedApis(500), rejectedApis(1500), rejectedApis(1000)];

function myPromiseAny(taskList) {
	let result = '';
	let count = 0;
	return new Promise((resolve, reject) => {
		// for (let i = 0; i < taskList.length; i++) {
		//   taskList[i]
		//     .then((res) => {
		//       result = res;
		//       resolve(result);
		//     })
		//     .catch((err) => {
		//       count += 1;
		//       if (count === taskList.length) {
		//         reject(["Aggregate Error: All Promises rejected"]);
		//       }
		//     });
		// }

		taskList.forEach((task, index) => {
			task
				.then((res) => {
					result = res;
					resolve(result);
				})
				.catch((err) => {
					count += 1;
					if (count === taskList.length) {
						reject(['Aggregate Error: All Promises rejected']);
					}
				});
		});
	});
}

myPromiseAny(taskList)
	.then((results) => {
		console.log('got results', results);
	})
	.catch((e) => console.error('error', e));
