const express = require('express');
const {
  uploadResume,
  getResumes,
  getResumeById,
  getResumeFile,
  deleteResume,
} = require('../controllers/resume.controller');
const { protect } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

const router = express.Router();

router.post('/upload', protect, upload.single('resume'), uploadResume);
router.get('/', protect, getResumes);
router.get('/:id', protect, getResumeById);
router.get('/:id/file', getResumeFile);
router.delete('/:id', protect, deleteResume);

module.exports = router;
