// Given a string and array of keywords, highlight the words in the string that are part of the array of keywords.

const str = "Ultimate JavaScript / FrontEnd Guide";
const words = ["Front", "end", "JavaScript"];

// output : "Ultimate <strong>JavaScript</strong> / <strong>FrontEnd</strong> Guide"

const highlight = (str, keywords, caseSensitive = false) => {
  if (caseSensitive) {
    keywords = keywords.map((word) => word.toLowerCase());
  }

  const uniqueWords = new Set(keywords);

  const words = str.split(" ");

  const hasWords = (word) => {
    const temp = caseSensitive ? word.toLowerCase() : word;
    return uniqueWords.has(temp);
  };

  const result = words.map((word) => {
    let output = "";

    if (hasWords(word)) {
      output = `<strong>${word}</strong>`;
    } else {
      for (let i = 0; i < word.length; i++) {
        const prefix = word.slice(0, i + 1);
        const suffix = word.slice(i + 1);

        if (hasWords(prefix) && hasWords(suffix)) {
          output = `<strong>${prefix}${suffix}</strong>`;
          break;
        } else if (hasWords(prefix) && !hasWords(suffix)) {
          output = `<strong>${prefix}</strong>${suffix}`;
        } else if (!hasWords(prefix) && hasWords(suffix)) {
          output = `${prefix}<strong>${suffix}</strong>`;
        }
      }
    }
    return output !== "" ? output : word;
  });

  return result.join(" ");
};

console.log(highlight(str, words));
