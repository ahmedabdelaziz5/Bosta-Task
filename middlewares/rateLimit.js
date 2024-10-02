//  Rate limit middleware to prevent DoS attacks
const { RateLimiterMemory } = require("rate-limiter-flexible");

// Define allowed request limits
const allowedTime = 1 * 60; // 1 minute
const defaultPoints = 10; // Default points for general routes

// Define a function to dynamically set rate limits based on the request URL
const routeSpecificLimit = (req) => {
    if (req.url.startsWith('/api/user/login')) return 5;
    if (req.url.startsWith('/api')) return 15;
    return defaultPoints;
};

// Create the rate limiter with in-memory storage
const opts = {
    points: routeSpecificLimit,
    duration: allowedTime,
    keyPrefix: 'rateLimiter',
};

// init rate limiter
const rateLimiter = new RateLimiterMemory(opts);

// Trusted IPs that bypass rate limiting
// me -> ['127.0.0.1', '::1']
const whitelist = ['127.0.0.1', '::1'];

// Middleware function for rate limiting
module.exports = async (req, res, next) => {
    if (whitelist.includes(req.ip)) return next();
    try {
        await rateLimiter.consume(req.ip, 1);
        next();
    }
    catch (rateLimiterRes) {
        res.set({
            'Retry-After': Math.ceil(rateLimiterRes.msBeforeNext / 1000),
        });
        console.warn(`IP: ${req.ip} exceeded rate limit on ${req.originalUrl}`);
        res.status(429).json({
            error: 'Too Many Requests',
            message: `You have exceeded your request limit. Please wait for ${Math.ceil(rateLimiterRes.msBeforeNext / 1000)} seconds and try again.`,
        });
    }
};