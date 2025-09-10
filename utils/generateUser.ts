import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';


export const generateUser = () => {
  // Define firstName first
  const firstName = faker.person.firstName();
const baseName = "Sett";
const timestamp = Date.now(); // milliseconds
const random = Math.floor(Math.random() * 10000); // 0–9999
const username = `SettShyam_${randomUUID().slice(0, 5)}`;
  return {
    /*firstName, 
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
    phone: faker.string.numeric(10),
    ssn: faker.string.numeric(9),
   // username: `st${Date.now()}_${firstName}`,
   username: `shyamasree${Date.now()}`,
    password: faker.internet.password({ length: 12, memorable: true }) // random password
    */
   firstName,
   lastName: 'faker.person.lastName()',
    address: 'faker.location.streetAddress()',
    city: 'faker.location.city()',
    state: 'faker.location.state()',
    zip: '1234',
    phone: '12345',
    ssn: '123456',
   // username: `st${Date.now()}_${firstName}`,
   username,
    password: 's123' 
  };
};
