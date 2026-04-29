import { SYMBOL_LIST } from "../constants";
import type { SymbolId } from "../types";

export function getRandomSymbolId(): SymbolId {
    const total = SYMBOL_LIST.reduce((sum, s) => sum + s.weight, 0);
    let rand = Math.random() * total;
    for (const s of SYMBOL_LIST) {
        rand -= s.weight;
        if (rand <= 0) return s.id;
    }
    return SYMBOL_LIST[0].id;
}
