const asyncHandler = require('../utils/asyncHandler');

// @route  GET /api/users/profile
// @access Private
const getProfile = asyncHandler(async (req, res) => {
  // req.user is attached by the auth middleware
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      createdAt: req.user.createdAt,
    },
  });
});

module.exports = { getProfile };
