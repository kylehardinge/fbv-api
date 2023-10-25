// Imports
const fs = require("fs");
const convert = require("xml-js");

// Location of the file to parse
let fbvBibleLoc;

fbvBibleLoc = process.argv[2];

// Error handling
if (!fbvBibleLoc) {
    console.error("Please provide the XML file as a command-line argument.");
    process.exit(1);
}

if (!fs.existsSync(fbvBibleLoc)) {
    console.error("The specified file does not exist or is inaccessible.");
    process.exit(1);
}

// Read the file and parse
fs.readFile(fbvBibleLoc, "utf8", function (err, data) {
    if (err) {
        return console.error(err);
    }

    const parsedData = convert.xml2json(cleanData(data), { compact: !true, spaces: 4 });
    console.log(parsedData);
});

// Remove strong greek references
function cleanData(data) {
    return data.replace(/<[\/]?w.*?>/g, '');
}
