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

exports.UpdateNotes = (req, res) => {
  const { rawContent, title, noteId } = req.body;

  if (!noteId) {
    return res.status(401).json({ message: "note id not provided" });
  }
  // const ownerId = id;
  NotesModel.findByIdAndUpdate(noteId, { rawContent, title })
    .then((resdata) => {
      this.getUserNotes(req, res);
      console.log("updated");
    })
    .catch((err) => {
      console.log("error occured", err);
      return res
        .status(404)
        .json({ message: "error occured, unable to update" });
    });
};

exports.SearchNotes = (req, res) => {
  if (!req.query.search) {
    console.log("empty search");
    return res.status(200).json({ searchResults: [] });
  }
  console.log(req.query.search);
  NotesModel.find({ title: { $regex: `${req.query.search}`, $options: "i" } })
    .limit(10)
    .then((resdata) => {
      // console.log(resdata);
      res.status(200).json({ searchResults: resdata });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({ err });
    });
};
