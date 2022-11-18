const { faker } = require("@faker-js/faker");
const { VALID_STATUS } = require("./helpers");
const DONATIONS = [];

for (let i = 0; i < 40; i++) {
  DONATIONS.push({
    id: faker.datatype.uuid(),
    amount: faker.datatype.number({ min: 1000 }),
    comment: faker.lorem.sentence(),
    donor: faker.name.fullName(),
    status: faker.helpers.arrayElement(VALID_STATUS),
    timestamp: faker.date.recent(),
  });
}

module.exports = {
  DONATIONS,
};
