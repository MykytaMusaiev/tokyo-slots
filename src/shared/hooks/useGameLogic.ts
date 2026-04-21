import { useEffect, useRef } from "react";
import { useGameStore } from "../store/gameStore";
import { selectIsSpinning, selectReels } from "../store/gameStore";
import { ReelStatus, SymbolId, WinType, type SpinResult } from "../types";
import { SYMBOLS, SYMBOL_LIST, JACKPOT_SYMBOL_ID } from "../constants/symbols";
import { REEL_COUNT, REEL_STOP_DELAYS } from "../constants/game";

// ─── Weighted random symbol pick ─────────────────────────────────────────────

function pickWeightedSymbol(): SymbolId {
    const total = SYMBOL_LIST.reduce((sum, s) => sum + s.weight, 0);
    let rand = Math.random() * total;
    for (const s of SYMBOL_LIST) {
        rand -= s.weight;
        if (rand <= 0) return s.id;
    }
    return SYMBOL_LIST[0].id;
}

// ─── Win condition check ──────────────────────────────────────────────────────

function checkWinCondition(
    symbolIds: [SymbolId, SymbolId, SymbolId, SymbolId],
    bet: number,
): SpinResult {
    const [a, b, c, d] = symbolIds;

    // Jackpot: four Lucky Sevens
    if (
        a === JACKPOT_SYMBOL_ID &&
        b === JACKPOT_SYMBOL_ID &&
        c === JACKPOT_SYMBOL_ID &&
        d === JACKPOT_SYMBOL_ID
    ) {
        return {
            winType: WinType.Jackpot,
            payout: 0, // store adds jackpot pool on top
            matchedSymbolId: JACKPOT_SYMBOL_ID,
        };
    }

    // Four-of-a-kind
    if (a === b && b === c && c === d) {
        const multiplier = SYMBOLS[a].multiplier;
        return {
            winType: WinType.FourMatch,
            payout: bet * multiplier,
            matchedSymbolId: a,
        };
    }

    // Three-of-a-kind (any 3 adjacent or any 3 matching)
    const counts = symbolIds.reduce<Partial<Record<SymbolId, number>>>(
        (acc, id) => {
            acc[id] = (acc[id] ?? 0) + 1;
            return acc;
        },
        {},
    );

    for (const [id, count] of Object.entries(counts) as [SymbolId, number][]) {
        if (count >= 3) {
            const multiplier = SYMBOLS[id].multiplier;
            return {
                winType: WinType.ThreeMatch,
                payout: Math.floor(bet * multiplier * 0.3),
                matchedSymbolId: id,
            };
        }
    }

    return { winType: WinType.None, payout: 0, matchedSymbolId: null };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useGameLogic() {
    const isSpinning = useGameStore(selectIsSpinning);
    const reels = useGameStore(selectReels);
    const setReelSymbol = useGameStore((s) => s.setReelSymbol);
    const setReelStatus = useGameStore((s) => s.setReelStatus);
    const resolveResult = useGameStore((s) => s.resolveResult);
    const bet = useGameStore((s) => s.bet);

    // Store timeout IDs for cleanup
    const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        if (!isSpinning) return;

        // Clear any previous timeouts
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];

        // Pre-generate final symbols for all 4 reels
        const finalSymbols = Array.from({ length: REEL_COUNT }, () =>
            pickWeightedSymbol(),
        ) as [SymbolId, SymbolId, SymbolId, SymbolId];

        // Schedule each reel to stop at its designated delay
        finalSymbols.forEach((symbolId, index) => {
            const timeout = setTimeout(() => {
                // Set final symbol first, then trigger stopping animation
                setReelSymbol(index, symbolId);
                setReelStatus(index, ReelStatus.Stopping);

                // After bounce animation (~500ms), mark as fully stopped
                const stopTimeout = setTimeout(() => {
                    setReelStatus(index, ReelStatus.Stopped);

                    // When last reel stops — resolve the result
                    if (index === REEL_COUNT - 1) {
                        const result = checkWinCondition(finalSymbols, bet);
                        resolveResult(result);
                    }
                }, 500);

                timeoutsRef.current.push(stopTimeout);
            }, REEL_STOP_DELAYS[index]);

            timeoutsRef.current.push(timeout);
        });

        return () => {
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
        };
    }, [isSpinning, bet, setReelSymbol, setReelStatus, resolveResult]);

    // Expose reels for consumers if needed
    return { reels };
}
