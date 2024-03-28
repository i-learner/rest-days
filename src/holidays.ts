import holidays from './data/holidays.json';
const dateCol = 0;
const nameCol = 1;
const statutoryCol = 2;

export function getHolidaysByYear(year: number) {
    // const header = holidays[0];
    // const dateCol = header.indexOf("date");

    // if (dateCol < 0) {
    //     return [];
    // }

    return holidays.filter(hol => {
        const date = hol[dateCol] as string;
        return date.startsWith(year.toString());
    }) as [string, string, number][];
}
