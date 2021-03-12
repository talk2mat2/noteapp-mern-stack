const { SaveNotes, getUserNotes } = require("../controllers/NotesController");

const { CheckUserAth } = require("../middlewares/auth");
const express = require("express");

const Router = express.Router();

Router.post("/saveNotes", CheckUserAth, SaveNotes);
Router.get("/getUserNotes", CheckUserAth, getUserNotes);

module.exports = Router;
