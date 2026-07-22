const express = require('express');
const { uploadResume, getResumes, deleteResume } = require('../controllers/resume.controller');
const { protect } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

const router = express.Router();

router.post('/upload', protect, upload.single('resume'), uploadResume);
router.get('/', protect, getResumes);
router.delete('/:id', protect, deleteResume);

module.exports = router;
