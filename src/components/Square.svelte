<script lang="ts">
    export let type: string;
</script>

{#if type == "active"}
    <div
        class="group border border-neutral-400 w-[12vw] h-[12vw] md:w-[6vw] md:h-[6vw] bg-transparent m-1 rounded-lg flex items-center justify-center cursor-pointer"
    >
        <div
            class="w-[6vw] h-[6vw] md:w-[3vw] md:h-[3vw] bg-black group-hover:bg-gray-900 duration-300 rounded-full border-black"
        ></div>
    </div>
{/if}
{#if type == "destination"}
    <div
        class="group border border-neutral-400 w-[12vw] h-[12vw] md:w-[6vw] md:h-[6vw] bg-transparent m-1 rounded-lg flex items-center justify-center cursor-pointer"
    >
        <div
            class="w-[6vw] h-[6vw] md:w-[3vw] md:h-[3vw] bg-purple-800 group-hover:bg-purple-950 duration-300 rounded-full border-black"
        ></div>
    </div>
{/if}
{#if type == "inactive"}
    <div
        class="group border border-neutral-400 w-[12vw] h-[12vw] md:w-[6vw] md:h-[6vw] bg-transparent m-1 rounded-lg flex items-center justify-center cursor-pointer"
    >
        <div
            class="w-[6vw] h-[6vw] md:w-[3vw] md:h-[3vw] group-hover:bg-gray-200 duration-300 rounded-full border-black border"
        ></div>
    </div>
{/if}
{#if type == "invisible"}
    <div
        class="group border border-transparent w-[12vw] h-[12vw] md:w-[6vw] md:h-[6vw] m-1 rounded-lg cursor-default"
    ></div>
{/if}
