-- CreateTable
CREATE TABLE "SurveyConfig" (
    "type" TEXT NOT NULL,
    "questions" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SurveyConfig_pkey" PRIMARY KEY ("type")
);
