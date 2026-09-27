const fs = require("fs").promises;
const path = require("path");

const textRef = path.join(__dirname, "..", "txt", "vanasonad.txt");

const readTextFile = async function () {
  const rawText = await fs.readFile(textRef, "utf8");
  const folkWisdom = rawText.split(";");
  const randomNumber = Math.floor(Math.random() * folkWisdom.length);
  return folkWisdom[randomNumber];
};

module.exports = { wisdom: readTextFile };
