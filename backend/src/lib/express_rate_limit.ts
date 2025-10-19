import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60000, // 1 min window
  limit: 60, // max requests
  standardHeaders: 'draft-8', // latest standards
  legacyHeaders: false, // disabled deprecated headers
  message: {
    error:
      'You have sent too many requests in a given amount of time. Please try again later',
  },
});

export default limiter;
