<script lang="ts">
	// import { sql } from "@vercel/postgres";
	// import { drizzle } from "drizzle-orm/vercel-postgres";
	// import { Leaderboard } from "@/schema";
	// import { db } from "@/db.server"; NO WORKY

	import * as Dialog from "$lib/components/ui/dialog";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { Input } from "$lib/components/ui/input/index.js";
	import Button from "@/components/ui/button/button.svelte";

	import Square from "./square.svelte";

	import { doTiming, log } from "@/stores";

	const INVISIBLES: Array<number> = [0, 1, 5, 6];
	let destinations: Array<Array<number>>;
	let buf: Array<number>;
	let open: boolean;

	let rows: Array<number> = [];
	for (let i = 0; i < 7; i++) {
		rows.push(i);
	}

	let fields: Array<number> = [];
	for (let j = 0; j < 7; j++) {
		fields.push(j);
	}

	let map: Array<Array<string>> = [];
	for (let k = 0; k < 7; k++) {
		const temp: Array<string> = [];
		for (let l = 0; l < 7; l++) {
			if (INVISIBLES.includes(k) && INVISIBLES.includes(l)) {
				temp.push("invisible");
			} else if (k == 3 && l == 3) {
				temp.push("unoccupied");
			} else {
				temp.push("occupied");
			}
		}
		map.push(temp);
	}

	function check_win() {
		let count = 0;
		for (const row in map) {
			for (const square in map[row]) {
				if (map[row][square] == "occupied") {
					count = count + 1;
				}
			}
		}

		if (count == 1) {
			open = true;
		}
	}

	function clean() {
		destinations = [];
		for (const row in map) {
			for (const square in map[row]) {
				if (map[row][square] == "destination") {
					map[row][square] = "unoccupied";
				}
				if (map[row][square] == "selected") {
					map[row][square] = "occupied";
				}
			}
		}
	}

	function interact(i: number, j: number) {
		if (map[i][j] == "occupied") {
			clean();

			map[i][j] = "selected";

			try {
				if (map[i - 1][j] == "occupied") {
					destinations.push([i - 2, j]);
				}
			} catch {}
			try {
				if (map[i + 1][j] == "occupied") {
					destinations.push([i + 2, j]);
				}
			} catch {}
			try {
				if (map[i][j - 1] == "occupied") {
					destinations.push([i, j - 2]);
				}
			} catch {}
			try {
				if (map[i][j + 1] == "occupied") {
					destinations.push([i, j + 2]);
				}
			} catch {}

			for (const destination of destinations) {
				try {
					if (map[destination[0]][destination[1]] == "unoccupied") {
						map[destination[0]][destination[1]] = "destination";
					}
				} catch {}
			}

			buf = [i, j];
		} else if (map[i][j] == "destination") {
			clean();

			map[i][j] = "occupied";
			map[(i + buf[0]) / 2][(j + buf[1]) / 2] = "unoccupied";
			map[buf[0]][buf[1]] = "unoccupied";

			doTiming.set(true);

			$log.moves.push([
				[buf[0], buf[1]],
				[i, j]
			]);
			console.log($log);

			check_win();
		}
	}

	let name: string;
	async function submit(name: string) {
		// await db.insert(Leaderboard).values({
		// 	player: name, // implement form validation later™
		// 	time: 0, // for testing purposes,
		// 	moves: $log
		// });
	}
</script>

<table class="flex items-center justify-center">
	<tbody>
		{#each rows as _row, i}
			<tr id={i.toString()}>
				{#each fields as _field, j}
					<th id="{i}:{j}" on:click={() => interact(i, j)}>
						<Square type={map[i][j]} />
					</th>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<Dialog.Root bind:open>
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
						<AlertDialog.Cancel on:click={() => (open = false)}>I'm sure</AlertDialog.Cancel>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
			<Button on:click={() => submit(name)} disabled>Submit</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
