// lib
import { verify } from "../jwt"

export function User(req) {
  function jwtVerify(cb) {
    return verify(cb, req.cookies)
  }

  return {
    jwtVerify,
  }
}

export const isConnected = (
  isLogged = true,
  privilege = "user",
  redirectTo = "/"
) => (req, res, next) => {
  User(req).jwtVerify(user => {
    if (!user && !isLogged) {
      return next()
    } else {
      res.redirect(redirectTo)
    }
  })
}

export default (req, res, next) => {
  res.user = User(req)

  return next()
}
