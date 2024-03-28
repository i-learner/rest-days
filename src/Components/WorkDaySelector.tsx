interface WorkDaySelectorProps {
    workDays: number[];
    setWorkDays: (leaveDays: number[]) => void;
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function WorkDaySelector({ workDays, setWorkDays }: WorkDaySelectorProps) {
    function toggleDay(day: number, enabled: boolean) {
        const without = workDays.filter(d => d !== day);
        if (enabled) {
            without.push(day);
        }
        setWorkDays(without);
    }

    return (
        <div className="LeaveDaySelector">
            {
                days.map((name, i) => (
                    <label key={i}>
                        <input
                            type="checkbox"
                            checked={workDays.includes(i + 1)}
                            onChange={e => toggleDay(i + 1, e.target.checked)}
                        />
                        <span>{name}</span>
                    </label>
                ))
            }
        </div>
    )
}