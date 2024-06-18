-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Admin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "Roles"[];
