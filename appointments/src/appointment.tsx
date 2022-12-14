import React from 'react'
import { toShortTime } from './utils'

interface ICustomer {
    firstName: string;
}

export interface IAppointment {
    customer: ICustomer;
    startAt?: number;
}

interface IAppointmentsDayView extends Partial<HTMLDivElement> {
    appointments: IAppointment[];
}


export const Appointment = ({ customer }: IAppointment) => <div>{customer.firstName}</div>

export const AppointmentDayView = ({ appointments, ...rest }: IAppointmentsDayView) => {
    return (
        <div data-testid={rest?.dataset?.testid}>
            <ol>
                {appointments.map((e, i) => <li key={e.startAt}>{toShortTime(e.startAt)}</li>)}
            </ol>
            {appointments.length > 0
             ? <Appointment customer={appointments[0].customer} />
             : <p>{'There are no appointments sheduled today'}</p>}
        </div>)
}