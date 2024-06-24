<script lang="ts">
	import type { PageData } from "./$types";
	export let data: PageData;

	import * as Table from "$lib/components/ui/table";
	import Button from "@/components/ui/button/button.svelte";
	import * as Tooltip from "@/components/ui/tooltip";
</script>

<svelte:head>
	<title>Leaderboard - GENIUSZ</title>
	<meta name="description" content="See who's the best genius." />
</svelte:head>

<div class="mt-12 flex h-full w-full justify-center">
	<div class="w-[50%] p-5">
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
						<Table.Cell>{entry.player}</Table.Cell>
						<Table.Cell class="font-mono"
							>{`${Math.floor(entry.time / 60000) < 10 ? 0 + Math.floor(entry.time / 60000).toString() : Math.floor(entry.time / 60000)}:${Math.floor((entry.time % 60000) / 1000) < 10 ? 0 + Math.floor((entry.time % 60000) / 1000).toString() : Math.floor((entry.time % 60000) / 1000)}:${entry.time % 1000 < 10 ? 0 + (entry.time % 1000).toString() : entry.time % 1000}`}</Table.Cell
						>
						<Table.Cell>
							<Tooltip.Root>
								<Tooltip.Trigger>
									<Button variant="outline" disabled class="cursor-pointer">Open replay</Button>
								</Tooltip.Trigger>
								<Tooltip.Content>Replay mode is not available at the moment.</Tooltip.Content>
							</Tooltip.Root>
						</Table.Cell>
						<Table.Cell class="text-right">{entry.date.toLocaleDateString()}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
