import { PARTICLE_ICONS } from "../constants/particlePath";
import type { ParticleConfig } from "../types";

export function buildParticles(count: number): ParticleConfig[] {
    return Array.from({ length: count }, (_, i) => {
        const src = PARTICLE_ICONS[i % PARTICLE_ICONS.length];
        const startX = Math.random() * 100; // % from left
        const duration = 8 + Math.random() * 10; // 8–18s
        const delay = -(Math.random() * 15); // stagger via negative delay
        const size = 32 + Math.random() * 28; // 32–60px
        const driftX = (Math.random() - 0.5) * 120; // drift left/right during fall

        return {
            id: i,
            src,
            startX,
            duration,
            delay,
            size,
            driftX,
        };
    });
}
