import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "recipes_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"client_id" integer
  );
  
  CREATE TABLE "clients" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "media" ADD COLUMN "firebase_u_r_l" varchar;
  ALTER TABLE "media" ADD COLUMN "small_u_r_l" varchar;
  ALTER TABLE "media" ADD COLUMN "small_bucket_path" varchar;
  ALTER TABLE "media" ADD COLUMN "bucket_path" varchar;
  ALTER TABLE "media" ADD COLUMN "blurhash" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "clients_id" integer;
  ALTER TABLE "recipes_clients" ADD CONSTRAINT "recipes_clients_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "recipes_clients" ADD CONSTRAINT "recipes_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clients" ADD CONSTRAINT "clients_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "recipes_clients_order_idx" ON "recipes_clients" USING btree ("_order");
  CREATE INDEX "recipes_clients_parent_id_idx" ON "recipes_clients" USING btree ("_parent_id");
  CREATE INDEX "recipes_clients_client_idx" ON "recipes_clients" USING btree ("client_id");
  CREATE INDEX "clients_image_idx" ON "clients" USING btree ("image_id");
  CREATE INDEX "clients_updated_at_idx" ON "clients" USING btree ("updated_at");
  CREATE INDEX "clients_created_at_idx" ON "clients" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_clients_id_idx" ON "payload_locked_documents_rels" USING btree ("clients_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "recipes_clients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "clients" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "recipes_clients" CASCADE;
  DROP TABLE "clients" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_clients_fk";
  
  DROP INDEX "payload_locked_documents_rels_clients_id_idx";
  ALTER TABLE "media" DROP COLUMN "firebase_u_r_l";
  ALTER TABLE "media" DROP COLUMN "small_u_r_l";
  ALTER TABLE "media" DROP COLUMN "small_bucket_path";
  ALTER TABLE "media" DROP COLUMN "bucket_path";
  ALTER TABLE "media" DROP COLUMN "blurhash";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "clients_id";`)
}
