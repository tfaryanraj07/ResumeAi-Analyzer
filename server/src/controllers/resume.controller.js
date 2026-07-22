const fs = require('fs');
const path = require('path');
const Resume = require('../models/Resume');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { analyzeResume } = require("../services/ai.service");
const { listModels } = require("../services/ai.service");

// @route  POST /api/resumes/upload
// @access Private
const extractTextFromPDF = require("../utils/pdfParser");
const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'No file uploaded. Please attach a PDF, DOC, or DOCX file.');
  }
let resumeText = "";
let analysis = null;

if (req.file.mimetype === "application/pdf") {
  resumeText = await extractTextFromPDF(req.file.path);

  console.log(resumeText);

  analysis = await analyzeResume(resumeText);
  

  console.log("AI Analysis:");
  console.log(analysis);
}

  const resume = await Resume.create({
  user: req.user._id,
  originalName: req.file.originalname,
  fileName: req.file.filename,
  filePath: `/uploads/${req.file.filename}`,
  fileType: req.file.mimetype,
  fileSize: req.file.size,
  resumeText,
  analysis,
});

  res.status(201).json({
    success: true,
    message: 'Resume uploaded successfully',
    resume,
    analysis: resume.analysis,
  });
});

// @route  GET /api/resumes
// @access Private
const getResumes = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: resumes.length,
    resumes,
  });
});

// @route  DELETE /api/resumes/:id
// @access Private
const deleteResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });

  if (!resume) {
    throw new ApiError(404, 'Resume not found');
  }

  // Remove the physical file from disk if it exists
  const absolutePath = path.join(__dirname, '..', '..', 'uploads', resume.fileName);
  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }

  await resume.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Resume deleted successfully',
  });
});

module.exports = { uploadResume, getResumes, deleteResume };
