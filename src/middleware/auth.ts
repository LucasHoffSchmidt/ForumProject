import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const auth: RequestHandler = async (req, res, next) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET!;
    const authHeader = req.headers.authorization!;
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    req.user = decoded;

    next();
  } catch (err) {
    res.sendStatus(401);
  }
};

export const isAdmin: RequestHandler = (req, res, next) => {
  if (!req?.user?.roles?.includes("ADMIN")) {
    return res.status(403).json({ error: "You are not allowed to do this." });
  }
  next();
};

export default auth;
