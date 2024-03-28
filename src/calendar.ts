/**
 * Returns number in range 1 - 7 (Mon - Sun)
 * @param date
 * @returns
 */
export function getWeekDay(date: string) {
    const dt = new Date(date);
    return (dt.getDay() + 6) % 7 + 1;
}

/**
 * Returns number in range 1 - 7 (Mon - Sun)
 * @param date
 * @returns
 */
export function getWeekDayFromJulian(julian: number) {
    return ((julian + 1) % 7) + 1;
}


/**
 * Respects hour field in DateTime struct
 * i.e. if dt->hour == 0 then gives JD at midnight
 * Algorithm from https://quasar.as.utexas.edu/BillInfo/JulianDatesG.html
 */
export function getJulian(dt: Date) {
    let y = dt.getUTCFullYear();
    let m = dt.getUTCMonth() + 1;
    let d = dt.getUTCDate();

    if (m < 3) {
        y--;
        m += 12;
    }

    let a = Math.floor(y / 100);
    let b = Math.floor(a / 4);
    let c = 2 - a + b;
    let e = Math.floor(365.25 * (y + 4716));
    let f = Math.floor(30.6001 * (m + 1));

    let h = dt.getUTCHours();

    let g = h < 12 ? 1 : 0;
    return c + d + e + f - 1524 - g;
}

export function getDateFromJulian(julian: number) {
    const Z = julian + 1;
    const W = Math.floor((Z - 1867216.25) / 36524.25);
    const X = Math.floor(W / 4);
    const A = Z + 1 + W - X;
    const B = A + 1524;
    const C = Math.floor((B - 122.1) / 365.25);
    const D = Math.floor(365.25 * C);
    const E = Math.floor((B - D) / 30.6001);
    const F = Math.floor(30.6001 * E);

    let month = E - 1;
    if (month > 12) {
        month -= 12;
    }

    return new Date(month <= 2 ? C - 4715 : C - 4716, month - 1, B - D - F);
}


export function getFirstOfYear(year: number) {
    return `${year.toString().padStart(4, "0")}-01-01`;
}

export function generateRange(inclusiveStart: number, exclusiveEnd: number) {
    return Array.from({ length: exclusiveEnd - inclusiveStart }).map((_, i) => inclusiveStart + i);
}