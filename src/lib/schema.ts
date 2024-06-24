import { pgTable, serial, varchar, json, integer, timestamp } from "drizzle-orm/pg-core";

export const Leaderboard = pgTable("leaderboard", {
	id: serial("id").unique().primaryKey(),
	player: varchar("player", { length: 20 }).notNull(),
	moves: json("moves").notNull(),
	time: integer("time").notNull(),
	date: timestamp("date").defaultNow().notNull()
});
