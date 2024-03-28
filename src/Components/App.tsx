import { useState } from 'react'
import './App.css'
import { WorkDaySelector } from './WorkDaySelector';
import { getHolidaysByYear } from '../holidays';
import { HolidayPreview } from './HolidayPreview';
import { Summary } from './Summary';
import { Calendar } from './Calendar';

function App() {
  const [workDays, setWorkDays] = useState([] as number[]);
  const [year, setYear] = useState(2024);

  const holidays = getHolidaysByYear(year);

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
        <HolidayPreview holidays={holidays} />
        <h2>Summary</h2>
        <Summary year={year} workDays={workDays} holidays={holidays} />
      </div>
      <Calendar year={year} workDays={workDays} holidays={holidays} />
    </>
  )
}

export default App
