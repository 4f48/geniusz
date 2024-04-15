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
                temp.push("disabled");
            } else if (k == 3 && l == 3) {
                temp.push("invisible");
            } else {
                temp.push("visible");
            }
        }
        map.push(temp);
    }

    function check_win() {
        let count = 0;

        for (const col in map) {
            for (const field in map[col]) {
                if (count > 1) {
                    return 0;
                }

                if (map[col][field] != "invisible") {
                    count = count + 1;
                }
            }
        }

        if (count == 1) {
            setTimeout(() => {
                alert("YOU WIN!");
                location.reload();
            }, 1000);
        }
    }

    let buf: Array<number>;
    let timing: boolean = false;
    function handle_click(i: number, j: number) {
        if (map[i][j] != "disabled") {
            if (timing == false) {
                timing = true;
                time();
            }

            let destinations: Array<Array<number>> = [
                [i - 2, j],
                [i + 2, j],
                [i, j - 2],
                [i, j + 2],
            ];

            if (map[i][j] == "visible") {
                for (const col in map) {
                    for (const field in map[col]) {
                        if (map[col][field] == "destination") {
                            map[col][field] = "invisible";
                        }
                    }
                }

                for (const destination of destinations) {
                    try {
                        if (
                            map[destination[0]][destination[1]] == "invisible"
                        ) {
                            map[destination[0]][destination[1]] = "destination";
                        }
                    } catch {}
                }
            } else if (map[i][j] == "destination") {
                for (const col in map) {
                    for (const field in map[col]) {
                        if (map[col][field] == "destination") {
                            map[col][field] = "invisible";
                        }
                    }
                }

                map[i][j] = "visible";
                map[(i + buf[0]) / 2][(j + buf[1]) / 2] = "invisible";
                map[buf[0]][buf[1]] = "invisible";
            }

            buf = [i, j];
            check_win();
        }
    }

    check_win();

    let timer: Array<number> = [0, 0, 0];
    function time() {
        setInterval(() => {
            if (timer[2] < 99) {
                timer[2] = timer[2] + 1;
            } else {
                timer[2] = 0;
                timer[1] = timer[1] + 1;
            }

            if (timer[1] >= 60) {
                timer[1] = 0;
                timer[0] = timer[0] + 1;
            }
        }, 10);
    }
</script>

<p>
    {timer[0]}:{timer[1] < 10 ? 0 + timer[1].toString() : timer[1]}:{timer[2] <
    10
        ? 0 + timer[2].toString()
        : timer[2]}
</p>
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
        user-select: none;
    }

    .disabled {
        background-color: transparent;
        color: transparent;
        cursor: default;
        user-select: none;
    }

    .visible:hover {
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
    }
</style>
