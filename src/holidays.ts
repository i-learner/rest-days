import { getJulian } from './calendar';
import holidays from './data/holidays.json';
const dateCol = 0;
// const nameCol = 1;
// const statutoryCol = 2;

export interface HolidayRecord {
    date: Date;
    julian: number;
    name: string;
    statutory: boolean;
}

export function getHolidaysByYear(year: number): HolidayRecord[] {
    // const header = holidays[0];
    // const dateCol = header.indexOf("date");

    // if (dateCol < 0) {
    //     return [];
    // }

    return holidays.filter(hol => {
        const date = hol[dateCol] as string;
        return date.startsWith(year.toString());
    }).map(h => {
        const date = new Date(h[0]);

        return {
            date,
            julian: getJulian(date),
            name: h[1] as string,
            statutory: h[2] === 1,
        };
    })
}
