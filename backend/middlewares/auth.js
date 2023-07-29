const jwt = require('jsonwebtoken');
const ErrorAccess = require('../utils/errors/ErrorAccess');

const auth = (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const [, tokenFromHeader] = authHeader.split(' ');
      token = tokenFromHeader;
    }
  }

  if (!token) {
    return next(new ErrorAccess('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new ErrorAccess('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
