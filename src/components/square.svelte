<script lang="ts">
	export let type: string;
</script>

{#if type == "invisible"}
	<div class="m-1 h-[12vw] w-[12vw] md:h-[6vw] md:w-[6vw]"></div>
{:else}
	<div
		class="group m-1 flex h-[12vw] w-[12vw] cursor-pointer items-center justify-center rounded-lg border border-foreground md:h-[6vw] md:w-[6vw]"
	>
		{#if type == "occupied"}
			<div
				class="h-[6vw] w-[6vw] rounded-full bg-foreground duration-300 group-hover:bg-muted-foreground md:h-[3vw] md:w-[3vw]"
			></div>
		{/if}
		{#if type == "selected"}
			<div
				class="h-[6vw] w-[6vw] rounded-full bg-[hsl(183,33%,40%)] duration-300 group-hover:bg-[hsl(190,89%,25%)] dark:bg-[hsl(157,16%,58%)] dark:group-hover:bg-[hsl(183,33%,40%)] md:h-[3vw] md:w-[3vw]"
			></div>
		{/if}
		{#if type == "destination"}
			<div
				class="h-[6vw] w-[6vw] rounded-full bg-[hsl(122,21%,51%)] duration-300 group-hover:bg-[hsl(143,30%,37%)] dark:bg-[hsl(104,35%,62%)] dark:group-hover:bg-[hsl(122,21%,51%)] md:h-[3vw] md:w-[3vw]"
			></div>
		{/if}
		{#if type == "unoccupied"}
			<div
				class="h-[6vw] w-[6vw] rounded-full border border-foreground duration-300 group-hover:bg-secondary md:h-[3vw] md:w-[3vw]"
			></div>
		{/if}
	</div>
{/if}
