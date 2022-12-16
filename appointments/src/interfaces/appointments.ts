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

export interface IAppointmentsDayView extends Partial<HTMLDivElement> {
    appointments: IAppointment[];
}

export enum APPOINTMENT_SERVICE{
    HAIR_CUT = 'Hair cut service',
    HAIR_COLORING = 'Hair coloring service',
    NAILS = 'Nails service',
    FEETS = 'Feets service',
    LIPS = 'Lips service'
}