import type { PageServerLoad } from "./$types";
import { db } from "@/server/db";

export const load: PageServerLoad = async () => {
	const result = await db.query.leaderboard.findMany();
	return { result };
};
