<script lang="ts">
	import { page } from "$app/stores";

	import * as Sheet from "$lib/components/ui/sheet";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button/";

	import Timer from "./timer.svelte";
	import Theme from "./theme.svelte";
	import { Menu, RefreshCw } from "lucide-svelte";

	let sheetOpen: boolean;
	let alertOpen: boolean;
</script>

<!-- Desktop header -->
<header class="hidden h-14 items-center border-b border-foreground lg:flex">
	<div class="ml-36 flex flex-1 items-center justify-start gap-4">
		<Tooltip.Root>
			<Tooltip.Trigger>
				<a href="/" class="text-xl font-bold">geniusz</a>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p class="font-mono">version: sveltekit-rewrite-indev</p>
			</Tooltip.Content>
		</Tooltip.Root>
		<nav class="ml-4 flex items-center gap-4">
			<a href="/about"><Button variant="link">About</Button></a>
			<a href="/playing"><Button variant="link">How to play</Button></a>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Button variant="link" disabled>Leaderboard</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>This feature is not available at the moment.</Tooltip.Content>
			</Tooltip.Root>
		</nav>
	</div>

	<div class="mr-36 flex flex-1 items-center justify-end gap-4">
		{#if $page.url.pathname == "/"}
			<Timer />
			<a href="/" data-sveltekit-reload aria-label="Restart game." class="flex items-center">
				<Badge variant="destructive">Restart</Badge>
			</a>
		{/if}
		<span class="m-4" />
		<Theme />
	</div>
</header>

<!-- Mobile header -->
<header class="flex h-14 items-center border-b border-foreground lg:hidden">
	<div class="ml-4 flex gap-2">
		<Button
			variant="ghost"
			size="icon"
			class="focus:bg-transparent focus:text-foreground"
			on:click={() => (sheetOpen = true)}><Menu /></Button
		>
		<Theme />
	</div>

	<div class="mr-4 flex flex-1 items-center justify-end gap-2">
		{#if $page.url.pathname == "/"}
			<Timer />
			<a href="/" data-sveltekit-reload aria-label="Restart game." class="flex items-center">
				<Badge variant="destructive"><RefreshCw size="15" /></Badge>
			</a>
		{/if}
	</div>
	<Sheet.Root bind:open={sheetOpen}>
		<Sheet.Content side="left" class="pr-0">
			<a href="/" on:click={() => (sheetOpen = false)} class="text-xl font-bold">geniusz</a>
			<nav class="mt-4 flex flex-col space-y-2">
				<a on:click={() => (sheetOpen = false)} href="/about">About</a>
				<a on:click={() => (sheetOpen = false)} href="/playing">How to play</a>
				<a
					on:click={() => {
						sheetOpen = false;
						alertOpen = true;
						console.log(alertOpen);
					}}
					href={$page.url.href}>Leaderboard</a
				>
			</nav>
		</Sheet.Content>
	</Sheet.Root>
	<AlertDialog.Root bind:open={alertOpen}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Leaderboard coming soon</AlertDialog.Title>
				<AlertDialog.Description
					>This feature is not available at the moment. Check back soon.</AlertDialog.Description
				>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Close</AlertDialog.Cancel>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</header>
