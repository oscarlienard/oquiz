BEGIN;

ALTER TABLE "user" ADD COLUMN "role" TEXT DEFAULT 'member';

UPDATE "user" SET "role" = 'admin' WHERE "email" = 'o@l.com';

COMMIT;