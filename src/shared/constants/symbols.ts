import { SymbolId, type SlotSymbol } from "../types";

import sevenImg from "../assets/slots/7slot.png";
import cherryImg from "../assets/slots/cheryslot.png";
import lemonImg from "../assets/slots/lemonslot.png";
import crownImg from "../assets/slots/crownslot.png";
import crystalImg from "../assets/slots/crystallslot.png";

export const SYMBOLS: Record<SymbolId, SlotSymbol> = {
    [SymbolId.Seven]: {
        id: SymbolId.Seven,
        imagePath: sevenImg,
        label: "Lucky Seven",
        multiplier: 50,
        weight: 4,
    },
    [SymbolId.Cherry]: {
        id: SymbolId.Cherry,
        imagePath: cherryImg,
        label: "Cherry",
        multiplier: 10,
        weight: 24,
    },
    [SymbolId.Lemon]: {
        id: SymbolId.Lemon,
        imagePath: lemonImg,
        label: "Lemon",
        multiplier: 8,
        weight: 28,
    },
    [SymbolId.Crown]: {
        id: SymbolId.Crown,
        imagePath: crownImg,
        label: "Crown",
        multiplier: 20,
        weight: 20,
    },
    [SymbolId.Crystal]: {
        id: SymbolId.Crystal,
        imagePath: crystalImg,
        label: "Crystal",
        multiplier: 15,
        weight: 24,
    },
};

export const SYMBOL_LIST: SlotSymbol[] = Object.values(SYMBOLS);
export const JACKPOT_SYMBOL_ID = SymbolId.Seven;
