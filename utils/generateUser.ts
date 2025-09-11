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
  };
};
