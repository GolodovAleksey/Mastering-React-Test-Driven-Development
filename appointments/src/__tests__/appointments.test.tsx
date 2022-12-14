import React from 'react';
// import ReactDOM from 'react-dom'
import { render, screen } from '@testing-library/react';
import { Appointment, AppointmentDayView, IAppointment } from '../appointment';
import { nanoid } from 'nanoid';
import { toShortTime } from '../utils';

describe('Appointment', () => {
    let customer;
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement('div');
    })

    const testRender = (component: JSX.Element) => render(component, { container })

    test('render the customer first name', () => {
        customer = { firstName: 'Ashley' };
        const component = <Appointment customer={customer} />

        testRender(component);

        expect(container.textContent).toMatch('Ashley');
    });

    test('render another customer first name', () => {
        const name = 'Jordan'
        customer = { firstName: name };
        const component = <Appointment customer={customer} />

        testRender(component);

        expect(container.textContent).toMatch(name);
    });
});

describe('AppointmentsDayView', () => {
    let container: HTMLDivElement;
    const today = new Date();
    const appointmens: IAppointment[] = new Array(10).fill(null).map((_,index) => ({
        startAt: today.setHours(9 + index, 0),
        customer: {
            firstName: nanoid(8)
        }        
    }));

    beforeEach(() => {
        container = document.createElement('div');
    })

    test('render div with right id', () => {
        const testID = nanoid();
        render(<AppointmentDayView appointments={[]} dataset={{ 'testid': testID }} />)

        expect(screen.getByTestId(testID)).not.toBeNull();
    });

    test('render multiple appointments in an ol elements', () => {
        
        
        render(<AppointmentDayView appointments={appointmens} />)
        const appointmentsList = screen.getByRole('list');
        const appointmentsItems = screen.getAllByRole('listitem');

        expect(appointmentsList).not.toBeNull();
        expect(appointmentsItems).toHaveLength(appointmens.length);
    });

    test('render multiple appointments with right date display', () => {
        render(<AppointmentDayView appointments={appointmens} />)
        for(const entry of appointmens){
            const element = screen.getByText(toShortTime(entry.startAt));
            expect(element).not.toBeNull();
        }
    });

    test('initialy show message "There are no apointments today"', () => {
        render(<AppointmentDayView appointments={[]} />)
        const element = screen.queryByText('There are no appointments sheduled today');
        
        expect(element).not.toBeNull();
    });

    test('select first appointment by default', ()=>{
        render(<AppointmentDayView appointments={appointmens} />)
        const element = screen.queryByText(appointmens[0].customer.firstName)

        expect(element).not.toBeNull();
    })

})
