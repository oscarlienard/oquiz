BEGIN;

ALTER TABLE "user" ADD COLUMN "role" TEXT DEFAULT 'member';

ALTER TABLE "tag" ADD COLUMN "color" TEXT NULL;

UPDATE "user" SET "role" = 'admin' WHERE "email" = 'o@l.com';

COMMIT;