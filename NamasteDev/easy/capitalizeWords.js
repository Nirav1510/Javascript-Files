function capitalizeWords(s) {
  if (!s) return "";

  const str = s.trim();
  const strArr = str.toLowerCase().split(/\s+/);

  const capitalized = strArr.map((word) => {
    if (word.length === 0) return "";

    return word[0].toUpperCase() + word.slice(1);
  });

  return capitalized.join(" ");
}

const result = capitalizeWords("hello world! this is a test.");
console.log(result); // "Hello World! This Is A Test."
