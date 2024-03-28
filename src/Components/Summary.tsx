import { generateRange, getFirstOfYear, getJulian, getWeekDayFromJulian } from "../calendar";
import { HolidayRecord } from "../holidays";

interface SummaryProps {
    year: number;
    workDays: number[];
    holidays: HolidayRecord[];
    statutory?: boolean;
}

export function Summary({ year, workDays, holidays, statutory = false }: SummaryProps) {
    const yearStart = getFirstOfYear(year);
    const nextStart = getFirstOfYear(year + 1);

    const yearStartJulian = getJulian(new Date(yearStart));
    const nextStartJulian = getJulian(new Date(nextStart));

    const yearLength = nextStartJulian - yearStartJulian;

    const maxWorkingDays = generateRange(yearStartJulian, nextStartJulian).filter((julian: number) => {
        return workDays.includes(getWeekDayFromJulian(julian));
    });

    const holidayJulians = statutory ?
        holidays.filter(h => h.statutory).map(h => h.julian) :
        holidays.map(h => h.julian);

    const workingDays = maxWorkingDays.filter(j => !holidayJulians.includes(j));

    const holidaysOnWorkingDays = holidayJulians.filter(j => workDays.includes(getWeekDayFromJulian(j)));

    return (
        <table className="Summary">
            <tbody>
                <tr>
                    <th>Working Days</th>
                    <td>{workingDays.length}</td>
                </tr>
                <tr>
                    <th>
                        Non-Working Days
                        <table>
                            <tbody>
                                <tr>
                                    <th style={{ paddingLeft: "1em" }}>Weekend days</th>
                                    <td>{yearLength - maxWorkingDays.length}</td>
                                </tr>
                                <tr>
                                    <th style={{ paddingLeft: "1em" }}>Public Holidays on Working days</th>
                                    <td>{holidaysOnWorkingDays.length}</td>
                                </tr>
                            </tbody>
                        </table>
                    </th>
                    <td>{yearLength - maxWorkingDays.length + holidaysOnWorkingDays.length}</td>
                </tr>
                <tr>
                    <th>Total</th>
                    <td>{yearLength}</td>
                </tr>
            </tbody>
        </table>
    )
}