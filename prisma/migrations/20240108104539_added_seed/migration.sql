/*
  Warnings:

  - Added the required column `baseSalary` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "advanceOnSalary" INTEGER,
ADD COLUMN     "baseSalary" INTEGER NOT NULL;
