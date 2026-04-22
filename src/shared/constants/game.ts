// ─── Balance ──────────────────────────────────────────────────────────────────

export const INITIAL_BALANCE = 999_999.99;

// ─── Bet ──────────────────────────────────────────────────────────────────────

export const BET_MIN = 1;
export const BET_MAX = 10_000;
export const BET_STEP = 10;
export const BET_DEFAULT = 100;

// ─── Jackpot ──────────────────────────────────────────────────────────────────

export const JACKPOT_INITIAL = 999_999;
export const JACKPOT_CONTRIBUTION_RATE = 0.01; // 1% of each bet → jackpot pool

// ─── Reels ────────────────────────────────────────────────────────────────────

export const REEL_COUNT = 4;

// Delay (ms) before each reel stops, left → right
export const REEL_STOP_DELAYS: [number, number, number, number] = [
    500, 900, 1300, 1700,
];

// Total spin duration before first reel starts stopping
export const SPIN_MIN_DURATION_MS = 500;

// How long the spin loop runs on each reel before stopping
export const REEL_SPIN_LOOP_INTERVAL_MS = 80;

// ─── Animations ───────────────────────────────────────────────────────────────

export const BG_TRANSITION_DURATION_S = 0.4;
export const POPUP_AUTO_DISMISS_MS = 1500;
export const BALANCE_COUNT_DURATION_S = 1.5;

// ─── Particles ────────────────────────────────────────────────────────────────

export const LEAF_COUNT_DESKTOP = 10;
export const LEAF_COUNT_MOBILE = 5;
export const COIN_COUNT_DESKTOP = 6;
export const COIN_COUNT_MOBILE = 3;

// Mobile breakpoint in px
export const MOBILE_BREAKPOINT_PX = 768;
