import { superValidate } from "sveltekit-superforms";
import { formSchema } from "@/forms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from "@sveltejs/kit";

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

		const data = {
			name: form.data.name,
			time: form.data.time,
			log: form.data.log.moves
		}

		console.log(data.log[0]);
		
		return {
			form
		};
	}
} satisfies Actions;
