import { generateRange, getDateFromJulian, getFirstOfYear, getJulian, getWeekDayFromJulian } from "../calendar";
import { HolidayRecord } from "../holidays";

interface CalendarProps {
    year: number;
    workDays: number[];
    holidays: HolidayRecord[];
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

    function getDayClassName(julian: number) {
        const date = getDateFromJulian(julian);

        const classNames = [
            workDays.includes(getWeekDayFromJulian(julian)) ? "workDay" : "weekendDay",
        ];

        const holiday = holidays.find(h => h.julian === julian);
        if (holiday) {
            classNames.push(holiday.statutory ? "statutory" : "general");
        }

        if (julian < yearStartJulian || julian >= nextStartJulian) {
            classNames.push("otherYear");
        }

        classNames.push(date.getMonth() % 2 ? "oddMonth" : "evenMonth");

        return classNames.join(" ");
    }

    const formatter = new Intl.DateTimeFormat([], { dateStyle: "long" })

    function getDayTitle(julian: number) {
        const d = getDateFromJulian(julian);
        const titles = [
            formatter.format(d),
        ];

        const holiday = holidays.find(h => h.julian === julian);
        if (holiday) {
            titles.push(holiday.name);
        }

        return titles.join("\n");
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

                    const moTitle = getDayTitle(weekStart);
                    const tuTitle = getDayTitle(weekStart + 1);
                    const weTitle = getDayTitle(weekStart + 2);
                    const thTitle = getDayTitle(weekStart + 3);
                    const frTitle = getDayTitle(weekStart + 4);
                    const saTitle = getDayTitle(weekStart + 5);
                    const suTitle = getDayTitle(weekStart + 6);

                    return (
                        <tr key={weekStart}>
                            <td className={moClass} title={moTitle}>{mo.getDate()}</td>
                            <td className={tuClass} title={tuTitle}>{tu.getDate()}</td>
                            <td className={weClass} title={weTitle}>{we.getDate()}</td>
                            <td className={thClass} title={thTitle}>{th.getDate()}</td>
                            <td className={frClass} title={frTitle}>{fr.getDate()}</td>
                            <td className={saClass} title={saTitle}>{sa.getDate()}</td>
                            <td className={suClass} title={suTitle}>{su.getDate()}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}