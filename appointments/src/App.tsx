import React from 'react';
import './App.scss';
import { AppointmentDayView } from './appointment';
import { appointmens } from './fixtures';





function App() {
  return (
    <div className="App">
      <AppointmentDayView appointments={appointmens} />
    </div>
  );
}

export default App;
