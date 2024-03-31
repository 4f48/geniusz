<script lang="ts">
    const INVISIBLES: Array<number> = [0, 1, 5, 6];

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
            } else {
                temp.push("visible");
            }
        }
        map.push(temp);
    }

    function handle_click(i: number, j: number) {
        let destinations: Array<Array<number>> = [
            [i - 2, j],
            [i + 2, j],
            [i, j - 2],
            [i, j + 2],
        ];

        for (const col in map) {
            for (const field in map[col]) {
                if (map[col][field] == "destination") {
                    map[col][field] = "visible";
                }
            }
        }

        for (const destination of destinations) {
            try {
                if (map[destination[0]][destination[1]] == "visible") {
                    map[destination[0]][destination[1]] = "destination";
                }
            } catch {}
        }
    }
</script>

<table>
    <tbody>
        {#each rows as row, i}
            <tr id={i.toString()}>
                {#each fields as field, j}
                    <th
                        class={map[i][j]}
                        id="{i}:{j}"
                        on:click={() => handle_click(i, j)}>{i}:{j}</th
                    >
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style>
    th {
        background-color: blue;
        padding: 2vw;
        cursor: pointer;
    }

    .invisible {
        background-color: transparent;
        color: transparent;
        cursor: default;
    }

    .visible:hover {
        background-color: red;
    }

    .destination {
        background-color: purple !important;
    }

    table {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
