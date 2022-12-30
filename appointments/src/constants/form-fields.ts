import { ICustomer } from "../interfaces";

const FIRST_NAME = 'firstName';
const SECOND_NAME = 'lastName';


export const FORM_FIELDS: Partial<Record<keyof ICustomer, string>> = {
    firstName : 'firstName',
    lastName: 'lastName',
    phoneNumber: 'phoneNumber'
} as const;

export const htmlForInput = (id: string) => `${id}-input`;