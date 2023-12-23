const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}

function checkSelf(req, res, next) {
    if (req.user.userId !== req.params.id) {
        return res.status(403).json({ message: "Access forbidden: You can only access your own data" });
    }
    next();
}

function checkRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Access forbidden: Insufficient permissions" });
        }
        next();
    };
}

module.exports = {
    authenticateToken,
    checkRole,
    checkSelf
}
