import type { Actions } from './$types';
import type { PageServerLoad } from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "@/forms";
import { zod } from "sveltekit-superforms/adapters";
 
export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions = {
    default: async (event) => {
        // TODO: Implement server side logic to insert row to DB
    },
} satisfies Actions;