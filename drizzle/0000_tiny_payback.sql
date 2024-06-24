CREATE TABLE IF NOT EXISTS "leaderboard" (
	"id" serial PRIMARY KEY NOT NULL,
	"player" varchar(20) NOT NULL,
	"moves" json NOT NULL,
	"time" integer NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "leaderboard_id_unique" UNIQUE("id")
);
