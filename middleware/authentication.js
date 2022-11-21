const { signedCookies } = require('cookie-parser');
const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  
  console.log(req.signedCookies.token)
  
  if(!token)
  {
    const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }
  }
  console.log(token);
  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }

  try {
    const { name, userId, role,company } = isTokenValid({ token });
    req.user = { name, userId, role,company };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }
};

const authorizePermissions = (...roles) => {
  
  return (req, res, next) => {
    //console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
   
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
