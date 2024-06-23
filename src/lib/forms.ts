import { z } from "zod";

export const formSchema = z.object({
	name: z.string().min(2).max(20),
	time: z.number(),
	log: z.object({moves: z.array(z.array(z.array(z.number())))})
});
export type FormSchema = typeof formSchema;
