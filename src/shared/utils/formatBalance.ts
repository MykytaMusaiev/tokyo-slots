export function formatBalance(value: number): { whole: string; cents: string } {
    const fixed = value.toFixed(2);
    const [wholePart, centsPart] = fixed.split(".");

    // Format whole part with spaces: 999999 → "999 999"
    const whole = Number(wholePart)
        .toLocaleString("en-US", { useGrouping: true })
        .replace(/,/g, " ");

    return { whole, cents: centsPart };
}
