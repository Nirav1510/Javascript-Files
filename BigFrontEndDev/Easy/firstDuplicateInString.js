// https://bigfrontend.dev/problem/find-the-first-duplicate-character-in-a-string

const firstDuplicate = (string) => {
	let obj = {};

	for (let i = 0; i < string.length; i++) {
		if (obj[string[i]]) {
			return string[i];
		}

		obj[string[i]] = true;
	}

	return null;
};
