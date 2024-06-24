<script lang="ts">
	import type { PageData } from "./$types";
	export let data: PageData;

	const string = JSON.stringify(data);
</script>

<svelte:head>
	<title>Leaderboard - GENIUSZ</title>
	<meta name="description" content="See who's the best genius." />
</svelte:head>

{#each data.result as item}
	<div class="flex list-none justify-center gap-3">
		<li>{item.player}</li>
		<li>{item.time}</li>
		<li>{JSON.stringify(item.moves)}</li>
	</div>
{/each}
