// Wraps async route handlers so errors are passed to next() automatically,
// letting the centralized error middleware handle them.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
