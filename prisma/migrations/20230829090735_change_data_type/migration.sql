/*
  Warnings:

  - Changed the type of `minCredit` on the `semester_registration` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `maxCredit` on the `semester_registration` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "semester_registration" DROP COLUMN "minCredit",
ADD COLUMN     "minCredit" INTEGER NOT NULL,
DROP COLUMN "maxCredit",
ADD COLUMN     "maxCredit" INTEGER NOT NULL;
