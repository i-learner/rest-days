import { useState } from "react";

interface HolidayPreviewProps {
    holidays: [string, string, number][];
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function HolidayPreview({ holidays }: HolidayPreviewProps) {
    const [mode, setMode] = useState("statutory");

    const filteredHolidays = mode === "all" ? holidays : (
        mode === "statutory" ?
            holidays.filter(hol => hol[2] === 1) :
            holidays.filter(hol => new Date(hol[0]).getDay() !== 0)
    );

    if (filteredHolidays.length === 0) {
        return null;
    }

    const year = filteredHolidays[0][0].substring(0, 4);

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
                        filteredHolidays.map(([date, name, statutory], i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{name}</td>
                                <td>{date}</td>
                                <td>{DAYS[new Date(date).getDay()]}</td>
                                {mode === "all" && <td>{statutory ? "Statutory" : ""}</td>}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}