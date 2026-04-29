import { GameState } from "../types";

export const OVERLAY_COLORS: Partial<Record<GameState, string>> = {
    [GameState.Win]: "rgba(165, 223, 247, 0.55)",
    [GameState.Lose]: "rgba(186, 86, 43, 0.55)",
};

export const WIN_ANIMATION = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { type: "spring", stiffness: 300, damping: 18 },
} as const;

export const LOSE_ANIMATION = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { type: "tween", duration: 0.2, ease: "easeOut" },
} as const;
