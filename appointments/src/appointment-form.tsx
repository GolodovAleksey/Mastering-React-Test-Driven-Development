import React, { useState } from "react";
import { IAppointmentForm } from './interfaces';

export const AppointmentForm: React.FC<IAppointmentForm> = ({ testid, avaliableServices = [], service = '' }) => {
    const [selectedService, setSelectedService] = useState(service)

    const handleServiceChange = (ev: React.BaseSyntheticEvent) => {
        setSelectedService( ev.target.value );
    }

    return <form data-testid={testid}>
        <button />
        <select defaultValue={service} value={selectedService} onChange={handleServiceChange}>
            {avaliableServices.map(service => <option key={service} role={'listitem'}>{service}</option>)}
        </select>
    </form>
};