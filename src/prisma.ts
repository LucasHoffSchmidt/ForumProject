import { PrismaClient } from "@prisma/client";
import env from "dotenv";
env.config();
console.log("conn string:", process.env.DATABASE_URL);

let prisma = new PrismaClient();

export default prisma;
