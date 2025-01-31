// https://bigfrontend.dev/problem/implement-Immutability-helper

const isObject = (data) => typeof data === 'object' && data !== null;

const update = (data, command) => {
	for (const [key, value] of Object.entries(command)) {
		switch (key) {
			case '$push':
				return [...data, ...value];
			case '$set':
				return value;
			case '$apply':
				return value(data);
			case '$merge':
				if (!isObject(data)) {
					throw new Error('not a valid merge');
				}
				return { ...data, ...value };
			default:
				if (Array.isArray(data)) {
					const newArray = [...data];
					newArray[key] = update(data[key], value);
					return newArray;
				} else {
					return {
						...data,
						[key]: update(data[key], value),
					};
				}
		}
	}
};
