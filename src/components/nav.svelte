<script lang="ts">
	import { Button } from "$lib/components/ui/button/";
	import { doTiming } from "@/stores";
	export let href: string;
</script>

<a {href} on:click={() => ($doTiming = false)}><Button variant="link"><slot /></Button></a>
