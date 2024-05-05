<script lang="ts">
    import { doTiming } from "../lib/stores";

    doTiming.subscribe((value) => {
        if (value == true) {
            setInterval(() => {
                if (ms < 99) {
                    ms = ms + 1;
                } else {
                    ms = 0;
                    s = s + 1;
                }

                if (s >= 60) {
                    s = 0;
                    m = m + 1;
                }

                timer = `${m < 10 ? 0 + m.toString() : m}:${s < 10 ? 0 + s.toString() : s}:${ms < 10 ? 0 + ms.toString() : ms}`;
            }, 10);
        }
    });

    let ms = 0;
    let s = 0;
    let m = 0;

    let timer = "00:00:00";
</script>

<span class="font-[GeistMono]">{timer}</span>
