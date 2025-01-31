// Input:
const str = 'Hello, world';
const styleArr = [
	[0, 2, 'i'],
	[4, 9, 'b'],
	[7, 10, 'u'],
];

// Output:
// '<i>Hel</i>l<b>o, w<u>orl</u></b><u>d</u>'

/**
 * Parses the given string with the provided markups and returns the HTML content.
 * @param {string} inputString - The input string to be parsed.
 * @param {Array<[number, number, string]>} markups - The array of markups containing start index, end index, and tag.
 * @returns {string} - The HTML content after parsing.
 */
function parse(string, markups) {
	// place the opening and closing tags at the appropriate indexes
	const fragments = markups.reduce(
		(chars, [start, end, tag]) => {
			chars[start] = `<${tag}>` + chars[start];
			chars[end] += `</${tag}>`;
			return chars;
		},
		[...string]
	);

	// pass this string to DOMParser()
	// to convert it to HTML
	return new DOMParser().parseFromString(fragments.join(''), 'text/html').body.innerHTML;
}

const ans = parse(str, styleArr);
console.log(ans);
