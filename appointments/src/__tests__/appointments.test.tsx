import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Appointment, AppointmentDayView } from '../appointment';
import { nanoid } from 'nanoid';
import { randomRange, toShortTime } from '../utils';
import { appointmens, getCustomer } from '../fixtures';
import { ICustomerField } from '../interfaces';



describe('Appointment', () => {
    let customer;
    const randomCustomer = getCustomer();

    const CUSTOMER_TEST_TABLE = Object
        .keys(randomCustomer)
        .map(key => [key, randomCustomer[key as ICustomerField] || ''])

    const CUSTOMER_FIELD = Object.keys(getCustomer()) as ICustomerField[];

    test('render customer first name', () => {
        customer = getCustomer();
        const { container } = render(<Appointment customer={customer} />);

        expect(container.textContent).toMatch(customer.firstName);
    });

    test.each(CUSTOMER_TEST_TABLE)('test %s against render as %s', (_, expected) => {
        render(<Appointment customer={randomCustomer} />);
        const element = screen.queryByText(expected);

        expect(element).not.toBeNull();
    });

    test.each(CUSTOMER_TEST_TABLE)('render "%s" field and value as table cells', (field, expected) => {
        render(<Appointment customer={randomCustomer} />);
        
        const fieldCell = screen.queryByRole('cell', {
            name: field
        });

        const valueCell = screen.queryByRole('cell', {
            name: expected
        });
        
        expect(fieldCell).not.toBeNull();
        expect(valueCell).not.toBeNull();
    });


    // test('render customer all fields', () => {
    //     const customer = getCustomer();
    //     render(<Appointment customer={customer} />);

    //     for( const field of CUSTOMER_FIELD){
    //         const element = screen.queryByText(customer[field] || '')

    //         expect(element).not.toBeNull();
    //     }
    // });
});

describe('AppointmentsDayView', () => {

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
        for (const entry of appointmens) {
            const element = screen.getByText(toShortTime(entry.startAt));
            expect(element).not.toBeNull();
        }
    });

    test('initialy show message "There are no apointments today"', () => {
        render(<AppointmentDayView appointments={[]} />)
        const element = screen.queryByText('There are no appointments sheduled today');

        expect(element).not.toBeNull();
    });

    test('select first appointment by default', async () => {
        render(<AppointmentDayView appointments={appointmens} />)
        const element = await screen.findByText(appointmens[0].customer.firstName)

        expect(element).not.toBeNull();
    });

    test('render button in each list element with correct time', () => {
        render(<AppointmentDayView appointments={appointmens} />)

        const buttons = screen.queryAllByRole('button');

        expect(buttons).toHaveLength(appointmens.length);
        for (let i = 0; i < appointmens.length; ++i) {
            expect(buttons[i].textContent).toMatch(toShortTime(appointmens[i].startAt))
        }
    });

    test('render selected appointment', () => {
        const randomIndex = randomRange(appointmens.length);
        const { container } = render(<AppointmentDayView appointments={appointmens} />)
        const button = screen.queryAllByRole('button')[randomIndex];
        fireEvent.click(button);

        expect(container).toHaveTextContent(appointmens[randomIndex].customer.firstName)
    });

})
