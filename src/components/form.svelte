<script lang="ts">
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input/index.js";
	import { toast } from "svelte-sonner";

	import { formSchema, type FormSchema } from "@/forms";
	import { openPublish } from "@/stores";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";

	export let data: SuperValidated<Infer<FormSchema>>;
	const form = superForm(data, {
		validators: zodClient(formSchema),
		onUpdated: ({ form: f}) => {
			if (f.valid) {
				$openPublish = false;
				toast.success("Successfully submitted your game to the leaderboard.")
			} else {
				toast.error("Something went wrong publishing your game. Please try again.")
			}
		},
	});
	const { form: formData, enhance } = form;
</script>

<form method="POST" class="flex flex-col gap-4" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.Description>This will be displayed publicly on the leaderboard.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
