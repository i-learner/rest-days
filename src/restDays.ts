/**
 * Get the Nth rest days.
 * @param workDays array of numbers representing work days *e.g. [1,2,3,4,5] for
 * Mon - Fri
 * @param n
 * @returns
 */
export function getRestDayN(workDays: number[], n: number) {
    let binary = 0;

    for (const workDay of workDays) {
        binary |= 1 << (7 - workDay);
    }

    let minVal = Infinity;
    let stepsAtMin = 0;

    for (let i = 0; i < 7; i++) {
        if (binary < minVal) {
            minVal = binary;
            stepsAtMin = i;
        }

        const topBit = binary & (1 << 6);

        binary <<= 1
        binary |= topBit ? 1 : 0;
        binary &= 127;
    }

    const firstRestDay = (stepsAtMin - 1 + n) % 7 + 1;

    if (n === 1) return firstRestDay;

    for (let i = 1; i < 7; i++) {
        const d = (firstRestDay + i + 5) % 7 + 1;
        if (!workDays.includes(d)) {
            return d;
        }
    }

    return NaN;
}