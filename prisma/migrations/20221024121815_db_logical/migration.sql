/*
  Warnings:

  - You are about to drop the column `endDate` on the `Travel` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Travel` table. All the data in the column will be lost.
  - Added the required column `goingDate` to the `UserTravel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Travel" DROP COLUMN "endDate",
DROP COLUMN "startDate";

-- AlterTable
ALTER TABLE "UserTravel" ADD COLUMN     "backDate" TIMESTAMP(3),
ADD COLUMN     "goingDate" TIMESTAMP(3) NOT NULL;
