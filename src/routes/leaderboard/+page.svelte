<script lang="ts">
	import type { PageData } from "./$types";
	export let data: PageData;

	import * as Table from "$lib/components/ui/table";
	import Button from "@/components/ui/button/button.svelte";
	import { Crown, Download } from "lucide-svelte";

	function download(moves: string) {
		const blob = new Blob([moves], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		return url;
	}
</script>

<svelte:head>
	<title>Leaderboard - GENIUSZ</title>
	<meta name="description" content="See who's the best genius." />
</svelte:head>

<div class="mt-12 flex h-full w-full justify-center">
	{#if data.result.length > 0}
		<div class="w-full p-5 md:w-[50%]">
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Player</Table.Head>
						<Table.Head>Time</Table.Head>
						<Table.Head>Moves</Table.Head>
						<Table.Head class="text-right">Published at</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data.result as entry}
						<Table.Row>
							<Table.Cell>
								<div class="flex items-center gap-2">
									{#if data.result.at(0)?.id == entry.id}
										<Crown size="17" />
									{/if}
									{entry.player}
								</div>
							</Table.Cell>
							<Table.Cell class="font-mono"
								>{`${Math.floor(entry.time / 60000) < 10 ? 0 + Math.floor(entry.time / 60000).toString() : Math.floor(entry.time / 60000)}:${Math.floor((entry.time % 60000) / 1000) < 10 ? 0 + Math.floor((entry.time % 60000) / 1000).toString() : Math.floor((entry.time % 60000) / 1000)}:${entry.time % 1000 < 10 ? 0 + (entry.time % 1000).toString() : entry.time % 1000}`}</Table.Cell
							>
							<Table.Cell
								><a href={download(JSON.stringify(entry.moves))} download="moves"
									><Button variant="secondary" size="sm" class="flex items-center gap-2"
										><Download size="16px" /> Download</Button
									></a
								></Table.Cell
							>
							<Table.Cell class="text-right">{entry.date.toLocaleDateString()}</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	{:else}
		<div class="m-5 flex w-full flex-col items-center gap-1 md:w-[30%]">
			<h1 class="text-center text-xl font-bold">No one managed to become a Geniusz yet.</h1>
			<a class="w-full" href="/"><Button class="w-full">Be the first. Play now!</Button></a>
		</div>
	{/if}
</div>
