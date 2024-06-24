<script lang="ts">
	import type { PageData } from "./$types.js";
	import Form from "../components/form.svelte";
	export let data: PageData;

	import Player from "../components/player.svelte";

	import * as Dialog from "$lib/components/ui/dialog";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import Button from "@/components/ui/button/button.svelte";

	import { doTiming, openPublish } from "@/stores";
	let openAlert: boolean;
</script>

<svelte:head>
	<title>Play - GENIUSZ</title>
	<meta
		name="description"
		content="An old Slovak board game. You can jump with pieces over others to empty squares. When a piece gets jumped over, it gets knocked out. Your goal is to reach one piece remaining on the board."
	/>
</svelte:head>

<Dialog.Root bind:open={$openPublish}>
	<!-- Remove later -->
	<Dialog.Trigger on:click={() => ($doTiming = false)}>DB</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="flex items-center gap-2">You are a GENIUSZ!</Dialog.Title>
			<Dialog.Description>You may now publish your game to the leaderboard.</Dialog.Description>
		</Dialog.Header>

		<Form data={data.form} />

		<Button variant="destructive" on:click={() => (openAlert = true)}>Don't publish</Button>
		<AlertDialog.Root bind:open={openAlert}>
			<AlertDialog.Trigger></AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>Are you sure?</AlertDialog.Title>
					<AlertDialog.Description
						>This action cannot be undone. Your game will be lost forever.</AlertDialog.Description
					>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Action>Take me back</AlertDialog.Action>
					<AlertDialog.Cancel on:click={() => ($openPublish = false)}>I'm sure</AlertDialog.Cancel>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	</Dialog.Content>
</Dialog.Root>

<Player />
