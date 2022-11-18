"use strict";
let { DONATIONS } = require("../data");
const { faker } = require("@faker-js/faker");
const { validateDonation } = require("../helpers");

module.exports = async function (fastify) {
  fastify.get("/", async function (req) {
    const page = parseInt(req.query.page || 1);
    const pageSize = 25;
    return {
      data: {
        donations: DONATIONS.sort(
          (donationA, donationB) => new Date(donationB.timestamp) - new Date(donationA.timestamp)
        ).slice((page - 1) * pageSize, page * pageSize),
        page,
        page_size: pageSize,
        total: DONATIONS.length,
      },
    };
  });

  fastify.post("/", async function (req, reply) {
    const donation = req.body?.data?.donation;
    const errors = validateDonation(donation);
    if (errors.length > 0) {
      reply.code(422).send({ errors });
    }

    const newDonation = {
      ...donation,
      id: faker.datatype.uuid(),
      timestamp: new Date().toJSON(),
    };
    DONATIONS.push(newDonation);

    return { data: { donation: newDonation } };
  });

  fastify.delete("/:donationId", async function (req) {
    const donationId = req.params.donationId;
    DONATIONS = DONATIONS.filter((donation) => donation.id !== donationId);
    return { message: "Donation deleted successfully" };
  });
};
