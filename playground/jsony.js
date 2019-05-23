const fs = require('fs');
const book = {
  title: 'The Germanic Tribes',
  author: 'Ausemove'
};

fs.writeFileSync(`1-json.json`, JSON.stringify(book));

// Read binary data from the file
const dataBuffer = fs.readFileSync('1-json.json');
// convert binary to string
const dataJSON = dataBuffer.toString();
// convert string to json object.
const data = JSON.parse(dataJSON);
data.title = 'Hammy';
console.log(data.title);
fs.writeFileSync('1-json.json', JSON.stringify(data));