const jwt = require("jsonwebtoken");
const Users = require("../repository/users");

// Local storage
// const path = require("path");
// const mkdirp = require("mkdirp");
// const UploadService = require("../services/file-upload");

// Cloud storage
const fs = require("fs").promises;
const UploadService = require("../services/cloud-upload");

const { HttpCode, Subscription } = require("../config/constants");

const EmailService = require("../services/email/service");
const {
  CreateSenderSendGrid,
  // CreateSenderNodemailer,
} = require("../services/email/sender");

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
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new CreateSenderSendGrid()
      // new CreateSenderNodemailer()
    );
    const statusEmail = await emailService.sendVerifyEmail(
      newUser.email,
      newUser.name,
      newUser.verifyToken
    );
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
        avatar: newUser.avatarURL,
        successEmail: statusEmail,
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

  // if (!user || !isValidPassword || !user?.verify) {
  if (
    !user || !isValidPassword || !user === null || !user === undefined
      ? undefined
      : !user.verify
  ) {
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
        data: "Not found!",
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

// Local storage
// const uploadAvatar = async (req, res, next) => {
//   const id = String(req.user._id);
//   const file = req.file;
//   const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;
//   const destination = path.join(AVATAR_OF_USERS, id);
//   await mkdirp(destination);
//   const uploadService = new UploadService(destination);
//   const avatarUrl = await uploadService.save(file, id);
//   await Users.updateAvatar(id, avatarUrl);

//   return res.status(HttpCode.OK).json({
//     status: "success",
//     code: HttpCode.OK,
//     date: {
//       avatar: avatarUrl,
//     },
//   });
// };

// Cloud storage
const uploadAvatar = async (req, res, _next) => {
  const { id, idUserCloud } = req.user;
  const file = req.file;

  const destination = "Avatars";
  const uploadService = new UploadService(destination);
  const { avatarUrl, returnIdUserCloud } = await uploadService.save(
    file.path,
    idUserCloud
  );

  await Users.updateAvatar(id, avatarUrl, returnIdUserCloud);
  try {
    await fs.unlink(file.path);
  } catch (error) {
    console.log(error.message);
  }
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      avatar: avatarUrl,
    },
  });
};

const verifyUser = async (req, res, next) => {
  const user = await Users.findUserByVerifyToken(req.params.verifyToken);

  if (user) {
    await Users.updateTokenVerify(user._id, true, null);
    return res.json({
      status: "success",
      code: HttpCode.OK,
      message: "Verification successful!",
    });
  }
  return res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: "User not Found!",
  });
};

const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findByEmail(email);

  if (user && user.verify) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "Verification has already been passed!",
    });
  }

  if (user) {
    const { email, name, verifyToken } = user;
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new CreateSenderSendGrid()
      // new CreateSenderNodemailer()
    );
    await emailService.sendVerifyEmail(email, name, verifyToken);
  }
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      message: "Verification email sent!",
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
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
};
