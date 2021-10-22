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

const JSONLimit = {
  DEFINED_LIMIT: 10000,
};

const AvatarSize = {
  SIZE: "250",
};

const LimitFieldSize = {
  FIELD_SIZE: 2000000,
};

const Transformation = {
  WIDTH: 250,
  HEIGHT: 250,
};

module.exports = {
  HttpCode,
  Subscription,
  LimiterParameters,
  JSONLimit,
  AvatarSize,
  LimitFieldSize,
  Transformation,
};
