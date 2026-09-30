const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const path = require("path");

/**
 * Extracts plain text from a PDF, DOCX, or DOC file buffer or disk path.
 *
 * @param {string|Buffer} filePathOrBuffer - Disk path or Buffer of the uploaded document
 * @param {string} [mimetype] - Optional MIME type or original file extension
 * @returns {Promise<string>} Cleaned text extracted from the document
 */
const extractTextFromPDF = async (filePathOrBuffer, mimetype = "application/pdf") => {
  try {
    let buffer;
    let extension = "";

    if (Buffer.isBuffer(filePathOrBuffer)) {
      buffer = filePathOrBuffer;
    } else if (typeof filePathOrBuffer === "string") {
      buffer = fs.readFileSync(filePathOrBuffer);
      extension = path.extname(filePathOrBuffer).toLowerCase();
    }

    const isDocx =
      mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      extension === ".docx";

    if (isDocx) {
      console.log("[Document Parser] Parsing DOCX file...");
      const result = await mammoth.extractRawText({ buffer });
      return (result.value || "").trim();
    }

    // Default to PDF parsing
    console.log("[Document Parser] Parsing PDF buffer, length:", buffer.length);
    const data = await pdfParse(buffer);
    return (data.text || "").trim();
  } catch (error) {
    console.error("[Document Parser] Document parse error:", error);
    throw new Error(
      `Failed to parse document text: ${error.message || "Invalid or unreadable document format"}`
    );
  }
};

module.exports = extractTextFromPDF;