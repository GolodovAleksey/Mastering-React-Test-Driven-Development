import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppointmentForm } from '../appointment-form';
import { nanoid } from 'nanoid';

describe('Appointment form', () => {
    const FORM_ID = nanoid();

    const TEST_SERVICES = new Array(6).fill(null).map(() => nanoid());
    const randomIndex = <T,>(source: T[]) => Math.floor(source.length * Math.random());
    const randomElement = <T,>(source: T[]) => source[randomIndex(source)];

    test('it renders a component', () => {
        render(<AppointmentForm testid={FORM_ID} />);
        const form = screen.queryByTestId(FORM_ID);

        expect(form).not.toBeNull();
    });

    test('it renders as form', () => {
        render(<AppointmentForm testid={FORM_ID} />);
        const form = screen.queryByTestId(FORM_ID);

        expect(form?.tagName).toStrictEqual('FORM');
    });

    test('it renders "Service" selectbox', () => {
        render(<AppointmentForm testid={FORM_ID} />);
        const select = screen.getByText((_, element) => element?.tagName.toLocaleLowerCase() === 'select');

        expect(select).not.toBeNull();
    });

    test('it contains passed services', () => {
        render(<AppointmentForm testid={FORM_ID} avaliableServices={TEST_SERVICES} />);

        const options = screen.getAllByRole('listitem');

        expect(options.filter(item => TEST_SERVICES.includes(item.textContent!))).toHaveLength(TEST_SERVICES.length);
    });

    test('it renders preselected service', () => {
        const selectedService = randomElement(TEST_SERVICES);
        render(<AppointmentForm testid={FORM_ID} avaliableServices={TEST_SERVICES} service={selectedService} />);

        const select = screen.getByDisplayValue(selectedService);

        expect(select).not.toBeNull();
    });

    test('it renders empty select with wrong service passed', () => {
        const selectedService = nanoid();
        render(<AppointmentForm testid={FORM_ID} avaliableServices={TEST_SERVICES} service={selectedService} />);

        const select = screen.queryByDisplayValue(selectedService);

        expect(select).toBeNull();
    });

    test('it renders selected option', () => {
        const selectedService = randomElement(TEST_SERVICES);
        const userSelected = randomElement(TEST_SERVICES);
        render(<AppointmentForm testid={FORM_ID} avaliableServices={TEST_SERVICES} service={selectedService} />);

        const selectNode = screen.queryByDisplayValue(selectedService);
        
        
        fireEvent.change(selectNode!, {
            target: { value: userSelected }
        })

        expect(screen.getByDisplayValue(userSelected)).not.toBeNull();

    });


});
