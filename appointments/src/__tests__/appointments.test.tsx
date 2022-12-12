import React from 'react';
// import ReactDOM from 'react-dom'
import { render, screen } from '@testing-library/react';
import { Appointment } from '../appointment';

describe('Appointment', () => {
    let customer;
    let container: HTMLDivElement;

    beforeEach(()=>{
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
        const name  ='Jordan'
        customer = { firstName: name };
        const component = <Appointment customer={customer} />
        
        testRender(component);

        expect(container.textContent).toMatch(name);
    });
})
