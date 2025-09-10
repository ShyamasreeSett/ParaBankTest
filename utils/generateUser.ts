import { faker } from '@faker-js/faker';

export const generateUser = () => {
  // Define firstName first
  const firstName = faker.person.firstName();

  return {
    firstName, 
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
    phone: faker.string.numeric(10),
    ssn: faker.string.numeric(9),
    username: `${firstName}_${Date.now()}`, // use firstName variable
    password: faker.internet.password({ length: 12, memorable: true }) // random password
  };
};
