
import { useState } from 'react';
import './App.css';
import WeekDayApi from './components/WeekdayAPIs/WeekDayApi';
import Home from './components/Home/Home';

function App() {
  const [jobData, setJobData] = useState([]);
  return (
    <div className="App">
      <h1>Welcome to WeekDay Job Finder!</h1>
      <WeekDayApi setJobData={setJobData} />
      {<Home jobData={jobData} />}
      
    </div>
  );
}

export default App;
