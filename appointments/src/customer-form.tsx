import React, { useState } from "react";
import { APPOINTMENT_CUSTOMER_FORM } from "./constants";
import { FORM_FIELDS } from "./constants/form-fields";
import { ICustomerForm } from "./interfaces";

export const CustomerForm: React.FC<ICustomerForm> = ({ testid, customer, onSubmit }) => {
    const [formCustomer, setCustomer] = useState(customer);

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        setCustomer(customer => ({
            ...customer,
            [target.name]: target.value
        }));
    }

    return (
        <form data-testid={testid} name={APPOINTMENT_CUSTOMER_FORM} onSubmit={() => onSubmit?.(formCustomer)}>
            <div>
                <label>
                    {FORM_FIELDS.firstName}
                    <input
                        type={'text'}
                        placeholder={'Input firstname...'}
                        value={formCustomer.firstName}
                        onChange={handleFieldChange}
                        name={FORM_FIELDS.firstName}
                    />
                </label>

                <label>
                    {FORM_FIELDS.lastName}
                    <input

                        type={'text'}
                        placeholder={'Input lastname...'}
                        value={formCustomer.lastName}
                        onChange={handleFieldChange}
                        name={FORM_FIELDS.lastName}
                    />
                </label>

                <label>
                    {FORM_FIELDS.phoneNumber}
                    <input

                        type={'text'}
                        placeholder={'Input lastname...'}
                        value={formCustomer.phoneNumber}
                        onChange={handleFieldChange}
                        name={FORM_FIELDS.phoneNumber}
                    />
                </label>
            </div>
            <input type="submit" value="Add customer"/>
        </form>)
}