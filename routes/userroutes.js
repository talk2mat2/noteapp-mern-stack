const { CheckUserAth } = require("../middlewares/auth");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const Router = express.Router();

const {
  Login,
  countUsers,
  Register,
  UpdateMyAcctNumber,
  CheckIsRegistered,
  UpdateClient,
  AdminLogin,
  ConfirmPaymentReceived,
  handleUpgradePlans,
  GetUsers
} = require("../controllers/user");

Router.post("/login", Login);
Router.post("/AdminLogin", AdminLogin);
Router.get("/updateClient", CheckUserAth, UpdateClient);

Router.post("/Register", Register);
Router.post("/ConfirmPaymentReceived", CheckUserAth, ConfirmPaymentReceived);
Router.post("/UpdateMyAcctNumber", CheckUserAth, UpdateMyAcctNumber);
Router.post("/handleUpgradePlans", CheckUserAth, handleUpgradePlans);
Router.post("/CheckIsRegistered", CheckIsRegistered);
Router.get("/GetUsers", GetUsers);
Router.get("/countUsers", countUsers);

module.exports = Router;
