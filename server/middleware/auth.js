const jwt = require('jsonwebtoken');
const User = require('../models/users.model')
function authenticateToken(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message:  'No token, authorization denied'});
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {

        if (err) {
            return res.sendStatus(403);
        }

        try {
            const fullUser = await User.findById(decoded.userId)
                .populate('role')
                .select('-password')

            if (!fullUser) {
                return res.status(403).json({ message: 'Access forbidden: User not found' });
            }

            req.user = {
                ...decoded,
                name: fullUser.name,
                lastName: fullUser.lastName,
                email: fullUser.email,
                role: fullUser.role
            };

            next();

        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
}

function checkPermission(permission) {
    return (req, res, next) => {

        const hasPermission = req.user.role.some(role =>
            role.permissions.includes(permission)
        );

        if (!hasPermission) {
            return res.status(403).json({ message: 'Access forbidden: Insufficient permissions' });
        }

        next();
    };
}


module.exports = {
    authenticateToken,
    checkPermission
}
