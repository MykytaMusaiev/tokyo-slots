import { useEffect, useLayoutEffect, useRef } from "react";
import { useGameStore } from "../store/gameStore";
import { selectIsSpinning } from "../store/gameStore";
import { ReelStatus, SymbolId, WinType, type SpinResult } from "../types";
import { SYMBOLS, JACKPOT_SYMBOL_ID } from "../constants/symbols";
import { REEL_COUNT, REEL_STOP_DELAYS } from "../constants/game";
import { getRandomSymbolId } from "../utils/getRandomSymbolId";

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

    // Three-of-a-kind
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

export function useGameLogic(): void {
    const isSpinning = useGameStore(selectIsSpinning);
    const setReelSymbol = useGameStore((s) => s.setReelSymbol);
    const setReelStatus = useGameStore((s) => s.setReelStatus);
    const resolveResult = useGameStore((s) => s.resolveResult);
    const bet = useGameStore((s) => s.bet);

    const betRef = useRef(bet);
    useLayoutEffect(() => {
        betRef.current = bet;
    });

    const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        if (!isSpinning) return;

        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];

        const betAtSpinStart = betRef.current;

        const finalSymbols = Array.from({ length: REEL_COUNT }, () =>
            getRandomSymbolId(),
        ) as [SymbolId, SymbolId, SymbolId, SymbolId];

        finalSymbols.forEach((symbolId, index) => {
            const timeout = setTimeout(() => {
                setReelSymbol(index, symbolId);
                setReelStatus(index, ReelStatus.Stopping);

                // After bounce animation (~500ms), mark as fully stopped
                const stopTimeout = setTimeout(() => {
                    setReelStatus(index, ReelStatus.Stopped);

                    // When last reel stops — resolve the result
                    if (index === REEL_COUNT - 1) {
                        const result = checkWinCondition(
                            finalSymbols,
                            betAtSpinStart,
                        );
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
    }, [isSpinning, setReelSymbol, setReelStatus, resolveResult]);
}
