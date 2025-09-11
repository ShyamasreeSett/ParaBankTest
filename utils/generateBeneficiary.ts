import { faker } from '@faker-js/faker';

export const generatePayeeData = (fromAccount: string) => {

  // Generate a random amount < 25
  const amount = (Math.random() * 24 + 0.01).toFixed(2); // $0.01 - $24.99

  const accountNumber = '1234';
  return {
    payeeName: faker.person.fullName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
    phone: faker.string.numeric(10),
    accountNumber, // random
    verifyAccountNumber: accountNumber, // match random account number
    amount, // text value
    fromAccount // provided from test
  };
};