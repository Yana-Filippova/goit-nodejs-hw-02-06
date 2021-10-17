const jwt = require("jsonwebtoken");
const Users = require("../repository/users");
const { HttpCode, Subscription } = require("../config/constants");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const signup = async (req, res, next) => {
  const { name, email, password, subscription } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Email is already in use!",
    });
  }
  try {
    const newUser = await Users.create({ name, email, password, subscription });
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  // const isValidPassword = await user?.isValidPassword(password);
  const isValidPassword =
    (await user) === null || (await user) === undefined
      ? undefined
      : await user.isValidPassword(password);

  if (!user || !isValidPassword) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Email or password is wrong!",
    });
  }
  const id = user._id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
  await Users.updateToken(id, token);
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    date: {
      token,
    },
  });
};

const logout = async (req, res) => {
  const id = req.user._id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

const currentUser = async (req, res, next) => {
  try {
    const id = req.user._id;
    const { name, email, subscription } = req.user;
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      user: {
        id,
        name,
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await Users.updateSubscription(id, req.body);
    if (user) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        user: {
          id: user.id,
          email: user.email,
          subscription: user.subscription,
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        data: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const onlyStarter = async (_req, res) => {
  return res.json({
    status: "success",
    code: HttpCode.OK,
    data: {
      message: `Only for ${Subscription.STARTER} subscription!`,
    },
  });
};

const onlyPro = async (_req, res) => {
  return res.json({
    status: "success",
    code: HttpCode.OK,
    data: {
      message: `Only for ${Subscription.PRO} subscription`,
    },
  });
};

const onlyBusiness = async (_req, res) => {
  return res.json({
    status: "success",
    code: HttpCode.OK,
    data: {
      message: `Only for ${Subscription.BUSINESS} subscription`,
    },
  });
};

module.exports = {
  signup,
  login,
  logout,
  currentUser,
  updateSubscription,
  onlyStarter,
  onlyPro,
  onlyBusiness,
};
