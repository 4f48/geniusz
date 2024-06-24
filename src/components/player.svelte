<script lang="ts">
	import Square from "./square.svelte";

	import { doTiming, log, openPublish } from "@/stores";

	const INVISIBLES: Array<number> = [0, 1, 5, 6];
	let destinations: Array<Array<number>>;
	let buf: Array<number>;
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
			setTimeout(() => ($openPublish = true), 1000);
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
