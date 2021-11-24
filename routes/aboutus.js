const express = require("express");
const Router = express.Router();
const {GetAboutUs,setAboutUs,deleteAboutUs} = require('../controllers/aboutus')

Router.get("/", GetAboutUs);
Router.post("/", setAboutUs);

Router.get("/deleteAboutUs/:id",deleteAboutUs);


module.exports = Router