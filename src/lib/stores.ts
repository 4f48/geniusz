import { writable } from "svelte/store";

export const log = writable<{ moves: number[][][] }>({ moves: [] });
export const doTiming = writable<boolean>(false);
export const openPublish = writable<boolean>(false);
export const name = writable<string>();
export const time = writable<{ ms: number; s: number; m: number }>({
	ms: 0,
	s: 0,
	m: 0
});
