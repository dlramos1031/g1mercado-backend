const jwt = require('jsonwebtoken');

// Middleware for authenticating JWT tokens
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization'); // Expecting a Bearer token in the header

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Split to get the actual token
        req.user = verified; // Attach user info to the request
        next(); // Pass control to the next middleware or route handler
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticateToken;
