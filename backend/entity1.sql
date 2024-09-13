BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "members" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"username"	text,
	"password"	text,
	"email"	text,
	"first_name"	text,
	"last_name"	text,
	"phone_number"	text,
	"address"	text,
	"profile_pic"	longtext,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "products" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"title"	text,
	"description"	text,
	"price"	real,
	"category"	text,
	"picture_product"	longtext,
	"condition"	text,
	"weight"	real,
	"status"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "reviews" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"rating"	integer,
	"comment"	text,
	"member_id"	integer,
	"products_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_members_review" FOREIGN KEY("member_id") REFERENCES "members"("id"),
	CONSTRAINT "fk_products_review" FOREIGN KEY("products_id") REFERENCES "products"("id")
);
CREATE INDEX IF NOT EXISTS "idx_members_deleted_at" ON "members" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_products_deleted_at" ON "products" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_reviews_deleted_at" ON "reviews" (
	"deleted_at"
);
COMMIT;
