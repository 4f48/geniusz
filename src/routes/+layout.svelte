<script lang="ts">
	import "../app.css";

	import { ModeWatcher } from "mode-watcher";

	import { Toaster } from "$lib/components/ui/sonner";

	import Header from "../components/header.svelte";
</script>

<ModeWatcher />
<Header />
<Toaster />
<slot />
