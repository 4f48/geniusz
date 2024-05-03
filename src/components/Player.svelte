<script lang="ts">
    import { doTiming } from "../lib/stores";

    import Square from "./Square.svelte";

    const INVISIBLES: Array<number> = [0, 1, 5, 6];

    let rows: Array<number> = [];
    for (let i = 0; i < 7; i++) {
        rows.push(i);
    }

    let fields: Array<number> = [];
    for (let j = 0; j < 7; j++) {
        fields.push(j);
    }

    const ACTIVE = "";
    const INACTIVE = "";
    const DISABLED = "";

    let map: Array<Array<string>> = [];
    for (let k = 0; k < 7; k++) {
        const temp: Array<string> = [];
        for (let l = 0; l < 7; l++) {
            if (INVISIBLES.includes(k) && INVISIBLES.includes(l)) {
                temp.push("disabled");
            } else if (k == 3 && l == 3) {
                temp.push("invisible");
            } else {
                temp.push("active");
            }
        }
        map.push(temp);
    }

    let destinations: Array<Array<number>> = [];
    let buf: Array<number>;
    let timing: boolean = false;
    let timer: Array<number> = [0, 0, 0];
    let game_log: Array<Array<Array<number>>> = [];

    function handle_click(i: number, j: number) {
        if (map[i][j] == "active") {
            // Clear previous destination squares
            destinations = [];
            for (const row in map) {
                for (const square in map[row]) {
                    if (map[row][square] == "destination") {
                        map[row][square] = "invisible";
                    }
                }
            }

            // Check for new squares to move to
            try {
                if (map[i - 1][j] == "active") {
                    destinations.push([i - 2, j]);
                }
            } catch {}
            try {
                if (map[i + 1][j] == "active") {
                    destinations.push([i + 2, j]);
                }
            } catch {}
            try {
                if (map[i][j - 1] == "active") {
                    destinations.push([i, j - 2]);
                }
            } catch {}
            try {
                if (map[i][j + 1] == "active") {
                    destinations.push([i, j + 2]);
                }
            } catch {}

            for (const destination of destinations) {
                try {
                    if (map[destination[0]][destination[1]] == "invisible") {
                        map[destination[0]][destination[1]] = "destination";
                    }
                } catch {}
            }

            buf = [i, j];
        } else if (map[i][j] == "destination") {
            // Clear other destination squares
            destinations = [];
            for (const row in map) {
                for (const square in map[row]) {
                    if (map[row][square] == "destination") {
                        map[row][square] = "invisible";
                    }
                }
            }

            map[i][j] = "active";
            map[(i + buf[0]) / 2][(j + buf[1]) / 2] = "invisible";
            map[buf[0]][buf[1]] = "invisible";

            // Start timing
            doTiming.set(true);

            // Add move to game log
            game_log.push([
                [buf[0], buf[1]],
                [i, j],
            ]);

            // Check if the player has won
            let count = 0;
            for (const row in map) {
                for (const square in map[row]) {
                    if (map[row][square] == "active") {
                        count = count + 1;
                    }
                }
            }
            if (count == 1) {
                if (
                    window.confirm("You are a GENIUS! Press OK to reload page.")
                ) {
                    location.reload();
                }
            }
        }
    }
</script>

<table class="flex justify-center items-center">
    <tbody>
        {#each rows as row, i}
            <tr id={i.toString()}>
                {#each fields as field, j}
                    <th
                        id="{i}:{j}"
                        on:click={() => handle_click(i, j)}>
                            <Square />
                        </th
                    >
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style>
    /* th {
        background-color: blue;
        padding: 2vw;
        cursor: pointer;
        user-select: none;
    }

    .invisible {
        background-color: transparent;
        color: transparent;
        cursor: default;
    }

    .disabled {
        background-color: transparent;
        color: transparent;
        cursor: default;
    }

    .active:hover {
        background-color: red;
    }

    .destination {
        background-color: purple !important;
    } 

    table {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    p {
        font-size: 24px;
        font-weight: bold;
        position: fixed;
    } */
</style>
