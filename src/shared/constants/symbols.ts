import { SymbolId, type SlotSymbol } from "../types";

// ─── Asset Paths ──────────────────────────────────────────────────────────────

const SLOTS_PATH = "/src/shared/assets/slots";

// ─── Symbol Definitions ───────────────────────────────────────────────────────
// Higher weight = more frequent.
// Multiplier applies to the current bet on a 4-match win.

export const SYMBOLS: Record<SymbolId, SlotSymbol> = {
    [SymbolId.Seven]: {
        id: SymbolId.Seven,
        imagePath: `${SLOTS_PATH}/7slot.png`,
        label: "Lucky Seven",
        multiplier: 50,
        weight: 4,
    },
    [SymbolId.Cherry]: {
        id: SymbolId.Cherry,
        imagePath: `${SLOTS_PATH}/cheryslot.png`,
        label: "Cherry",
        multiplier: 10,
        weight: 24,
    },
    [SymbolId.Lemon]: {
        id: SymbolId.Lemon,
        imagePath: `${SLOTS_PATH}/lemonslot.png`,
        label: "Lemon",
        multiplier: 8,
        weight: 28,
    },
    [SymbolId.Crown]: {
        id: SymbolId.Crown,
        imagePath: `${SLOTS_PATH}/crownslot.png`,
        label: "Crown",
        multiplier: 20,
        weight: 20,
    },
    [SymbolId.Crystal]: {
        id: SymbolId.Crystal,
        imagePath: `${SLOTS_PATH}/crystallslot.png`,
        label: "Crystal",
        multiplier: 15,
        weight: 24,
    },
};

export const SYMBOL_LIST: SlotSymbol[] = Object.values(SYMBOLS);

// Jackpot trigger: four Lucky Sevens
export const JACKPOT_SYMBOL_ID = SymbolId.Seven;
