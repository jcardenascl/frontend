// lib
import { verify } from '../jwt';

export function User(req) {
  function jwtVerify(cb) {
    return verify(cb, req.cookies);
  }

  return {
    jwtVerify
  };
}

export const isConnected = (isLogged = true, redirectTo = '/') => (
  req,
  res,
  next
) => {
  User(req).jwtVerify(user => {
    if (!user && !isLogged) {
      return next();
    }

    if (user && isLogged) {
      return next();
    }

    return res.redirect(redirectTo);
  });
};

export default (req, res, next) => {
  res.user = User(req);

  return next();
};
