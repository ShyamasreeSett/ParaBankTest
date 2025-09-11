import { faker } from '@faker-js/faker';

export const generateUser = () => {
  // Define firstName first
  const firstName = faker.person.firstName();
const baseName = "Sett";
const timestamp = Date.now(); // milliseconds
  const username = baseName + timestamp;

  return {
    
    firstName,
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
    phone: faker.string.numeric(10),
    ssn: faker.string.numeric(9),
   username,
    password: faker.internet.password({ length: 12, memorable: true }) // random password
    /*
   firstName: 'sett992',
   lastName: 'sett99',
    address: 'sett99',
    city: 'sett99',
    state: 'sett99',
    zip: '1234',
    phone: '12345',
    ssn: '123456',
   // username: `st${Date.now()}_${firstName}`,
   username: 'sett992',
    password: 's123' 
    */
  };
};
