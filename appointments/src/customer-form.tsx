import React, { useState } from "react";
import { APPOINTMENT_CUSTOMER_FORM } from "./constants";
import { FORM_FIELDS } from "./constants/form-fields";
import { ICustomerForm } from "./interfaces";

export const CustomerForm: React.FC<ICustomerForm> = ({ testid, firstName, onSubmit }) => {
    const [customer, setCustomer] = useState({ firstName });

    const handleFirstNameChange = ({ target }) => {
        setCustomer(customer => ({
            ...customer,
            firstName: target.value
        }))
    }

    return (
        <form data-testid={testid} name={APPOINTMENT_CUSTOMER_FORM} onSubmit={() => onSubmit?.(customer)}>
            <div>
                <label>
                    {FORM_FIELDS.FIRST_NAME}
                    <input 
                    
                    type={'text'}
                    placeholder={'Input firstname...'}
                    value={firstName}
                    onChange={handleFirstNameChange}
                     />
                </label>

            </div>
        </form>)
}