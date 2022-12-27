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
    [FORM_FIELDS.FIRST_NAME]?: string;
    onSubmit?: (values: Partial<Record<IFormFields, any>>) => void
}

type FormKeys = keyof typeof FORM_FIELDS;

export type IFormFields = typeof FORM_FIELDS[FormKeys];
export type IFormValues = Partial<Record<IFormFields, any>>;