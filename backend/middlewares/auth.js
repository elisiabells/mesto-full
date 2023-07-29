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

  const { NODE_ENV, JWT_SECRET } = process.env;
  const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new ErrorAccess('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
