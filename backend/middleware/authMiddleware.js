
const jwt = require('jsonwebtoken');
const User = require('../models/RegisterUserModel');

const authMiddleware = async (req, res, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'noobmaster');
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error('Error with authentication middleware', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
