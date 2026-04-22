CREATE TABLE "Settings_new" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
CREATE UNIQUE INDEX "Settings_key_key" ON "Settings_new"("key");
INSERT INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('facebook', 'facebook', 'https://facebook.com/visaplus', datetime('now'));
INSERT INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('instagram', 'instagram', 'https://instagram.com/visaplus', datetime('now'));
INSERT INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('linkedin', 'linkedin', 'https://linkedin.com/company/visaplus', datetime('now'));
INSERT INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('x', 'x', 'https://x.com/visaplus', datetime('now'));
INSERT INTO "Settings_new" ("id", "key", "value", "updatedAt") VALUES ('tiktok', 'tiktok', 'https://tiktok.com/@visaplus', datetime('now'));
DROP TABLE "Settings";
ALTER TABLE "Settings_new" RENAME TO "Settings";