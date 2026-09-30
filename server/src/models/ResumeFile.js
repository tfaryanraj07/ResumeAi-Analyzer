const mongoose = require('mongoose');

const resumeFileSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    fileName: {
      type: String,
      required: true,
      index: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      default: 'application/pdf',
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    fileData: {
      type: Buffer,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ResumeFile', resumeFileSchema);
