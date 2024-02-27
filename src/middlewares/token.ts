import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../interfaces";

export async function verify(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  const [bearerText, token] = (req.header("Authorization") || "")?.split(" ");

  if (bearerText !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Access denied. No valid token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.body.user = decoded;
    req.body.id = decoded;
    if (decoded !== req.body.user) {
      return res.status(404).json({
        message: "Logged in user data not found, token maybe invalid.",
      });
    }
    if (!!decoded?.deletedAt) {
      return res.status(403).json({
        message: "Forbidden. User account has been suspended.",
      });
    }
    next();
  } catch (error: any) {
    return res.status(error.status || 500).json({
      message: `An error occurred processing the request. Please try again later`,
      error: error.message,
      ...error.response,
    });
  }
}

export async function appendUserDataToRequest(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const [bearerText, token] = (req.header("Authorization") || "")?.split(" ");
    if (bearerText !== "Bearer" || !token) throw "";

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) throw "";

    req.body.user = decoded;
  } catch (error: any) {}
  next();
}
