<script lang="ts">
	import Player from "../components/player.svelte";

	import * as Dialog from "$lib/components/ui/dialog";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { Input } from "$lib/components/ui/input/index.js";
	import Button from "@/components/ui/button/button.svelte";

	import { openPublish } from "@/stores";
	let name: string;
</script>

<svelte:head>
	<title>Play - GENIUSZ</title>
	<meta
		name="description"
		content="An old Slovak board game. You can jump with pieces over others to empty squares. When a piece gets jumped over, it gets knocked out. Your goal is to reach one piece remaining on the board."
	/>
</svelte:head>

<Player />

<Dialog.Root bind:open={$openPublish}>
	<!-- Remove later -->
	<Dialog.Trigger>DB</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="flex items-center gap-2">You are a GENIUSZ!</Dialog.Title>
			<Dialog.Description>You may now publish your game to the leaderboard.</Dialog.Description>
		</Dialog.Header>
		<Input type="text" id="name" placeholder="Username" bind:value={name} />

		<Dialog.Footer>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button variant="destructive">Don't publish</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<AlertDialog.Title>Are you sure?</AlertDialog.Title>
						<AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
					</AlertDialog.Header>
					<AlertDialog.Footer>
						<AlertDialog.Action>Take me back</AlertDialog.Action>
						<AlertDialog.Cancel on:click={() => ($openPublish = false)}>I'm sure</AlertDialog.Cancel
						>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
			<Button disabled>Submit</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
