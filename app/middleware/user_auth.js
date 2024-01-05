
const User = require('../models/user');
const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).send('Unauthorized');
  
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) return res.status(403).send('You are not authorized');
      req.user = user
      next()
    })
};

const checkAdminAuth = async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.uid })
    if(!user){
        res.status(404).send({message : 'User not found'});
    }
    if (user.role == 'admin') {
        next();
    } else {
        res.status(403).send({message :'You are not authorized'});
    }
};

module.exports = { isAuthenticated, checkAdminAuth };