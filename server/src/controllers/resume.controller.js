const fs = require('fs');
const path = require('path');
const Resume = require('../models/Resume');
const ResumeFile = require('../models/ResumeFile');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { analyzeResume } = require('../services/ai.service');
const extractTextFromPDF = require('../utils/pdfParser');

// @route  POST /api/resumes/upload
// @access Private
const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'No file uploaded. Please attach a PDF, DOC, or DOCX file.');
  }

  // Read file buffer (works whether diskStorage or memoryStorage is used)
  let fileBuffer;
  if (req.file.buffer) {
    fileBuffer = req.file.buffer;
  } else if (req.file.path && fs.existsSync(req.file.path)) {
    fileBuffer = fs.readFileSync(req.file.path);
  } else {
    throw new ApiError(500, 'Unable to read uploaded file data.');
  }

  // Extract text from the document
  let resumeText = '';
  try {
    resumeText = await extractTextFromPDF(fileBuffer, req.file.mimetype);
  } catch (parseError) {
    throw new ApiError(
      400,
      `Failed to extract text from file: ${parseError.message || 'Corrupted or unreadable format'}`
    );
  }

  if (!resumeText || resumeText.trim().length < 30) {
    throw new ApiError(
      400,
      'Could not extract readable text from this document. Please ensure your resume has selectable text and is not an empty or image-only scanned document.'
    );
  }

  // Run AI analysis
  let analysis = null;
  try {
    analysis = await analyzeResume(resumeText);
  } catch (aiError) {
    throw new ApiError(
      502,
      `AI Analysis Failed: ${aiError.message || 'Gemini API was unable to evaluate this resume.'}`
    );
  }

  // Create main Resume record in MongoDB
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

  // Persist the binary file into MongoDB so it survives Render ephemeral restarts
  try {
    await ResumeFile.create({
      resumeId: resume._id,
      user: req.user._id,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      contentType: req.file.mimetype,
      fileSize: req.file.size,
      fileData: fileBuffer,
    });
  } catch (storageError) {
    console.error('[Storage] Warning: Failed to cache resume file in MongoDB:', storageError.message);
  }

  res.status(201).json({
    success: true,
    message: 'Resume analyzed successfully',
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

// @route  GET /api/resumes/:id
// @access Private
const getResumeById = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });

  if (!resume) {
    throw new ApiError(404, 'Resume not found');
  }

  res.status(200).json({
    success: true,
    resume,
    analysis: resume.analysis,
  });
});

// @route  GET /api/resumes/:id/file
// @access Public or Private (permits browser tab opening)
const getResumeFile = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (!resume) {
    throw new ApiError(404, 'Resume record not found');
  }

  // Option A: Check local disk
  const localDiskPath = path.join(__dirname, '..', '..', 'uploads', resume.fileName);
  if (fs.existsSync(localDiskPath)) {
    res.setHeader('Content-Type', resume.fileType || 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(resume.originalName)}"`);
    return res.sendFile(localDiskPath);
  }

  // Option B: Retrieve from MongoDB ResumeFile collection
  const storedFile = await ResumeFile.findOne({
    $or: [{ resumeId: resume._id }, { fileName: resume.fileName }],
  });

  if (storedFile && storedFile.fileData) {
    res.setHeader('Content-Type', storedFile.contentType || resume.fileType || 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(storedFile.originalName || resume.originalName)}"`);
    return res.send(storedFile.fileData);
  }

  // Graceful fallback response
  return res.status(404).json({
    success: false,
    message:
      'Resume file not found. It may have been cleared during an earlier server restart before database persistence was enabled. Please re-upload your resume.',
  });
});

// @route  DELETE /api/resumes/:id
// @access Private
const deleteResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });

  if (!resume) {
    throw new ApiError(404, 'Resume not found');
  }

  // Remove physical file from disk if it exists
  const absolutePath = path.join(__dirname, '..', '..', 'uploads', resume.fileName);
  if (fs.existsSync(absolutePath)) {
    try {
      fs.unlinkSync(absolutePath);
    } catch (e) {
      console.warn('Could not unlink local file:', e.message);
    }
  }

  // Remove binary file from MongoDB
  await ResumeFile.deleteMany({
    $or: [{ resumeId: resume._id }, { fileName: resume.fileName }],
  });

  await resume.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Resume deleted successfully',
  });
});

module.exports = {
  uploadResume,
  getResumes,
  getResumeById,
  getResumeFile,
  deleteResume,
};
