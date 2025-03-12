CREATE TYPE "public"."message_action" AS ENUM('like', 'dislike');--> statement-breakpoint
CREATE TABLE "messages_actions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "messages_actions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"message_id" integer NOT NULL,
	"author_id" integer NOT NULL,
	"action" "message_action" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "saved_messages" ALTER COLUMN "message_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "saved_messages" ALTER COLUMN "author_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "messages_actions" ADD CONSTRAINT "messages_actions_message_id_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "messages_actions" ADD CONSTRAINT "messages_actions_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "saved_messages" ADD CONSTRAINT "saved_messages_message_id_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "saved_messages" ADD CONSTRAINT "saved_messages_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;