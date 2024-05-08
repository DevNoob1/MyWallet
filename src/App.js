import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './component/profile';
import Table from './component/table.js';
import Inputs from './component/input.js';
import Reminder from './component/reminder.js';
import Over from './component/over';
import Loading from './component/loading';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (e.g., fetching data, initializing app)
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading to false after delay (simulated)
    }, 4010); // Adjust the delay time as needed

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      {loading ? (
        <Loading /> // Display loading component while loading is true
      ) : (
        <div className="app">
          <Routes>
            <Route path="/" element={<Over />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/table" element={<Table />} />
            <Route path="/input" element={<Inputs />} />
            <Route path="/reminder" element={<Reminder />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
