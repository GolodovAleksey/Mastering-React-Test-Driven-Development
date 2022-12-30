import { faker } from '@faker-js/faker';
import React from 'react';
import './App.scss';
import { AppointmentDayView } from './appointment';
import { AppointmentForm } from './appointment-form';
import { CustomerForm } from './customer-form';
import { appointmens, getCustomer } from './fixtures';



const TEST_SERVICES = new Array(15).fill(null).map( ()=> faker.commerce.product());

function App() {
  return (
    <div className="App">
      {/* <CustomerForm customer={getCustomer()}/> */}
      {/* <AppointmentDayView appointments={appointmens} /> */}
      <AppointmentForm avaliableServices={TEST_SERVICES} />
    </div>

  );
}

export default App;
