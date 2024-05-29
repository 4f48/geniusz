<script lang="ts">
	import "../app.css";

	import { ModeWatcher } from "mode-watcher";

	import Header from "../components/header.svelte";
</script>

<ModeWatcher />
<Header />
<slot />
