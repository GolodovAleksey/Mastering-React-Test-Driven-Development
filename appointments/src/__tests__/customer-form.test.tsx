import { fireEvent, render, screen } from '@testing-library/react'
import { APPOINTMENT_CUSTOMER_FORM } from '../constants';
import { FORM_FIELDS } from '../constants/form-fields';
import { CustomerForm } from '../customer-form';
import { faker } from '@faker-js/faker'
import { IFormValues } from '../interfaces';


describe('Customers form', () => {

    const queryTextInput = (id: string) => screen.queryByLabelText(id, {
        selector: '[type=text]'
    });

    test('renders normally', () => {
        render(<CustomerForm testid={APPOINTMENT_CUSTOMER_FORM} />);
        const form = screen.queryByRole('form')

        expect(form).not.toBeNull();
    });

    test('render the "firstname" field as textbox', () => {
        render(<CustomerForm testid={APPOINTMENT_CUSTOMER_FORM} />);
        const textinput = queryTextInput(FORM_FIELDS.FIRST_NAME);

        expect(textinput).not.toBeNull();
    });

    test('includes existing value for the "First name"', () => {
        const firstName = faker.name.firstName();

        render(<CustomerForm firstName={firstName} />);
        const field = screen.queryByDisplayValue(firstName);

        expect(field).not.toBeNull();
    });

    test('save existing first name when submitting', async () => {
        const FIRST_NAME = faker.name.firstName();
        const submitMock = jest.fn((_: IFormValues) => { });
        const expectations: IFormValues = {
            firstName: FIRST_NAME
        }
        render(<CustomerForm
            firstName={FIRST_NAME}
            onSubmit={submitMock}
        />);
        const form = screen.queryByRole('form')
        fireEvent.submit(form!);
        expect(submitMock).toBeCalledWith(expectations);
    });

    test('save new first name when submitting', () => {
        const FIRST_NAME = faker.name.firstName();
        const submitMock = jest.fn((_: IFormValues) => { });
        const expectations: IFormValues = {
            firstName: FIRST_NAME
        }
        render(<CustomerForm
            firstName={faker.name.firstName()}
            onSubmit={submitMock}
        />);
        const form = screen.queryByRole('form')
        const textinput = queryTextInput(FORM_FIELDS.FIRST_NAME);
        fireEvent.change(textinput!, {
            target: { value: FIRST_NAME }
        })
        fireEvent.submit(form!);
        expect(submitMock).toBeCalledWith(expectations);
    })
});