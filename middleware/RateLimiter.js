import rateLimiter from 'express-rate-limit';

// General limiter for API endpoints
export const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // 5 requests per 15 minutes
    message: 'Too many requests, please try again later.'
});

// Limiter specifically for sign-in requests
export const signInLimiter = rateLimiter({
    windowMs: 10 * 1000, // 10 seconds
    max: 3, // 3 requests per 10 seconds
    message: 'Too many sign-in attempts, please try again after a short while.'
});
