<script lang="ts">
	import { Button } from "@/components/ui/button";
</script>

<svelte:head>
	<title>How to play - GENIUSZ</title>
	<meta name="description" content="Learn more about how to play GENIUSZ." />
</svelte:head>

<div class="flex h-full w-full justify-center">
	<div class="m-5 flex w-full flex-col gap-3 rounded-md text-justify md:w-[50%] md:bg-muted md:p-5">
		<p>
			Every black dot on the screen represents a piece on the board. You can jump with pieces over
			other pieces to empty squares. When a piece gets jumped over, it gets knocked out. Your goal
			is to reach one piece remaining on the board.
		</p>
		<p>
			To jump, first chose a piece and click on it. That piece will turn blue. Some empty squares
			then will turn green. You can jump to thouse squares by clicking on them. If no squares turn
			green, you cannot jump with that piece. You can always change your mind and click on another
			piece.
		</p>
		<p>
			But be aware, if you click on a green square, you move. A move cannot be undone. If you mess
			up, you'll have to restart the game by clicking on the red restart button on the top right of
			the screen.
		</p>
		<p>
			Now, only one question remains: Who will be the best Geniusz? Compete with real players for
			the fastest times!
		</p>
		<div class="flex w-full justify-center">
			<a href="/" class="w-full"><Button class="w-full" variant="secondary">Play now!</Button></a>
		</div>
	</div>
</div>
