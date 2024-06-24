import { asc } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

import { db } from "@/server/db";
import { leaderboard } from "@/server/db/schema";

export const load: PageServerLoad = async () => {
	const result = await db.query.leaderboard.findMany({
		orderBy: [asc(leaderboard.time)]
	});
	return { result };
};
