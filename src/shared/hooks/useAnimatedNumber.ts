import { useEffect, useRef, useState } from "react";
import { BALANCE_COUNT_DURATION_S } from "../constants/game";

function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}

export function useAnimatedNumber(target: number): number {
    const [displayed, setDisplayed] = useState<number>(target);
    const prevRef = useRef<number>(target);
    const rafRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        const from = prevRef.current;
        const to = target;

        if (from === to) return;

        const duration = BALANCE_COUNT_DURATION_S * 1000;

        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
        }

        startTimeRef.current = null;

        function tick(timestamp: number) {
            if (startTimeRef.current === null) {
                startTimeRef.current = timestamp;
            }

            const elapsed = timestamp - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            const current = from + (to - from) * eased;

            setDisplayed(current);

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                prevRef.current = to;
                rafRef.current = null;
            }
        }

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [target]);

    return displayed;
}
