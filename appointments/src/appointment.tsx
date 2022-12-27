import React, { useState } from 'react'
import { toShortTime } from './utils'
import { IAppointment, IAppointmentsDayView, ICustomerField } from './interfaces';
import { APPOINTMENT_DAY_VIEW, APPOINTMENT_DETAILS_VIEW } from './constants'
import _ from 'lodash';


export const Appointment = ({ customer }: IAppointment) => (
    <table id={APPOINTMENT_DETAILS_VIEW}>
        <tbody>
            {Object.keys(customer).map((key) => (
                <tr key={key}>
                    <td>{ _.camelCase(key)}</td>
                    <td>
                        {customer[key as ICustomerField]}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
)

export const AppointmentDayView = ({ appointments, testid, ...rest }: IAppointmentsDayView) => {
    const [selectedAppoinment, setSelectedAppoinment] = useState(0);

    return (
        <div data-testid={testid} id={APPOINTMENT_DAY_VIEW}>
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