import { generateRange, getDateFromJulian, getFirstOfYear, getJulian, getWeekDayFromJulian } from "../calendar";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface CalendarProps {
    year: number;
    workDays: number[];
    holidays: [string, string, number][];
}

export function Calendar({ year, workDays, holidays }: CalendarProps) {
    const yearStart = getFirstOfYear(year);
    const nextStart = getFirstOfYear(year + 1);

    const yearStartJulian = getJulian(new Date(yearStart));
    const nextStartJulian = getJulian(new Date(nextStart));

    const wdFirst = getWeekDayFromJulian(yearStartJulian);

    const startOffset = wdFirst - 1;

    const calendarStart = yearStartJulian - startOffset;

    const weekCount = Math.ceil((nextStartJulian - calendarStart) / 7);

    const weeks = generateRange(0, weekCount).map(w => calendarStart + w * 7);

    const holidayJulians = holidays.map(hol => getJulian(new Date(hol[0])));

    function getDayClassName(julian: number) {
        const date = getDateFromJulian(julian);

        const classNames = [
            workDays.includes(getWeekDayFromJulian(julian)) ? "workDay" : "weekendDay",
        ];

        const holidayIndex = holidayJulians.indexOf(julian);
        if (holidayIndex >= 0) {
            classNames.push(holidays[holidayIndex][2] === 1 ? "statutory" : "general");
        }

        if (julian < yearStartJulian || julian >= nextStartJulian) {
            classNames.push("otherYear");
        }

        classNames.push(date.getMonth() % 2 ? "oddMonth" : "evenMonth");

        return classNames.join(" ");
    }

    return (
        <table className="Calendar">
            <thead>
                <tr>
                    <th>M</th>
                    <th>T</th>
                    <th>W</th>
                    <th>T</th>
                    <th>F</th>
                    <th>S</th>
                    <th>S</th>
                </tr>
            </thead>
            <tbody>
                {weeks.map(weekStart => {
                    const mo = getDateFromJulian(weekStart);
                    const tu = getDateFromJulian(weekStart + 1);
                    const we = getDateFromJulian(weekStart + 2);
                    const th = getDateFromJulian(weekStart + 3);
                    const fr = getDateFromJulian(weekStart + 4);
                    const sa = getDateFromJulian(weekStart + 5);
                    const su = getDateFromJulian(weekStart + 6);

                    const moClass = getDayClassName(weekStart);
                    const tuClass = getDayClassName(weekStart + 1);
                    const weClass = getDayClassName(weekStart + 2);
                    const thClass = getDayClassName(weekStart + 3);
                    const frClass = getDayClassName(weekStart + 4);
                    const saClass = getDayClassName(weekStart + 5);
                    const suClass = getDayClassName(weekStart + 6);

                    return (
                        <tr key={weekStart}>
                            <td className={moClass} title={MONTHS[mo.getMonth()]}>{mo.getDate()}</td>
                            <td className={tuClass} title={MONTHS[tu.getMonth()]}>{tu.getDate()}</td>
                            <td className={weClass} title={MONTHS[we.getMonth()]}>{we.getDate()}</td>
                            <td className={thClass} title={MONTHS[th.getMonth()]}>{th.getDate()}</td>
                            <td className={frClass} title={MONTHS[fr.getMonth()]}>{fr.getDate()}</td>
                            <td className={saClass} title={MONTHS[sa.getMonth()]}>{sa.getDate()}</td>
                            <td className={suClass} title={MONTHS[su.getMonth()]}>{su.getDate()}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}