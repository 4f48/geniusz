/*
  Warnings:

  - You are about to drop the column `playerName` on the `Leaderboard` table. All the data in the column will be lost.
  - Added the required column `moves` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Leaderboard" DROP COLUMN "playerName",
ADD COLUMN     "moves" JSONB NOT NULL,
ADD COLUMN     "player" VARCHAR(20) NOT NULL;
