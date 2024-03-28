import { generateRange, getFirstOfYear, getJulian, getWeekDayFromJulian } from "../calendar";
import { HolidayRecord } from "../holidays";
import { getRestDayN } from "../restDays";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface PolicyProps {
    year: number;
    workDays: number[];
    holidays: HolidayRecord[];
    statutory?: boolean;
}

export function Policy({ year, workDays, holidays, statutory = false }: PolicyProps) {
    const yearStart = getFirstOfYear(year);
    const nextStart = getFirstOfYear(year + 1);

    const yearStartJulian = getJulian(new Date(yearStart));
    const nextStartJulian = getJulian(new Date(nextStart));

    const yearLength = nextStartJulian - yearStartJulian;

    const fullYearJulians = generateRange(yearStartJulian, nextStartJulian);

    const maxWorkingDays = fullYearJulians.filter((julian: number) => {
        return workDays.includes(getWeekDayFromJulian(julian));
    });

    const holidayJulians = statutory ?
        holidays.filter(h => h.statutory).map(h => h.julian) :
        holidays.map(h => h.julian);

    const holidaysOnWorkingDays = holidayJulians.filter(j => workDays.includes(getWeekDayFromJulian(j)));

    const nonWorkingDayCount = yearLength - maxWorkingDays.length + holidaysOnWorkingDays.length;

    const monFri = [1, 2, 3, 4, 5];
    const monFriHolidaysOnWorkingDays = holidayJulians.filter(j => monFri.includes(getWeekDayFromJulian(j)));
    const monFriMaxWorkingDays = fullYearJulians.filter((julian: number) => {
        return monFri.includes(getWeekDayFromJulian(julian));
    });
    const monFriNonWorkingDayCount = yearLength - monFriMaxWorkingDays.length + monFriHolidaysOnWorkingDays.length;

    const firstRestDay = getRestDayN(workDays, 1);
    const secondRestDay = getRestDayN(workDays, 2);

    const firstRestClash = holidays.filter(h => getWeekDayFromJulian(h.julian) === firstRestDay);
    const secondRestClash = holidays.filter(h => getWeekDayFromJulian(h.julian) === secondRestDay);

    return (
        <table className="Policy">
            <thead>
                <tr>
                    <th>Policy</th>
                    <th>Days Added</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Tough Luck Policy</th>
                    <td>0</td>
                </tr>
                <tr>
                    <th>Single Rest Day (1st - {DAYS[firstRestDay - 1]})</th>
                    <td>{firstRestClash.length}</td>
                </tr>
                <tr>
                    <th>Single Rest Day (2nd - {DAYS[secondRestDay - 1]})</th>
                    <td>{secondRestClash.length}</td>
                </tr>
                <tr>
                    <th>Monday – Friday Parity </th>
                    <td>{Math.max(monFriNonWorkingDayCount - nonWorkingDayCount, 0)}</td>
                </tr>
                <tr>
                    <th>Double Rest Day</th>
                    <td>{firstRestClash.length + secondRestClash.length}</td>
                </tr>
                <tr>
                    <th>Basic Maths Policy</th>
                    <td>{Math.max(118 - nonWorkingDayCount, 0)}</td>
                </tr>
            </tbody>
        </table>
    )
}