import { useEffect, useRef } from "react";
import {
    useGameStore,
    selectGameState,
    selectIsSpinning,
    selectReels,
    selectIsMuted,
} from "../store/gameStore";
import { SOUND_KEY } from "../constants/sounds";
import { GameState, ReelStatus, WinType } from "../types";
import { soundService } from "../service/soundService";

export function useSound(): void {
    const gameState = useGameStore(selectGameState);
    const isSpinning = useGameStore(selectIsSpinning);
    const reels = useGameStore(selectReels);
    const isMuted = useGameStore(selectIsMuted);
    const lastResult = useGameStore((s) => s.lastResult);

    const prevGameState = useRef<GameState>(GameState.Idle);
    const prevReelStatuses = useRef(reels.map((r) => r.status));

    // ── Mute / unmute ────────────────────────────────────────────────────────
    useEffect(() => {
        soundService.setMuted(isMuted);
    }, [isMuted]);

    // ── Spinning loop ────────────────────────────────────────────────────────
    useEffect(() => {
        if (isSpinning) {
            soundService.play(SOUND_KEY.SPINNING);
        } else {
            soundService.stop(SOUND_KEY.SPINNING);
        }
    }, [isSpinning]);

    // ── Win / Lose / Jackpot ─────────────────────────────────────────────────
    useEffect(() => {
        if (prevGameState.current === gameState) return;
        prevGameState.current = gameState;

        if (gameState === GameState.Win) {
            const isJackpot = lastResult?.winType === WinType.Jackpot;
            soundService.play(isJackpot ? SOUND_KEY.JACKPOT : SOUND_KEY.WIN);
        } else if (gameState === GameState.Lose) {
            soundService.play(SOUND_KEY.LOSE);
        }
    }, [gameState, lastResult]);

    // ── Reel stops (×1 на кожну зупинку) ────────────────────────────────────
    useEffect(() => {
        reels.forEach((reel, i) => {
            const wasNotStopping =
                prevReelStatuses.current[i] !== ReelStatus.Stopping;
            const isStopping = reel.status === ReelStatus.Stopping;
            if (wasNotStopping && isStopping) {
                soundService.play(SOUND_KEY.SLOT_REVEAL);
            }
        });
        prevReelStatuses.current = reels.map((r) => r.status);
    }, [reels]);
}
