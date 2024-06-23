import { fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types.js";

import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

import { db } from "@/server/db/index";
import { leaderboard } from "@/server/db/schema";

import { formSchema } from "@/forms";

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		await db.insert(leaderboard).values({
			player: form.data.name,
			time: form.data.time,
			moves: form.data.log
		});

		return {
			form
		};
	}
} satisfies Actions;
