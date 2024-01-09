/*
  Warnings:

  - You are about to drop the column `advanceOnSalary` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `baseSalary` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,lastName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "advanceOnSalary",
DROP COLUMN "baseSalary";

-- CreateTable
CREATE TABLE "Paysheet" (
    "id" TEXT NOT NULL,
    "baseSalary" INTEGER NOT NULL,
    "advanceOnSalary" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT,

    CONSTRAINT "Paysheet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paysheet_userId_key" ON "Paysheet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_lastName_key" ON "User"("name", "lastName");

-- AddForeignKey
ALTER TABLE "Paysheet" ADD CONSTRAINT "Paysheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
