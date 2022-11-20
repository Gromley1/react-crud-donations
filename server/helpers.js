const VALID_STATUS = ["successful", "failed", "pending"];

const validateDonation = (tx = {}) => {
  let errors = [];

  if (!tx.amount) {
    errors.push("amount is required");
  }

  if (!tx.donor) {
    errors.push("donor is required");
  }

  if (!tx.status) {
    errors.push("status is required");
  } else if (VALID_STATUS.indexOf(tx.status) === -1) {
      errors.push("status has to have a value of 'successful', 'failed' or 'pending'")
  }

  return errors;
};

module.exports = { validateDonation, VALID_STATUS };
