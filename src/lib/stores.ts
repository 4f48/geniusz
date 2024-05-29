import { atom, map } from "nanostores";

export const log = map<{ moves: number[][][] }>({ moves: [] });
export const doTiming = atom<boolean>(false);
export const time = map<{ ms: number, s: number, m: number }>({
    ms: 0,
    s: 0,
    m: 0,
});
