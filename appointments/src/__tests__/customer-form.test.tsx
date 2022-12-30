import { fireEvent, render, screen } from '@testing-library/react'
import { APPOINTMENT_CUSTOMER_FORM } from '../constants';
import { FORM_FIELDS } from '../constants/form-fields';
import { CustomerForm } from '../customer-form';
import { faker } from '@faker-js/faker'
import { ICustomer, IFormValues } from '../interfaces';
import { getCustomer } from '../fixtures';

const queryTextInput = (id: string) => screen.queryByLabelText(id, {
    selector: '[type=text]'
});

const DEFAUT_CUSTOMER = getCustomer();

const renderDefaultForm = () => render(<CustomerForm testid={APPOINTMENT_CUSTOMER_FORM} customer={DEFAUT_CUSTOMER}/>);

const itRendersAsTextbox = (field: string) => test('it rendered as textbox', () => {
    renderDefaultForm();
    const textinput = queryTextInput(field);

    expect(textinput).not.toBeNull();
});

const itIncludesExistingValue = (field: keyof ICustomer, value: string) => test('it includes existing value', () => {
    const customer = {
        ...DEFAUT_CUSTOMER,
        [field]: value
    }

    render(<CustomerForm customer={customer} />);
    const fieldElement = screen.queryByDisplayValue(value);

    expect(fieldElement).not.toBeNull();
});

const itSavesExistingValueWhenSubmiting = (field: keyof ICustomer, value: string) => test('save existing first name when submitting', async () => {
    const submitMock = jest.fn((_: IFormValues) => { });
    const customer = {
        ...DEFAUT_CUSTOMER,
        [field]: value
    }

    const expectations: IFormValues = {
        ...customer
    }

    render(<CustomerForm
        customer={customer}
        onSubmit={submitMock}
    />);
    const form = screen.queryByRole('form')
    expect(queryTextInput(field)).not.toBeNull();
    fireEvent.submit(form!);
    expect(submitMock).toBeCalledWith(expectations);
});

const itSavesChangedValueWhenSubmitted = ( field: keyof ICustomer, value: string) =>     test('save new value when submitting', () => {
    
    const submitMock = jest.fn((_: IFormValues) => { });
    const expectations: IFormValues = {
        ...DEFAUT_CUSTOMER,
        [field]: value
    }
    render(<CustomerForm
        customer={DEFAUT_CUSTOMER}
        onSubmit={submitMock}
    />);
    const form = screen.queryByRole('form')
    const textinput = queryTextInput(field);
    fireEvent.change(textinput!, {
        target: { value }
    })
    fireEvent.submit(form!);
    expect(submitMock).toBeCalledWith(expectations);
})

type TestEntry = [keyof ICustomer, string];

const TEST_TABLE : Array<TestEntry> = [
    ['firstName', faker.name.firstName()],
    ['lastName', faker.name.lastName()],
    ['phoneNumber', faker.phone.number()],
];

describe('Customer form', () => {
    test('renders normally', () => {
        renderDefaultForm();
        const form = screen.queryByRole('form')

        expect(form).not.toBeNull();
    });

    describe.each(TEST_TABLE)('Field "%s"', (testField, value) => {
        itRendersAsTextbox(testField);
        itIncludesExistingValue(testField, value);
        itSavesExistingValueWhenSubmiting(testField, value);
        itSavesChangedValueWhenSubmitted(testField, value);
    });

    test('render "Submit" button', () => {
        renderDefaultForm();
        const buttons = screen.queryAllByRole('button');
        const submit = buttons.find( button => button.getAttribute('type') === 'submit')

        expect(submit).not.toBeUndefined();
    })
});