import React, { useCallback, useEffect, useState } from 'react'
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
    const [selectedAppoinment, setSelectedAppoinment] = useState(0);

    return (
        <div data-testid={rest?.dataset?.testid}>
            <ol>
                {appointments.map((e, i) =>
                    <li key={e.startAt}>
                        <button type={'button'} onClick={() => setSelectedAppoinment(i)}>
                            {toShortTime(e.startAt)}
                        </button>
                    </li>)}
            </ol>
            {appointments.length
                ? <Appointment customer={appointments[selectedAppoinment].customer} />
                : <p>{'There are no appointments sheduled today'}</p>}
        </div>)
}