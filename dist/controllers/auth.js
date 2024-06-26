import jwt from "jsonwebtoken";
import prisma from "../prisma.js";
import env from "dotenv";
import bcrypt from "bcrypt";
env.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const login = async (req, res) => {
    const { username } = req.body;
    const user = await prisma.user.findFirst({
        where: { username },
        include: { password: true },
    });
    if (!user) {
        return res.status(401).json({ message: "Invalid username" });
    }
    if (!user.password?.hash) {
        return res.status(401).json({ message: "error with username or password" });
    }
    const passwordValid = await bcrypt.compare(req.body.password, user.password?.hash);
    if (!passwordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user.id, username: user.username, roles: user.roles }, JWT_SECRET, {
        expiresIn: "6h",
    });
    res.json({ token });
};
export const register = async (req, res, next) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log(hashedPassword);
    const user = await prisma.user.create({
        data: {
            ...req.body,
            password: {
                create: {
                    hash: hashedPassword,
                },
            },
        },
    });
    res.status(201).json({ user });
};
const { z } = require("zod");
