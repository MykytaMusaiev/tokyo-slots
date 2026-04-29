import type { ReelStrip, SymbolId } from "../types";
import { getRandomSymbolId } from "./getRandomSymbolId";

export function buildIdleStrip(symbolId: SymbolId, h: number): ReelStrip {
    return {
        above: getRandomSymbolId(),
        visible: symbolId,
        below: getRandomSymbolId(),
        translateY: -h,
    };
}
