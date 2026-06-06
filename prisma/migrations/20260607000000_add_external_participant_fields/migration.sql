-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "externalId" TEXT,
ADD COLUMN     "externalMeta" JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "Participant_externalId_key" ON "Participant"("externalId");

