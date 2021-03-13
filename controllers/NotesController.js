const { response } = require("express");
const NotesModel = require("../models/NotesModel");

exports.getUserNotes = (req, res) => {
  const ownerId = req.body.id;

  NotesModel.find({ ownerId })
    .then((resdata) => {
      return res.status(200).json({ notesData: resdata });
    })
    .catch((err) => {
      return res.status(404).json({ message: "no user notes" });
    });
};
exports.DeleteNote = (req, res) => {
  const _id = req.body.noteId;

  NotesModel.findByIdAndDelete(_id)
    .then((resdata) => {
      this.getUserNotes(req, res);
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ message: "error occured, unable to delete" });
    });
};

exports.SaveNotes = async (req, res) => {
  const { rawContent, title, id } = req.body;
  const ownerId = id;
  //   console.log(rawContent, title, ownerId);
  if (!ownerId) {
    return res.status(401).json({ message: "user id not provided" });
  }
  if (!rawContent) {
    return res.status(501).json({ message: "body can not be empty" });
  }

  try {
    const newNotesModel = new NotesModel({ title, rawContent, ownerId });
    await newNotesModel.save();
    console.log("saved");
    this.getUserNotes(req, res);
  } catch (err) {
    console.log("error occured", err);
    res.status(501).json({ message: "an error occured,unable to save" });
  }
};
