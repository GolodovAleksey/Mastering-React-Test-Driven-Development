import { APPOINTMENT_SERVICE, FORM_FIELDS } from "../constants";

export interface ICustomer {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    stylist: string;
    service: APPOINTMENT_SERVICE;
    notes?: string;
}

export type ICustomerField = keyof ICustomer;

export interface IAppointment {
    customer: ICustomer;
    startAt?: number;
}

interface IRenderable {
    testid?: string
}

export interface IAppointmentsDayView extends IRenderable {
    appointments: IAppointment[];
}

export interface ICustomerForm extends IRenderable {
    customer: ICustomer;
    onSubmit?: (values: Partial<Record<keyof ICustomer, string>>) => void;
}

export interface IAppointmentForm extends IRenderable {
    avaliableServices?: string[];
    service?: string;
}

type FormKeys = keyof typeof FORM_FIELDS;

export type IFormFields = typeof FORM_FIELDS[FormKeys];
export type IFormValues = Partial<Record<keyof ICustomer, string>>;