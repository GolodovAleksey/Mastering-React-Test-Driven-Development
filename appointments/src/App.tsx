import React from 'react';
import './App.scss';
import { AppointmentDayView } from './appointment';
import { CustomerForm } from './customer-form';
import { appointmens } from './fixtures';





function App() {
  return (
    <div className="App">
      <CustomerForm />
      <AppointmentDayView appointments={appointmens} />
    </div>

  );
}

export default App;
