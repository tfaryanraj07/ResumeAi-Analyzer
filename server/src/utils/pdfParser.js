const fs = require("fs");
const pdfParse = require("pdf-parse");

const extractTextFromPDF = async (filePath) => {
  try {
    console.log("Reading:", filePath);

    const buffer = fs.readFileSync(filePath);

    console.log("Buffer length:", buffer.length);

    const data = await pdfParse(buffer);

    return data.text;
  } catch (error) {
    console.error("PDF Parse Error:");
    console.error(error);
    throw error;
  }
};

module.exports = extractTextFromPDF;