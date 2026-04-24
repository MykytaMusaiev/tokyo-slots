export const SOUND_KEY = {
    LEVER_DOWN: "leverDown",
    SPIN_BUTTON: "spinButton",
    SPINNING: "spinning",
    SLOT_REVEAL: "slotReveal",
    WIN: "win",
    LOSE: "lose",
    JACKPOT: "jackpot",
    CHANGE_BET: "changeBet",
} as const;

export type SoundKey = (typeof SOUND_KEY)[keyof typeof SOUND_KEY];
