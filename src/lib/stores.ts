import { atom, map } from "nanostores";

export const doTiming = atom<boolean>(false);
export const log = map<{ moves: number[][][] }>({ moves: [] });