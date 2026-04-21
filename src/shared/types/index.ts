// ─── Game State ───────────────────────────────────────────────────────────────

export const GameState = {
    Idle: "idle",
    Spinning: "spinning",
    Win: "win",
    Lose: "lose",
} as const;
export type GameState = (typeof GameState)[keyof typeof GameState];

// ─── Symbols ──────────────────────────────────────────────────────────────────

export const SymbolId = {
    Seven: "seven",
    Cherry: "cherry",
    Lemon: "lemon",
    Crown: "crown",
    Crystal: "crystal",
} as const;
export type SymbolId = (typeof SymbolId)[keyof typeof SymbolId];

export interface SlotSymbol {
    id: SymbolId;
    imagePath: string;
    label: string;
    multiplier: number;
    weight: number;
}

// ─── Reels ────────────────────────────────────────────────────────────────────

export const ReelStatus = {
    Idle: "idle",
    Spinning: "spinning",
    Stopping: "stopping",
    Stopped: "stopped",
} as const;
export type ReelStatus = (typeof ReelStatus)[keyof typeof ReelStatus];

export interface ReelState {
    symbolId: SymbolId;
    status: ReelStatus;
}

// ─── Win Result ───────────────────────────────────────────────────────────────

export const WinType = {
    None: "none",
    ThreeMatch: "three_match",
    FourMatch: "four_match",
    Jackpot: "jackpot",
} as const;
export type WinType = (typeof WinType)[keyof typeof WinType];

export interface SpinResult {
    winType: WinType;
    payout: number;
    matchedSymbolId: SymbolId | null;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export interface GameStore {
    // State
    balance: number;
    bet: number;
    reels: [ReelState, ReelState, ReelState, ReelState];
    gameState: GameState;
    jackpot: number;
    isMuted: boolean;
    isSpinning: boolean;
    lastResult: SpinResult | null;

    // Actions
    spin: () => void;
    setBet: (value: number) => void;
    setMuted: (value: boolean) => void;
    resolveResult: (result: SpinResult) => void;
    setReelStatus: (index: number, status: ReelStatus) => void;
    setReelSymbol: (index: number, symbolId: SymbolId) => void;
    resetToIdle: () => void;
}

// ─── Component Props ──────────────────────────────────────────────────────────

export interface ReelProps {
    reelIndex: number;
    symbolId: SymbolId;
    status: ReelStatus;
}

export interface ResultPopupProps {
    result: SpinResult;
    onDismiss: () => void;
}

// ─── Component Props ──────────────────────────────────────────────────────────

export interface ParticleConfig {
    id: number;
    src: string;
    style: React.CSSProperties;
    animationClass: string;
}
