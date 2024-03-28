import { useMemo, useState } from 'react'
import './App.css'
import { WorkDaySelector } from './WorkDaySelector';
import { getHolidaysByYear } from '../holidays';
import { HolidayPreview } from './HolidayPreview';
import { Summary } from './Summary';
import { Calendar } from './Calendar';
import { Policy } from './Policy';

function App() {
  const [workDays, setWorkDays] = useState([1, 2, 3, 4, 5]);
  const [year, setYear] = useState(2024);
  const [ignoreNonStatutory, setIgnoreNonStatutory] = useState(false);

  const allHolidays = useMemo(() => getHolidaysByYear(year), [year]);

  const holidays = ignoreNonStatutory ?
    allHolidays.filter(h => h.statutory) :
    allHolidays;

  return (
    <>
      <div style={{ flex: 1, marginRight: 16 }}>
        <h2>Work Days</h2>
        <WorkDaySelector workDays={workDays} setWorkDays={setWorkDays} />
        {/* {workDays.length !== 5 && <p>Choose 5 work days.</p>} */}
        <h2>Year</h2>
        <div>
          <button onClick={() => setYear(year => year - 1)}>&lt;</button>
          <input type="number" value={year} onChange={e => setYear(e.target.valueAsNumber)} />
          <button onClick={() => setYear(year => year + 1)}>&gt;</button>
        </div>
        <h2>Public Holidays</h2>
        <label>
          <input type="checkbox" checked={ignoreNonStatutory} onChange={e => setIgnoreNonStatutory(e.target.checked)} />
          <span>Ignore Non-Statutory Holidays</span>
        </label>
        <HolidayPreview holidays={holidays} />
        <h2>Summary</h2>
        <Summary year={year} workDays={workDays} holidays={holidays} />
        <h2>Policy</h2>
        <label>
          <input type="checkbox" checked={ignoreNonStatutory} onChange={e => setIgnoreNonStatutory(e.target.checked)} />
          <span>Ignore Non-Statutory Holidays</span>
        </label>
        <Policy year={year} workDays={workDays} holidays={holidays} />
      </div>
      <Calendar year={year} workDays={workDays} holidays={holidays} />
    </>
  )
}

export default App
