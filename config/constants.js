const HttpCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

const Subscription = {
  STARTER: "starter",
  PRO: "pro",
  BUSINESS: "business",
};

const LimiterParameters = {
  TIME: 15 * 60 * 1000,
  MAX_ATTEMPT_NUMBER: 3,
};

const JSONLimit = 10000;

module.exports = { HttpCode, Subscription, LimiterParameters, JSONLimit };
