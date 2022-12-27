import { nanoid } from 'nanoid';

export const APPOINTMENT_DAY_VIEW = 'AppointmentDayView';
export const APPOINTMENT_DETAILS_VIEW = 'AppointmentDetailsView';
export const APPOINTMENT_CUSTOMER_FORM = nanoid(10);

export enum APPOINTMENT_SERVICE{
    HAIR_CUT = 'Hair cut service',
    HAIR_COLORING = 'Hair coloring service',
    NAILS = 'Nails service',
    FEETS = 'Feets service',
    LIPS = 'Lips service'
}