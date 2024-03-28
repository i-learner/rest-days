import { useState } from "react";
import { HolidayRecord } from "../holidays";

interface HolidayPreviewProps {
    holidays: HolidayRecord[];
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function HolidayPreview({ holidays }: HolidayPreviewProps) {
    const [mode, setMode] = useState("statutory");

    const filteredHolidays = mode === "all" ? holidays : (
        mode === "statutory" ?
            holidays.filter(hol => hol.statutory) :
            holidays.filter(hol => hol.date.getDay() !== 0)
    );

    if (filteredHolidays.length === 0) {
        return null;
    }

    const year = filteredHolidays[0].date.getFullYear();

    return (
        <div>
            <p>
                <select value={mode} onChange={e => setMode(e.target.value)}>
                    <option value="statutory">Statutory Holidays</option>
                    <option value="general">General Holidays</option>
                    <option value="all">All Public Holidays</option>
                </select>
            </p>

            {mode === "statutory" && <p>The {filteredHolidays.length} statutory holidays for {year} are:</p>}

            <table className={`HolidayPreview HolidayPreview--${mode}`}>
                <tbody>
                    {
                        mode === "general" && <tr><td></td><td>Every Sunday</td><td></td><td>Sunday</td></tr>
                    }
                    {
                        filteredHolidays.map((hol, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{hol.name}</td>
                                <td>{isodate(hol.date)}</td>
                                <td>{DAYS[hol.date.getDay()]}</td>
                                {mode === "all" && <td>{hol.statutory ? "Statutory" : ""}</td>}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

function isodate(date: Date) {
    return date.toISOString().substring(0, 10);
}