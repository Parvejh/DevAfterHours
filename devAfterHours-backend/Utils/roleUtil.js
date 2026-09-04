const requireRole = (role) => {
    return (req, res, next) => {
        // -- Admin-only routes now reject ordinary signed-in users.
        if (role !== 'admin' || !req.user?.isAdmin) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to perform this action."
            });
        }

        next();
    };
};

module.exports = { requireRole };
