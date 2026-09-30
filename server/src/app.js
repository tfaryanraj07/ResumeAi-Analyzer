const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const env = require('./config/env');
const ResumeFile = require('./models/ResumeFile');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const resumeRoutes = require('./routes/resume.routes');
const { notFound, errorHandler } = require('./middleware/error.middleware');

const app = express();

// Flexible CORS setup supporting Vercel previews and Render deployments
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, direct browser tabs, mobile apps)
      if (!origin) return callback(null, true);
      // Allow configured CLIENT_URL, localhost, vercel.app, render.com
      if (
        !env.CLIENT_URL ||
        origin === env.CLIENT_URL ||
        origin.endsWith('.vercel.app') ||
        origin.endsWith('.onrender.com') ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1')
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. First attempt to serve uploaded files from static local disk
const uploadsPath = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsPath));

// 2. If file is not on disk (e.g. Render ephemeral container restart), pull from MongoDB
app.get('/uploads/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;

    // Check disk first
    const diskFile = path.join(uploadsPath, filename);
    if (fs.existsSync(diskFile)) {
      return res.sendFile(diskFile);
    }

    // Check MongoDB ResumeFile collection
    const storedFile = await ResumeFile.findOne({ fileName: filename });
    if (storedFile && storedFile.fileData) {
      res.setHeader('Content-Type', storedFile.contentType || 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `inline; filename="${encodeURIComponent(storedFile.originalName || filename)}"`
      );
      return res.send(storedFile.fileData);
    }

    return res.status(404).json({
      success: false,
      message:
        'Resume file not found. It may have been cleared during an earlier server restart before database persistence was enabled. Please re-upload your resume.',
    });
  } catch (err) {
    console.error('Error serving upload fallback:', err);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving resume file.',
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ResumeAI API is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes);

// 404 + error handling (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
