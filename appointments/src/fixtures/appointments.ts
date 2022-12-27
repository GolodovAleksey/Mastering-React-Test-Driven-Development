import { IAppointment, ICustomer } from '../interfaces'
import { faker } from '@faker-js/faker';
import { randomRange } from '../utils';
import { APPOINTMENT_SERVICE } from '../constants';

const today = new Date();

const SERVICE_NAMES = Object.values(APPOINTMENT_SERVICE);

export const getCustomer = (): ICustomer => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.number(),
    stylist: faker.name.fullName(),
    service: SERVICE_NAMES[randomRange(SERVICE_NAMES.length)],
    notes: faker.lorem.paragraph(),
})

export const appointmens: IAppointment[] = new Array(10).fill(null).map((_, index) => ({
    startAt: today.setHours(9 + index, 0),
    customer: getCustomer()
}));