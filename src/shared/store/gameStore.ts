import { create } from "zustand";
import {
    GameState,
    ReelStatus,
    SpinSource,
    SymbolId,
    WinType,
    type GameStore,
    type ReelState,
    type SpinResult,
} from "../types";
import {
    INITIAL_BALANCE,
    BET_DEFAULT,
    BET_MIN,
    BET_MAX,
    JACKPOT_INITIAL,
    JACKPOT_CONTRIBUTION_RATE,
} from "../constants/game";

// ─── Initial Reel State ───────────────────────────────────────────────────────

const buildInitialReels = (): GameStore["reels"] => {
    const reel: ReelState = {
        symbolId: SymbolId.Seven,
        status: ReelStatus.Idle,
    };
    return [{ ...reel }, { ...reel }, { ...reel }, { ...reel }];
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useGameStore = create<GameStore>((set, get) => ({
    // ── Initial state ────────────────────────────────────────────────────────────
    balance: INITIAL_BALANCE,
    bet: BET_DEFAULT,
    reels: buildInitialReels(),
    gameState: GameState.Idle,
    jackpot: JACKPOT_INITIAL,
    isMuted: false,
    isSpinning: false,
    lastResult: null,
    spinSource: null,

    // ── Actions ──────────────────────────────────────────────────────────────────

    spin: (source: SpinSource) => {
        const { balance, bet, isSpinning } = get();
        if (isSpinning) return;
        if (balance < bet) return;

        set((state) => ({
            balance: state.balance - bet,
            jackpot: state.jackpot + bet * JACKPOT_CONTRIBUTION_RATE,
            gameState: GameState.Spinning,
            isSpinning: true,
            spinSource: source, // ← додати
            lastResult: null,
            reels: state.reels.map((reel) => ({
                ...reel,
                status: ReelStatus.Spinning,
            })) as GameStore["reels"],
        }));
    },

    setBet: (value: number) => {
        const clamped = Math.min(BET_MAX, Math.max(BET_MIN, value));
        set({ bet: clamped });
    },

    setMuted: (value: boolean) => {
        set({ isMuted: value });
    },

    setReelStatus: (index: number, status: ReelStatus) => {
        set((state) => {
            const reels = state.reels.map((reel, i) =>
                i === index ? { ...reel, status } : reel,
            ) as GameStore["reels"];
            return { reels };
        });
    },

    setReelSymbol: (index: number, symbolId: SymbolId) => {
        set((state) => {
            const reels = state.reels.map((reel, i) =>
                i === index ? { ...reel, symbolId } : reel,
            ) as GameStore["reels"];
            return { reels };
        });
    },

    resolveResult: (result: SpinResult) => {
        const { jackpot } = get();

        const isJackpot = result.winType === WinType.Jackpot;

        set((state) => ({
            balance: state.balance + result.payout + (isJackpot ? jackpot : 0),
            jackpot: isJackpot ? JACKPOT_INITIAL : state.jackpot,
            gameState:
                result.winType === WinType.None
                    ? GameState.Lose
                    : GameState.Win,
            isSpinning: false,
            lastResult: result,
            reels: state.reels.map((reel) => ({
                ...reel,
                status: ReelStatus.Stopped,
            })) as GameStore["reels"],
            spinSource: null,
        }));
    },

    resetToIdle: () => {
        set({
            gameState: GameState.Idle,
            lastResult: null,
        });
    },
}));

// ─── Selectors ────────────────────────────────────────────────────────────────
// TODO check and verify needing of each

export const selectBalance = (s: GameStore) => s.balance;
export const selectBet = (s: GameStore) => s.bet;
export const selectReels = (s: GameStore) => s.reels;
export const selectGameState = (s: GameStore) => s.gameState;
export const selectJackpot = (s: GameStore) => s.jackpot;
export const selectIsMuted = (s: GameStore) => s.isMuted;
export const selectIsSpinning = (s: GameStore) => s.isSpinning;
export const selectLastResult = (s: GameStore) => s.lastResult;
export const selectSpinSource = (s: GameStore) => s.spinSource;
