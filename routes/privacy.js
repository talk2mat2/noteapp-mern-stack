const express = require("express");
const Router = express.Router();
const {GetPrivacies,setPrivacies,deletePrivacy} = require('../controllers/privacy')

Router.get("/", GetPrivacies);
Router.post("/", setPrivacies);
Router.get("/deletePrivacy/:id", deletePrivacy);



module.exports = Router