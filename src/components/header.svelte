<script lang="ts">
	import { page } from "$app/stores";

	import * as Sheet from "$lib/components/ui/sheet";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button/";

	import { doTiming } from "@/stores";

	import Timer from "./timer.svelte";
	import Theme from "./theme.svelte";
	import Nav from "./nav.svelte";
	import { Menu, RefreshCw } from "lucide-svelte";

	let sheetOpen: boolean;

	function mobile_nav() {
		sheetOpen = false;
		$doTiming = false;
	}
</script>

<!-- Desktop header -->
<header class="mb-4 hidden h-14 items-center border-b border-foreground lg:flex">
	<div class="ml-36 flex flex-1 items-center justify-start gap-4">
		<Tooltip.Root>
			<Tooltip.Trigger>
				<a href="/" class="text-xl font-bold duration-75 hover:text-muted-foreground">geniusz</a>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p class="font-mono">version: 1.0.0</p>
			</Tooltip.Content>
		</Tooltip.Root>
		<nav class="ml-4 flex items-center gap-4">
			<Nav href="/about">About</Nav>
			<Nav href="/playing">How to play</Nav>
			<Nav href="/leaderboard">Leaderboard</Nav>
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
<header class="mb-4 flex h-14 items-center border-b border-foreground lg:hidden">
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
				<a on:click={mobile_nav} href="/about">About</a>
				<a on:click={mobile_nav} href="/playing">How to play</a>
				<a on:click={mobile_nav} href="/leaderboard">Leaderboard</a>
			</nav>
		</Sheet.Content>
	</Sheet.Root>
</header>
