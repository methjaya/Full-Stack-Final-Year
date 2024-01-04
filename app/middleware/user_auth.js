
const User = require('../models/user');

const isAuthenticated = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

const checkAdminAuth = async (req, res, next) => {
    const user = await User.findOne({ _id: req.session.uid })
    if (user.role == 'admin') {
        next();
    } else {
        res.status(403).send('You are not authorized');
    }
};

module.exports = { isAuthenticated, checkAdminAuth };