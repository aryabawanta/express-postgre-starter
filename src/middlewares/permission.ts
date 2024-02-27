import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { TokenDecode, UserRoles } from "../interfaces"

export function verify(allowedRoles: string[]) {
  return function(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body.user;
      if (allowedRoles.includes(user.role)) {
        next();
      } else {
        return res.status(403).json({ message: `Forbidden. You are not authorized to access this resource with role ${user.role}.` });
      }
    } catch (error: any) {
      return res.status(error.status || 500).json({ message: `An error occurred processing the request. Please try again later`, error: error.message, ...error.response });
    }
  };
}

export function onlyCurrentUserOrAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const [_, token] = (req.header('Authorization') || "")?.split(' ');

    const user = req.body.user;
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenDecode;

    if (user.id === decoded.id || user.role === UserRoles.ADMIN) {
      req.body.user = decoded
      next();
    } else {
      return res.status(403).json({ message: `Forbidden. You are not authorized to access this resource with role ${user.role}.` });
    }
  } catch (error: any) {
    return res.status(error.status || 500).json({ message: `An error occurred processing the request. Please try again later`, error: error.message, ...error.response });
  }
}
