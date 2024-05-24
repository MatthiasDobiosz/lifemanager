/*
  Warnings:

  - Added the required column `status` to the `Todos` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Todos` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "Todos" ADD COLUMN     "status" "TodoStatus" NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
