import React from 'react';
import './App.css';
import { AppointmentDayView, IAppointment } from './appointment';
import { nanoid } from 'nanoid';


const today = new Date();
const appointmens: IAppointment[] = new Array(10).fill(null).map((_,index) => ({
  startAt: today.setHours(9 + index, 0),
  customer: {
      firstName: nanoid()
  }        
}));

function App() {
  return (
    <div className="App">
      <AppointmentDayView appointments={appointmens} />
    </div>
  );
}

export default App;
