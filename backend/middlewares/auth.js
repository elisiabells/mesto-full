const jwt = require('jsonwebtoken');
const ErrorAccess = require('../utils/errors/ErrorAccess');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ErrorAccess('Необходима авторизация'));
  }

  const token = authHeader.split(' ')[1];

  let payload;

  try {
    payload = jwt.verify(token, 'JWT_SECRET');
  } catch (err) {
    return next(new ErrorAccess('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
