// ─── Symbol Definitions ───────────────────────────────────────────────────────
// Higher weight = more frequent. Total weight ≈ 100 for easy mental math.
// Multiplier applies to the current bet amount.

import { SymbolId, type SlotSymbol } from "../types";

export const SYMBOLS: Record<SymbolId, SlotSymbol> = {
    [SymbolId.Seven]: {
        id: SymbolId.Seven,
        emoji: "7️⃣",
        label: "Lucky Seven",
        multiplier: 50,
        weight: 2,
    },
    [SymbolId.Cherry]: {
        id: SymbolId.Cherry,
        emoji: "🍒",
        label: "Cherry",
        multiplier: 10,
        weight: 14,
    },
    [SymbolId.Orange]: {
        id: SymbolId.Orange,
        emoji: "🍊",
        label: "Orange",
        multiplier: 8,
        weight: 16,
    },
    [SymbolId.Lemon]: {
        id: SymbolId.Lemon,
        emoji: "🍋",
        label: "Lemon",
        multiplier: 6,
        weight: 18,
    },
    [SymbolId.Pagoda]: {
        id: SymbolId.Pagoda,
        emoji: "🏯",
        label: "Pagoda",
        multiplier: 15,
        weight: 10,
    },
    [SymbolId.Blossom]: {
        id: SymbolId.Blossom,
        emoji: "🌸",
        label: "Blossom",
        multiplier: 12,
        weight: 12,
    },
    [SymbolId.Star]: {
        id: SymbolId.Star,
        emoji: "⭐",
        label: "Star",
        multiplier: 7,
        weight: 16,
    },
    [SymbolId.Coin]: {
        id: SymbolId.Coin,
        emoji: "🪙",
        label: "Coin",
        multiplier: 5,
        weight: 12,
    },
};

// Ordered array for strip generation (most common → least common)
export const SYMBOL_LIST: SlotSymbol[] = Object.values(SYMBOLS);

// Jackpot trigger: four Lucky Sevens
export const JACKPOT_SYMBOL_ID = SymbolId.Seven;
